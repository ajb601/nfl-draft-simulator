exports.handler = async function(event, context) {
    const fetch = await import('node-fetch').then(mod => mod.default);
  
    const apiKey = process.env.CFD_API_KEY;
    const { team, season } = event.queryStringParameters || {};
  
    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'API key is missing from environment variables' })
      };
    }
  
    try {
      const url = `https://api.collegefootballdata.com/player/stats?team=${team}&season=${season}`;
      
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${apiKey}`
        }
      });
  
      const text = await response.text(); // Grab raw text so we can debug
  
      if (!response.ok) {
        return {
          statusCode: response.status,
          body: JSON.stringify({
            error: 'API response not ok',
            status: response.status,
            text: text.slice(0, 200)  // limit in case it's an HTML page
          })
        };
      }
  
      const data = JSON.parse(text);
  
      return {
        statusCode: 200,
        body: JSON.stringify(data)
      };
    } catch (err) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: 'Exception thrown',
          message: err.message
        })
      };
    }
  };
  