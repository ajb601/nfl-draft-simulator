exports.handler = async function(event, context) {
    const fetch = await import('node-fetch').then(mod => mod.default);
    const apiKey = process.env.CFD_API_KEY;
  
    try {
      const url = `https://api.collegefootballdata.com/stats/player/season?year=2023&position=QB`;
      const response = await fetch(url, {
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
  