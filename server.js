const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express(),
      port = process.env.PORT || 3001;

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({limit: '50mb', extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json({limit: '50mb'}))

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
    res.json({"message": "IpfsCloud by vasa"});
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

