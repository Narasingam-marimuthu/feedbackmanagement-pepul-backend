const db = require("./db");
require("dotenv").config();

const logMiddleware = (req, res, next) => {
    console.log(req.method, req.url);
    const startTime = Date.now();

    const addQuery = async () => {
        await db(process.env.LOGS).insert({
            activity: req.method + " " + req.url,
            created_at: db.fn.now(),
        });
    };

    addQuery();
    next();

    const endTime = Date.now();
    const duration = endTime - startTime;
    console.log("Time taken: ", duration);
}

const trackingMiddleware = (req, res, next) => {
    // Use the 'finish' event to ensure response has been sent
    res.on('finish', async () => {
        const requestBody = req.body ? JSON.stringify(req.body) : null;
        const responseBody = res.statusCode; // Instead of stringifying the whole 'res' object, just use statusCode and headers, or body if needed.

        const addQuery = await db(process.env.TRACKING).insert({
            api_name: req.method + " " + req.url,
            request_body: requestBody,
            response_body: responseBody, // Only store relevant response info, not the whole response object
            status_code: res.statusCode,
            created_at: db.fn.now(),
        });

        // You can log or handle anything else if needed.
    });

    next();
}

module.exports = {
    logMiddleware,
    trackingMiddleware
}
