exports.handler = async function(event, context) {
    const fetch = await import('node-fetch').then(mod => mod.default);
  
    try {
      const { team, season } = event.queryStringParameters || {};
  
      if (!team || !season) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'Missing team or season in query params' })
        };
      }
  
      const apiKey = process.env.CFD_API_KEY;
  
      if (!apiKey) {
        return {
          statusCode: 500,
          body: JSON.stringify({ error: 'Missing API key in environment variables' })
        };
      }
  
      const response = await fetch(`https://api.collegefootballdata.com/player/stats?team=${team}&season=${season}`, {
        headers: {
          Authorization: `Bearer ${apiKey}`
        }
      });
  
      if (!response.ok) {
        const text = await response.text();
        return {
          statusCode: response.status,
          body: JSON.stringify({ error: 'API error', status: response.status, response: text })
        };
      }
  
      const data = await response.json();
  
      return {
        statusCode: 200,
        body: JSON.stringify(data)
      };
    } catch (err) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Function error', details: err.message })
      };
    }
  };
  