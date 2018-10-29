const rimraf = require('rimraf');
const fs = require("fs");
const unzip = require('unzip');
const ipfsAPI = require('ipfs-api');
const nodes = require('../../config/nodes.js');
const ipfs_infura = ipfsAPI({'api-path': '/api/v0/', host: nodes.ipfs_infura, port: '5001', protocol: 'https'});

exports.upload = function(req, res, next) {

	var fileName = req.body['url'].split("/")[req.body['url'].split("/").length-1];

	fs.writeFile(req.files[0].originalname, req.files[0].buffer, function(err) {
	    if(err) {
	        return console.log(err);
	    }
	    fs.createReadStream(req.files[0].originalname)
		.pipe(unzip.Extract({ path: fileName }))
		.on('close',function(){

		    ipfs_infura.util.addFromFs(fileName+"/"+req.files[0].originalname.substring(0,req.files[0].originalname.length-4), { recursive: true }, (err, result) => {
	      		if (err) { throw err }
	      		else{
	      			
	      			
	      			res.json(result[result.length-1]);

	      			fs.appendFile('sites.txt', fileName+","+result[result.length-1].hash+",", function (err) {
					  if (err) throw err;
					  console.log('Saved!');
					  rimraf(fileName, function () { console.log('done'); });
					  fs.unlinkSync(req.files[0].originalname);
					});
	      		}
	      	});
		});
	}); 

		
}


exports.redirect = function(req, res, next) {
	fs.readFile('sites.txt','utf8', function read(err, data) {
	    if (err) {
	        res.json(err);
	    }
	    
	    
	    var content = data.split(",");
	    var url = req.originalUrl.substring(6,req.originalUrl.length)
	    for(var i = 0; i < content.length; i++){

	    	if(content[i] == url){
	    		const targetUrl = "https://gateway.ipfs.io/ipfs/" + content[i+1];
  				res.redirect(targetUrl);
  				break;
	    	}
	    }

	    res.json({"message":"URL https://api.ipfscloud.store/host/"+url+" doesn't exist."})
	    
	});
}

exports.isValidURL = function(req, res, next) {
	fs.readFile('sites.txt','utf8', function read(err, data) {
	    if (err) {
	        res.json(err);
	    }

	    var lock = true;
	    var content = data.split(",");
	    var url = req.query.url;
	    for(var i = 0; i < content.length; i++){

	    	if(content[i] == url){
  				res.json({"result":"true"});
  				lock = false;
  				break;
	    	}
	    }
	    if(lock){
	    	res.json({"result":"false"})
	    }
	});
}