// proxy.js
const fetch = require("node-fetch");

exports.handler = async function (event, context) {
  const { url } = JSON.parse(event.body);
  if (!url) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "No URL provided" }),
    };
  }

  try {
    const response = await fetch(url);
    const contentType = response.headers.get("content-type");

    return {
      statusCode: 200,
      headers: {
        "Content-Type": contentType,
      },
      body: await response.text(),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
