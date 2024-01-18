const http = require("http");
const { app } = require("./src/app");
const { setUpSocket } = require("./src/socket");



if (process.env.NODE_ENV == "production") {
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

httpServer.listen(3000, () => {
    console.log(`APP LISTENING ON http://${"127.0.0.1"}:${3000}`);
});
