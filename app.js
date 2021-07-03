const express = require("express");
const app = express();
const itemsRoutes = require("./routes/items.js");
const ExpressError = require("./ExpressError");
const port = process.env.port || 3000;

app.use(express.json());
app.use("/items", itemsRoutes);

// 404 handler
app.use((req, res, next) => {
    throw new ExpressError("Not Found", 404);
});

// general error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    return res.json({
        error: err.message,
    });
});

module.exports = { app, port };
