// proxy.js
const fetch = require("node-fetch");

exports.handler = async function (event, context) {
    console.log("Function called with event:", event);

    try {
        const { url } = JSON.parse(event.body);

        if (!url) {
            console.error("No URL provided");
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "No URL provided" }),
            };
        }

        console.log("Fetching URL:", url);
        const response = await fetch(url);
        const contentType = response.headers.get("content-type");

        console.log("Fetched data with content-type:", contentType);
        return {
            statusCode: 200,
            headers: {
                "Content-Type": contentType,
            },
            body: await response.text(),
        };
    } catch (error) {
        console.error("Error fetching URL:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
