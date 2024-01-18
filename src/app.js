const express = require("express");
const models = require("./models");
const app = express();


app.use((req,res) => {
    res.send("Hello Home !!!");
})

module.exports = { app };