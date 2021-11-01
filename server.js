const config =  require('./config.js');
const express =  require('express');
const compression = require('compression')
const bodyParser = require('body-parser')
const logger = require("morgan");
const fs = require('fs');
const http = require('http');
const https = require('https');
//var privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
//var certificate = fs.readFileSync('sslcert/server.crt', 'utf8');
//var credentials = {key: privateKey, cert: certificate};

const app =  express();
app.use(compression())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
app.use(logger("dev")); // log every request to the console

app.get('/', (req, res) => {
    res.send('Hello World !!');
});
var httpServer;
if(process.env.NODE_ENV=="production"){
      httpServer = http.createServer(app);
    // var httpsServer = https.createServer(credentials, app);
    
}else{
    httpServer = http.createServer(app);
}




httpServer.listen(config.PORT, () => {
    console.log(`APP LISTENING ON http://${config.HOST}:${config.PORT}`);
})