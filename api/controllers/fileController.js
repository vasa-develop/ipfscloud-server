const ipfsAPI = require('ipfs-api');
const IPFSecret = require('ipfsecret');
const unzip = require('unzip');
const events = require('events');
const rimraf = require('rimraf');
const nodes = require('../../config/nodes.js');
const fs = require('fs');
const path = require('path');

const fileType = require('file-type');

const ipfs_infura = ipfsAPI({'api-path': '/api/v0/', host: nodes.ipfs_infura, port: '5001', protocol: 'https'});
const ipfsecret = new IPFSecret({ host: nodes.ipfs_infura,  port: 5001, proto: 'https' });
/*const ipfs_mumbai = ipfsAPI({'api-path': '/api/v0/', host: nodes.ipfs_mumbai, port: '5001', protocol: 'https'});
const ipfs_virginia = ipfsAPI({'api-path': '/api/v0/', host: nodes.ipfs_virginia, port: '5001', protocol: 'https'});
const ipfs_california = ipfsAPI({'api-path': '/api/v0/', host: nodes.ipfs_california, port: '5001', protocol: 'https'});
const ipfs_paris = ipfsAPI({'api-path': '/api/v0/', host: nodes.ipfs_paris, port: '5001', protocol: 'https'});
const ipfs_tokyo = ipfsAPI({'api-path': '/api/v0/', host: nodes.ipfs_tokyo, port: '5001', protocol: 'https'});
const ipfs_sydney = ipfsAPI({'api-path': '/api/v0/', host: nodes.ipfs_sydney, port: '5001', protocol: 'https'});*/

exports.secretUpload = function(req, res, next) {

    
    console.log(req.files);
    
    fs.writeFile(req.files[0].originalname, req.files[0].buffer, function (err) {
      
      if(err){
        res.json(err);
        console.log(err);
      }
      ipfsecret.add(req.files[0].originalname, {passphrase: req.body.key , suffix: 'crypt'})
      .then(results => {
          console.log(results);

          res.json(results);

          ipfs_infura.pin.add(results[results.length-1].hash, function (_err, _res){
            if(_err){
              res.json(_err);
              console.log(_err);
            }
            else{
              fs.unlinkSync(req.files[0].originalname);
            }
           });
      })
      .catch(error => {
          res.json(error);
          console.log(error);
      });
    });

    
  };

exports.upload = function(req, res, next) {

    ipfs_infura.files.add(ipfs_infura.Buffer.from(req.file.buffer), function(error, result) {
                if (error || !result) {
                  console.log(error);
                  res.json({error: error});
                }
                else{

                    res.json(result[0]);
                                        
                    ipfs_infura.pin.add(result[0].hash, function (_err, _res){
                      if(_err){
                        console.log(_err);
                      }
                      else{
                        console.log(_res);
                      }
                    });
                    /*ipfs_mumbai.pin.add(result[0].hash);
                    ipfs_virginia.pin.add(result[0].hash);
                    ipfs_california.pin.add(result[0].hash);
                    ipfs_paris.pin.add(result[0].hash);
                    ipfs_tokyo.pin.add(result[0].hash);
                    ipfs_sydney.pin.add(result[0].hash);*/

                }
            });
  };


exports.getFile = function(req, res, next) {

    var info = req.params.info.split('~');
    var hash = info[0];


    ipfsecret.get(hash, info[1])
        .then((stream) => {stream.on('data', (obj) => {
            if (obj.content) {
                var filename = path.basename(obj.path),
                    writeable = fs.createWriteStream(filename);
                obj.content.pipe(writeable);
                obj.content.on('finish', () => {
                    console.log('Wrote ' + filename);
                    fs.readFile(filename, function(err, data){
                      if(err) {throw err;}
                      else{
                        res.setHeader('content-type', fileType(data).mime);
                        res.send(data);
                        fs.unlink(filename, (err) => {
                          if (err) throw err;
                        });
                      }
                    });
                });
                obj.content.on('error', (err) => {
                    console.error('Error: ' + err);
                });
            }
        });})
        .catch(err => {
            console.error(err);
        });
};


