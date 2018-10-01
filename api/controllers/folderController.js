/*if(req.file.path.split('.')[req.file.path.split('.').length-1] == "zip"){
            var name = random();
            fs.createReadStream('/home/ubuntu/ipfscloud-server/'+req.file.path)
            .pipe(unzip.Extract({ path: '/home/ubuntu/ipfscloud-server/uploads/'+name }))
            .on('close',function(){
	        fs.unlinkSync('/home/ubuntu/ipfscloud-server/'+req.file.path);
                readAndUploadFolder(req, res, '/home/ubuntu/ipfscloud-server/uploads/'+name);
            });

        }*/
const upload = require("../../config/storage.js");
const fs = require("fs");
const ipfsAPI = require('ipfs-api');
const unzip = require('unzip');
const events = require('events');
const rimraf = require('rimraf');
const nodes = require('../../config/nodes.js');
const eventEmitter = new events.EventEmitter();
//svar random = require('../../lib/random.js')
var content;

exports.upload = function(req, res, next) {
	res.send(nodes.ipfs_mumbai);
}


function readAndUploadFolder(req, res, name){

    ipfs.util.addFromFs(name, { recursive: true }, (err, result) => {
      if (err) { throw err }
      rimraf(name, function () { console.log('done'); });
      res.json(result);
    });

  
}






const ipfs_infura = ipfsAPI({'api-path': '/api/v0/', host: nodes.ipfs_infura, port: '5001', protocol: 'https'});
/*const ipfs_mumbai = ipfsAPI({'api-path': '/api/v0/', host: nodes.ipfs_mumbai, port: '5001', protocol: 'https'});
const ipfs_virginia = ipfsAPI({'api-path': '/api/v0/', host: nodes.ipfs_virginia, port: '5001', protocol: 'https'});
const ipfs_california = ipfsAPI({'api-path': '/api/v0/', host: nodes.ipfs_california, port: '5001', protocol: 'https'});
const ipfs_paris = ipfsAPI({'api-path': '/api/v0/', host: nodes.ipfs_paris, port: '5001', protocol: 'https'});
const ipfs_tokyo = ipfsAPI({'api-path': '/api/v0/', host: nodes.ipfs_tokyo, port: '5001', protocol: 'https'});
const ipfs_sydney = ipfsAPI({'api-path': '/api/v0/', host: nodes.ipfs_sydney, port: '5001', protocol: 'https'});*/

exports.upload = function(req, res, next) {

	//haindling the reqest object to 
	


    u = upload.single('profile-pic')
    u(req, res, function(err){
        if(err){
            res.json({"error": err});
        }
    //readAndUploadFile(req, res, '/home/ubuntu/ipfscloud-server/'+req.file.path);
    readAndUploadFile(req, res, '/home/vasa/Desktop/Pet_projects/ipfscloud-pngs/ipfs_server/'+req.file.path);

    });
  
  };

function readAndUploadFile(req, res, name){
    fs.readFile(name, function read(err, data) {
            if (err) {
                throw err;
            }
            content = data;
            
            ipfs_infura.files.add(ipfs_infura.Buffer.from(content), { recursive: true }, function(error, result) {
                if (error || !result) {
                  console.log(error);
                  res.json({error: error});
                }
                else{
                    res.json({"hash": result[0].hash, "size": result[0].size});

                    fs.unlinkSync(name);
                                        
                    ipfs_infura.pin.add(result[0].hash);
                    /*ipfs_mumbai.pin.add(result[0].hash);
                    ipfs_virginia.pin.add(result[0].hash);
                    ipfs_california.pin.add(result[0].hash);
                    ipfs_paris.pin.add(result[0].hash);
                    ipfs_tokyo.pin.add(result[0].hash);
                    ipfs_sydney.pin.add(result[0].hash);*/

                }
            });

            
            // Invoke the next step here however you like
            // Put all of the code here (not the best solution)
        });
}

function random() {
    console.log("Creating Unq ID");
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
   
    for (var i = 0; i < 16; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
   
    return text;
}
