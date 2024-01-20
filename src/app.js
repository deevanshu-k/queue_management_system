const express = require("express");
const models = require("./models");
const cors = require("cors");
const router = require("./routes");
const { errors } = require("celebrate");
const BodyParser = require('body-parser');
const app = express();

// CORS + BODY_PARSE
const corsOptions = {
    origin: [process.env.CLIENT_URL],
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(BodyParser.json());

// ROUTER
app.use("/api", router);

app.use(errors());
app.use((req, res) => {
    return res.send("Hello Home !!!");
});

module.exports = { app };
