const ipfsAPI = require('ipfs-api');
const IPFSecret = require('ipfsecret');
const ipfsSecret = require('ipfsecret');
const unzip = require('unzip');
const events = require('events');
const rimraf = require('rimraf');
const nodes = require('../../config/nodes.js');
const fs = require('fs');
const path = require('path');

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
      ipfsecret.addIndexed(req.files[0].originalname, {passphrase: req.body.key , suffix: 'crypt'})
      .then(results => {
          console.log(results);

          ipfs_infura.pin.add(results[results.length-1].hash, function (_err, _res){
            if(_err){
              res.json(_err);
              console.log(_err);
            }
            else{
              results[results.length-1].hash = results[results.length-1].hash + "/ipfsecret.html";
              res.json(results[results.length-1]);
              console.log(results[results.length-1]);
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
 
    
    console.log("hash: "+info[0], "secret: "+info[1])

    ipfsecret.get(hash, info[1])
        .then((stream) => {stream.on('data', (obj) => {
            if (obj.content) {

              /*fetch('https://assets-cdn.github.com/images/modules/logos_page/Octocat.png')
              .then(res => {
                  return new Promise((resolve, reject) => {
                      const dest = fs.createWriteStream('./octocat.png');
                      res.body.pipe(dest);
                      res.body.on('error', err => {
                          reject(err);
                      });
                      dest.on('finish', () => {
                          resolve();
                      });
                      dest.on('error', err => {
                          reject(err);
                      });
                  });
              });*/

                var filename = path.basename(obj.path),
                    writeable = fs.createWriteStream(filename);
                obj.content.pipe(writeable);
                obj.content.on('finish', () => {
                    console.log('Wrote ' + filename);
                    fs.createReadStream(filename).pipe(response);
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


