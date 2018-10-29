const express = require('express');
const bodyParser = require('body-parser');

const https = require("https");
const fs = require("fs");
const options = {
  key: fs.readFileSync("/home/ipfscloud/.acme.sh/*.ipfscloud.store/*.ipfscloud.store.key"),
  cert: fs.readFileSync("/home/ipfscloud/.acme.sh/*.ipfscloud.store/*.ipfscloud.store.cer")
};

// create express app
const app = express(),
      port = process.env.PORT || 3001;


// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({limit: '500mb', extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json({limit: '500mb'}))

// allow access control origin and headers
app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//serving static assets
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));


// file saving
//app.use(multer({dest:'./uploads/'}));

// define a simple route
app.get('/', (req, res) => {
    res.json({"health": "good"});
});

//Importing routes
var routes = require('./api/routes/routes.js'); //importing route
// registering routes
routes(app);

app.use(function(err, req, res, next){
	res.send(err);
});

// listen for requests
app.listen(port,'0.0.0.0', () => {
    console.log("Server is listening on port 3001");
});

https.createServer(options, app).listen(8081);
