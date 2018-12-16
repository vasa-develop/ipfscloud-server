const express = require('express');
const bodyParser = require('body-parser');
//const OrbitDB = require('orbit-db');
//const nodes = require('../../config/nodes.js');
//const ipfsAPI = require('ipfs-api');


//const ipfs = ipfsAPI({'api-path': '/api/v0/', host: nodes.ipfs_california, port: '5001', protocol: 'https'});
//const mongoose = require('mongoose');
//const API_Keys = require('./api/models/keysModel.model');
const https = require("https");
const fs = require("fs");
const pathToSwaggerUi = require('swagger-ui-dist').absolutePath();
const swaggerJSDoc = require('swagger-jsdoc');
const options = {
 // key: fs.readFileSync("/home/ipfscloud/.acme.sh/*.ipfscloud.store/*.ipfscloud.store.key"),
 //cert: fs.readFileSync("/home/ipfscloud/.acme.sh/*.ipfscloud.store/*.ipfscloud.store.cer")
};

// create express app
const app = express(),
      port = process.env.PORT || 3001;

let swaggerDefinition = {
  info: {
    title: 'IpfsCloud swagger API',
    version: '1.0.1',
    description: 'Documentation about IpfsCloud API',
  },
  host: 'localhost:3001',
  basePath: '/',
};

// options for the swagger docs
let swaggerOptions = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ['./api/routes/routes.js'],
};

// initialize swagger-jsdoc
let swaggerSpec = swaggerJSDoc(swaggerOptions);

	//OrbitDB

	/*const orbitdb = new OrbitDB(ipfs);
  	const db = await orbitdb.log('database name');
  	// Add an entry to the database
  	const hash = await db.add('hello world');
  	// Get last 5 entries
  	const latest = db.iterator({ limit: 5 }).collect();
  	console.log(JSON.stringify(latest, null, 2));

  	//Intializing kvStore.
  	const kv = orbitdb.kvstore('API_Keys');

  	kv.events.on('ready', () => {
	  console.log(kv.get('volume'));
	  // 100
	})


	kv.put('volume', '100')
	  .then(() => {
	    console.log(kv.get('volume'))
	    // 100
	  })*/

//MongoCode

//Set up default mongoose connection
/* var mongoDB = 'mongodb://'+process.env.DB_USER+':'+process.env.DB_PASS+'@ds215370.mlab.com:15370/tokens';
mongoose.connect(mongoDB, { useNewUrlParser: true }, (err)=>{
	if(err){
		console.log("MongoDB failed to connect.");
	}
	else{
		console.log("database connected!");
	}
});
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:')); */



// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({limit: '500mb', extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json({limit: '500mb'}))

// allow access control origin and headers
app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    //res.header("Access-Control-Allow-Headers", "authorization");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//serving static assets
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
app.use('/swagger',express.static(pathToSwaggerUi));

/* var authenticate = function (req, res, next) {

	var header=req.headers['authorization']||'',        // get the header
    token=header.split(/\s+/).pop()||'',            // and the encoded auth token
    auth=new Buffer.from(token, 'base64').toString(),    // convert from base64
    parts=auth.split(/:/),                          // split on colon
    password=parts[1];


    if(!password){
    	res.status(401);
    	res.send("No API_KEY found in authorization header. Visit https://ipfscloud.store/docs/v1 to get an API_KEY.");
    }
    else{
    	API_Keys.find({
    	'API_KEY': password
	    }).exec((err, result)=>{
	    	if(result.length<=0){
	    		res.status(401);
	    		res.send("Invalid API_KEY");
		    }
		    else if(result.isActive){
		    	res.status(401);
		    	res.json("InActive API_KEY");
		    }
		    else{
		    	next();
		    }
	    });
    }

}

app.use(authenticate); */


// file saving
//app.use(multer({dest:'./uploads/'}));

// define a simple route
app.get('/', (req, res) => {
    res.json({"health": "good"});
});

app.get('/swagger.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
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
