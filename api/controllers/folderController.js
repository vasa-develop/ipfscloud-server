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
const zipFolder = require('zip-folder');
const unzip = require('unzip');
const rimraf = require('rimraf');
const nodes = require('../../config/nodes.js');


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
		    	uploadToIpfs(filePath, details, res);
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

function uploadToIpfs(_filePath, details, res){
	console.log("IPFSCLOUD: "+_filePath);
	ipfs_infura.util.addFromFs(_filePath, { recursive: true }, (err, result) => {
      if (err) { throw err }
      
      detailsObj = {};

      for(var i=0; i<details.length;i++){
      	detailsObj[details[i].fullPath] = details[i];
      }

      for(var j=0; j<result.length;j++){
      	if(detailsObj["/"+result[j].path]){
      		result[j].contentType = detailsObj["/"+result[j].path].type;
      	}
      	else{
      		result[j].contentType = "clusterlabs.ipfscloud/folder";
      	}
      }

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

	ipfsecret.add(_filePath, {passphrase: secret , suffix: 'crypt'})
      .then(results => {

      	res.json({"result": results});
      	
      		
	    /*ipfs_infura.pin.add(results[results.length-1].hash, function (_err, _res){
	         if(_err){
	              
	           console.log(_err);
	         }
	         else{
	           	results[results.length-1].hash = results[results.length-1].hash + "/ipfsecret.html";
              	results[results.length-1].path = results[results.length-7].path.split("/")[1];
              	results[results.length-1].size = results[results.length-7].size;

              	res.json(results[results.length-1]);
	           	console.log(results[results.length-1]);
	              
	         }
	        });*/
      	
      	rimraf(_filePath, function () { console.log('done'); });

      })
      .catch(error =>{
      		//res.json(error);
          	console.log(error);
      });
}


//////////////////

exports.getFolder = function(req, res, next) {
	const validCID = req.params.id;

	var count = 0;

	ipfs_infura.files.get(validCID)
	.then((data)=>{
		data.forEach((x)=>{
			count++;
			//if the object is a file
			if(x.content){
				var dirStructure = x.path.split("/");
				dirStructure.pop();
				var dirPath = "";
				dirStructure.forEach((dir)=>{
					dirPath = dirPath + dir + "/";
					if (!fs.existsSync(dirPath)){
					    fs.mkdirSync(dirPath);
					}
				});
				
				fs.writeFile(x.path, x.content, { flag: 'w' }, function (err) {
				    if (err) {throw err;}
				    else{
				    	if(count == data.length){
				    		zipFolder(x.path.split("/")[0], x.path.split("/")[0]+".zip", function(err) {
							    if(err) {
							        console.log('Error while zipping folder: ', err);
							    } else {
							        fs.readFile(x.path.split("/")[0]+".zip", function(err, data){
									    if(err) {throw err;}
									    else{
									    	res.setHeader('content-type', 'application/zip');
									    	res.send(data);
									    	fs.unlink(x.path.split("/")[0]+".zip", (err) => {
											  if (err) throw err;
											});
									    	rimraf(x.path.split("/")[0], function () { console.log('done'); });
									    }
									    
									});
							    }
							});
				    	}
				    }
				});
			}
			//if the object is a folder
			else{
				if (!fs.existsSync(x.path)){
				    fs.mkdirSync(x.path);
				}
			}
		});
	});
}