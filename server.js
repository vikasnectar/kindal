const config =  require('./config.js');
const express =  require('express');
const compression = require('compression')
const bodyParser = require('body-parser')
const logger = require("morgan");
const cors = require('cors');
const fs = require('fs');
const http = require('http');
const https = require('https');
const db = require("./models");
const fileUpload = require('express-fileupload')
const Constant = require('./config/constant');
db.sequelize.sync();

var httpServer;
const app =  express();
app.use(compression())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
app.use(logger("dev")); // log every request to the console
app.use(cors());
// Note that this option available for versions 1.0.0 and newer. 
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

// import route file 
var admin = require('./route/admin')
var blog = require('./route/blog')
var books = require('./route/books')
var event = require('./route/event')

app.all('/api/*', (req,res,next)=>{
    next();
})

// user route file
app.use('/admin', admin)
app.use('/blog', blog)
app.use('/books', books)
app.use('/event', event)

// Handling non matching request from the client
app.use((req, res, next) => {
    return res.json({
        code:Constant.NOT_FOUND,
        massage:Constant.REQUEST_NOT_FOUND,
        data:null
    })
})

if(process.env.NODE_ENV=="production"){

    console.log(config.PORT)
      httpServer = http.createServer(app);
    // for production 
    //var privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
    //var certificate = fs.readFileSync('sslcert/server.crt', 'utf8');
    //var credentials = {key: privateKey, cert: certificate};
    // var httpsServer = https.createServer(credentials, app);
    
    
}else{
    httpServer = http.createServer(app);
}




httpServer.listen(config.PORT, () => {
    console.log(`APP LISTENING ON http://${config.HOST}:${config.PORT}`);
})