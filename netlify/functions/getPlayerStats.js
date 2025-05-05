const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const { team, season } = event.queryStringParameters;

  const response = await fetch(`https://api.collegefootballdata.com/player/stats?team=${team}&season=${season}`, {
    headers: {
      Authorization: `Bearer ${process.env.CFD_API_KEY}`
    }
  });

  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
};
