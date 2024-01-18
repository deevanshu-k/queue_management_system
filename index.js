require("dotenv").config();
const http = require("http");
const { app } = require("./src/app");
const { setUpSocket } = require("./src/socket");

const port = process.env.PORT;
console.log(port);
if (process.env.NODE_ENV == "production") {
    console.log("Production ENV");
    httpServer = http.createServer(app);
    // for production
    //var privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
    //var certificate = fs.readFileSync('sslcert/server.crt', 'utf8');
    //var credentials = {key: privateKey, cert: certificate};
    // var httpsServer = https.createServer(credentials, app);
} else {
    console.log("Development ENV");
    httpServer = http.createServer(app);
}

setUpSocket(httpServer);

httpServer.listen(port, () => {
    console.log(`APP LISTENING ON http://${process.env.HOST}:${port}`);
});
