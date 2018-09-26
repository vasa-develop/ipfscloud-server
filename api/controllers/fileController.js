const upload = require("../../config/storage.js");
const fs = require("fs");
var ipfsAPI = require('ipfs-api');
var unzip = require('unzip');
var events = require('events');
var rimraf = require('rimraf');

var eventEmitter = new events.EventEmitter();
//svar random = require('../../lib/random.js')
var content;

var ipfs = ipfsAPI({'api-path': '/api/v0/', host: 'ipfs.infura.io', port: '5001', protocol: 'https'});

exports.upload = function(req, res, next) {
    u = upload.single('profile-pic')
    u(req, res, function(err){
        if(err){
            res.json({"error": err});
        }

        if(req.file.path.split('.')[req.file.path.split('.').length-1] == "zip"){
            var name = random();
            fs.createReadStream('/home/vasa/Desktop/Authox/authapi/'+req.file.path)
            .pipe(unzip.Extract({ path: '/home/vasa/Desktop/Authox/authapi/uploads/'+name }))
            .on('close',function(){
                readAndUploadFolder(req, res, '/home/vasa/Desktop/Authox/authapi/uploads/'+name);
            });

        }else{
            readAndUploadFile(req, res, '/home/vasa/Desktop/Authox/authapi/'+req.file.path);
        }

        

        
        
  

    });
  
  };

  function readAndUploadFolder(req, res, name){

    ipfs.util.addFromFs(name, { recursive: true }, (err, result) => {
      if (err) { throw err }
      rimraf(name, function () { console.log('done'); });
      res.json(result);
    });

  
}

function readAndUploadFile(req, res, name){
    fs.readFile(name, function read(err, data) {
            if (err) {
                throw err;
            }
            content = data;
            
            ipfs.files.add(ipfs.Buffer.from(content), { recursive: true }, function(error, result) {
                if (error || !result) {
                  console.log(error);
                  res.json({error: error});
                }
                else{
                    console.log("HASH: "+result[0].hash);
                    ipfs.pin.add(result[0].hash, function (err,_res){
                        if(err){
                          console.log(err);
                        } else{
                          console.log(result);
                          res.json({"hash": result[0].hash, "size": result[0].size});
                          fs.unlinkSync(name);
                        } 
                      })
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