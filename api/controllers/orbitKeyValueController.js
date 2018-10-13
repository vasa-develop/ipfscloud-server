const OrbitDB = require('orbit-db');
const nodes = require('../../config/nodes.js');
const ipfsAPI = require('ipfs-api');
const IPFS = require('ipfs');
const ipfs = new IPFS();


const ipfs_infura = ipfsAPI({'api-path': '/api/v0/', host: nodes.ipfs_infura, port: '5001', protocol: 'https'});
const ipfs_virginia = ipfsAPI({'api-path': '/api/v0/', host: nodes.ipfs_virginia, port: '5001', protocol: 'https'});

exports.show = async function(req, res, next) {

/*	const orbitdb = new OrbitDB(ipfs_virginia);	
	
	console.log("key: "+orbitdb.key.getPublic('hex'));
	

  	const access = {
    	// Setup write access
    	write: [
      	// Give access to ourselves
      	// Give access to the second peer
      	'042c07044e7ea51a489c02854db5e09f0191690dc59db0afd95328c9db614a2976e088cab7c86d7e48183191258fc59dc699653508ce25bf0369d67f33d5d77839',
    	],
  	};

  	const db1 = await orbitdb.keyvalue('database1', access);
	const address = db1.address;

	await db1.put('key1', 'hello1');
	await db1.put('key2', 'hello2');
	await db1.put('key3', 'hello3');

	var value1 = db1.get('key1');
	var value2 = db1.get('key2');
	var value3 = db1.get('key3');

	console.log("value1: "+value1);
	console.log("value2: "+value2);
	console.log("value3: "+value3);*/

	
ipfs.on('ready', async () => {
	console.log("node is up!");
  const orbitdb = new OrbitDB(ipfs)
  const db = await orbitdb.keyvalue('first-database')
  await db.put('name', 'hello')
  const value = db.get('name')
  res.send(value);
})


	
}


