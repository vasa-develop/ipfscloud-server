const ipfsAPI = require('ipfs-api');
const unzip = require('unzip');
const events = require('events');
const rimraf = require('rimraf');
const nodes = require('../../config/nodes.js');
const eventEmitter = new events.EventEmitter();


const ipfs_infura = ipfsAPI({'api-path': '/api/v0/', host: nodes.ipfs_infura, port: '5001', protocol: 'https'});
/*const ipfs_mumbai = ipfsAPI({'api-path': '/api/v0/', host: nodes.ipfs_mumbai, port: '5001', protocol: 'https'});
const ipfs_virginia = ipfsAPI({'api-path': '/api/v0/', host: nodes.ipfs_virginia, port: '5001', protocol: 'https'});
const ipfs_california = ipfsAPI({'api-path': '/api/v0/', host: nodes.ipfs_california, port: '5001', protocol: 'https'});
const ipfs_paris = ipfsAPI({'api-path': '/api/v0/', host: nodes.ipfs_paris, port: '5001', protocol: 'https'});
const ipfs_tokyo = ipfsAPI({'api-path': '/api/v0/', host: nodes.ipfs_tokyo, port: '5001', protocol: 'https'});
const ipfs_sydney = ipfsAPI({'api-path': '/api/v0/', host: nodes.ipfs_sydney, port: '5001', protocol: 'https'});*/

exports.upload = function(req, res, next) {

    ipfs_infura.files.add(ipfs_infura.Buffer.from(req.file.buffer), function(error, result) {
                if (error || !result) {
                  console.log(error);
                  res.json({error: error});
                }
                else{
                    res.json({"hash": result[0].hash, "size": result[0].size});
                                        
                    ipfs_infura.pin.add(result[0].hash);
                    /*ipfs_mumbai.pin.add(result[0].hash);
                    ipfs_virginia.pin.add(result[0].hash);
                    ipfs_california.pin.add(result[0].hash);
                    ipfs_paris.pin.add(result[0].hash);
                    ipfs_tokyo.pin.add(result[0].hash);
                    ipfs_sydney.pin.add(result[0].hash);*/

                }
            });
  };

