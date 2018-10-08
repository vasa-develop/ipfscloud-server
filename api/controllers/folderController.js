/*if(req.file.path.split('.')[req.file.path.split('.').length-1] == "zip"){
            var name = random();
            fs.createReadStream('/home/ubuntu/ipfscloud-server/'+req.file.path)
            .pipe(unzip.Extract({ path: '/home/ubuntu/ipfscloud-server/uploads/'+name }))
            .on('close',function(){
	        fs.unlinkSync('/home/ubuntu/ipfscloud-server/'+req.file.path);
                readAndUploadFolder(req, res, '/home/ubuntu/ipfscloud-server/uploads/'+name);
            });

        }*/
const ipfsAPI = require('ipfs-api');
const IPFSecret = require('ipfsecret');
const fs = require('fs');
const unzip = require('unzip');
const events = require('events');
const rimraf = require('rimraf');
const nodes = require('../../config/nodes.js');
const eventEmitter = new events.EventEmitter();


const ipfs_infura = ipfsAPI({'api-path': '/api/v0/', host: nodes.ipfs_infura, port: '5001', protocol: 'https'});
const ipfsecret = new IPFSecret({ host: nodes.ipfs_infura,  port: 5001, proto: 'https' });


/*const ipfs_mumbai = ipfsAPI({'api-path': '/api/v0/', host: nodes.ipfs_mumbai, port: '5001', protocol: 'https'});
const ipfs_virginia = ipfsAPI({'api-path': '/api/v0/', host: nodes.ipfs_virginia, port: '5001', protocol: 'https'});
const ipfs_california = ipfsAPI({'api-path': '/api/v0/', host: nodes.ipfs_california, port: '5001', protocol: 'https'});
const ipfs_paris = ipfsAPI({'api-path': '/api/v0/', host: nodes.ipfs_paris, port: '5001', protocol: 'https'});
const ipfs_tokyo = ipfsAPI({'api-path': '/api/v0/', host: nodes.ipfs_tokyo, port: '5001', protocol: 'https'});
const ipfs_sydney = ipfsAPI({'api-path': '/api/v0/', host: nodes.ipfs_sydney, port: '5001', protocol: 'https'});*/

exports.upload = function(req, res, next) {

	//console.log(req);
	var details = JSON.parse(req.body['details']); //JSON array
	var files = req.files; //Files array

	var filePath;

	var useFullPath = false;

	if(details[0].fullPath.split('/').length == 1){
		filePath = details[0].webkitRelativePath.split('/')[0];
		useFullPath = false;
	}
	else{
		filePath = details[0].fullPath.split('/')[1];
		useFullPath = true;
	}
	

	var count = 0;

	var uploadsCompleted = 0;


	
	details.forEach((x)=>{
		var start, relativePath, folders;
		if(useFullPath){
			folders = x.fullPath.split('/');
			relativePath = x.fullPath.substring(1,x.fullPath.length);
			start = 1;
		}
		else{
			folders = x.webkitRelativePath.split('/');
			relativePath = x.webkitRelativePath;
			start = 0;
		}
		var path = "";

		for(var i = start; i < folders.length-1; i++){

			path = path + folders[i] + "/";


			if (!fs.existsSync(path)){
			    fs.mkdirSync(path);
			}


			console.log(path+ " exixts3: "+fs.existsSync(path));
		}


		fs.writeFile(relativePath, files[count].buffer, { flag: 'w' }, function (err) {
		    if (err) throw err;
		    uploadsCompleted++;
		    console.log("It's saved!");
		    if(uploadsCompleted == files.length){
		    	console.log("path: "+filePath);
		    	uploadToIpfs(filePath, res);
		    }
		});

	
		count++;
	});

	
}


exports.secretUpload = function(req, res, next) {

	//console.log(req);
	var details = JSON.parse(req.body['details']); //JSON array
	var files = req.files; //Files array

	var filePath;

	var useFullPath = false;

	if(details[0].fullPath.split('/').length == 1){
		filePath = details[0].webkitRelativePath.split('/')[0];
		useFullPath = false;
	}
	else{
		filePath = details[0].fullPath.split('/')[1];
		useFullPath = true;
	}
	

	var count = 0;

	var uploadsCompleted = 0;


	
	details.forEach((x)=>{
		var start, relativePath, folders;
		if(useFullPath){
			folders = x.fullPath.split('/');
			relativePath = x.fullPath.substring(1,x.fullPath.length);
			start = 1;
		}
		else{
			folders = x.webkitRelativePath.split('/');
			relativePath = x.webkitRelativePath;
			start = 0;
		}
		var path = "";

		for(var i = start; i < folders.length-1; i++){

			path = path + folders[i] + "/";


			if (!fs.existsSync(path)){
			    fs.mkdirSync(path);
			}


			console.log(path+ " exixts3: "+fs.existsSync(path));
		}


		fs.writeFile(relativePath, files[count].buffer, { flag: 'w' }, function (err) {
		    if (err) throw err;
		    uploadsCompleted++;
		    console.log("It's saved!");
		    if(uploadsCompleted == files.length){
		    	console.log("path: "+filePath);
		    	uploadToIpfsSecret(filePath, req.body.key , res);

		    }
		});

	
		count++;
	});

	
}

function uploadToIpfs(_filePath, res){
	console.log("IPFSCLOUD: "+_filePath);
	ipfs_infura.util.addFromFs(_filePath, { recursive: true }, (err, result) => {
      if (err) { throw err }
      
      res.json({"result": result});


      ipfs_infura.pin.add(result[result.length-1].hash, function (_err, _res){
        if(_err){
          console.log(_err);
        }
        else{
          console.log(_res);
          rimraf(_filePath, function () { console.log('done'); });
        }
      });
    });

}

function uploadToIpfsSecret(_filePath, secret, res){
	var _root = "/home/vasa/Desktop/Pet_projects/ipfscloud-pngs/ipfs_server/";

	ipfsecret.addIndexed(_filePath, {passphrase: secret , suffix: 'crypt'})
      .then(results => {
      	res.json({"result": results});
      	
      		
	      	ipfs_infura.pin.add(results[results.length-1].hash, function (_err, _res){
	            if(_err){
	              
	              console.log(_err);
	            }
	            else{
	              
	              console.log(_res);
	              
	            }
	           });
      	
      	rimraf(_filePath, function () { console.log('done'); });



      })
      .catch(error =>{
      		//res.json(error);
          	console.log(error);
      });
}



