const express = require("express");
const models = require("./models");
const cors = require("cors");
const router = require("./routes");
const app = express();

// CORS + BODY_PARSE
const corsOptions = {
    origin: [process.env.CLIENT_URL],
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// ROUTER
app.use("/api", router);

app.use((req, res) => {
    return res.send("Hello Home !!!");
});

module.exports = { app };
