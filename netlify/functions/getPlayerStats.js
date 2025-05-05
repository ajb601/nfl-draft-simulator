exports.handler = async function(event, context) {
    const fetch = await import('node-fetch').then(mod => mod.default);
    const apiKey = process.env.CFD_API_KEY;
  
    try {
      const response = await fetch('https://api.collegefootballdata.com/teams/fbs', {
        headers: {
          Authorization: `Bearer ${apiKey}`
        }
      });
  
      const data = await response.json();
  
      return {
        statusCode: 200,
        body: JSON.stringify(data)
      };
    } catch (err) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: err.message })
      };
    }
  };
  