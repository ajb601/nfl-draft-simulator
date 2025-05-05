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
  
      const fullData = await response.json();
  
      // Filter to only top 25 players with most passing yards
      const topQBs = fullData
        .filter(p => p.statType === 'passingYards')
        .sort((a, b) => Number(b.stat) - Number(a.stat))
        .slice(0, 25);
  
      return {
        statusCode: 200,
        body: JSON.stringify(topQBs)
      };
    } catch (err) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: err.message })
      };
    }
  };
  