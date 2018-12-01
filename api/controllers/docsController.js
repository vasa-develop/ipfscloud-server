const ipfsAPI = require('ipfs-api');
const nodes = require('../../config/nodes.js');
const fs = require('fs');
const DOCS = require('../models/docsModel.model');
const ipfs_infura = ipfsAPI({'api-path': '/api/v0/', host: nodes.ipfs_infura, port: '5001', protocol: 'https'});


exports.addNewDoc = function(req, res, next) {

	var roomId = generateId();

	var doc = new DOCS({
		docName: "Untitled Document",	//doc title
		body: "<p><br></p>",			//doc body
		roomId: roomId, 				//roomId
		owner: req.body.uid, 			//owner of doc
		type: req.body.type, 			//public: 0 or private: 1
		read: [req.body.uid],			//users with read access
		write: [req.body.uid],			//users with write access
		createdAt: Date(),
		lastEditedAt: Date()
	   });

   // Save the new model instance, passing a callback
   doc.save(function (err) {
	 if (err) {
		 res.json({"error":err});
	 }
	 else{
		 res.json({"docId": roomId});
	 }
   });
}

exports.changeDocPermissions = function(req, res, next) {

	var permissions = req.body;

	//TODO: Implement better security measures!

	if(permissions.roomId){

		var query = {'roomId':permissions.roomId};


		DOCS.find(
			query
		).exec((err, result)=>{
			if(err){
				res.json({"error": err});
			}
			else{

				//console.log(result);

				var temp = result;

				if(permissions.type){
					console.log(permissions.type);
					temp[0].type = permissions.type;
				}
				if(permissions.write){
					permissions.write.split(',').forEach((x)=>{
						temp[0].write.push(x);
					});
				}
				if(permissions.read){
					permissions.read.split(',').forEach((x)=>{
						temp[0].read.push(x);
					});
					
				}

				DOCS.findOneAndUpdate(query, temp[0], {upsert:true}, function(err, doc){
					if (err) return res.send(500, { error: err });
					return res.json({"result":"changes succesfully saved"});
				});
			}
		});

		
	}
	else{
		res.json({"error": "no roomId specified"});
	}

}

exports.getDocInfo = function(req, res, next) {

	var query = req.query;
	console.log(query);

    DOCS.find({
		'roomId': query.roomId
	    }).exec((err, result)=>{

			var isAllowed, error, title, body;

			if(err){
				res.json({
					allowed: false,
					error: err
				});
			}
			else if(result.length == 0){
				res.json({
					allowed: false,
					error: "no such document exists"
				});
			}
			else{
	    	if(query.type == "0"){
				title = result[0].docName;
				body = result[0].body;
				isAllowed = true;
				error = null;
			}
			else{
				if(query.access == "w"){
					if(result[0].write.includes(query.uid)){
						title = result[0].docName;
						body = result[0].body;
						isAllowed = true;
						error = null;
					}
					else{
						isAllowed = false;
						error = "user is not allowed to edit this document";
					}
				}
				else if(query.access == "r"){
					if(result[0].read.includes(query.uid)){
						title = result[0].docName;
						body = result[0].body;
						isAllowed = true;
						error = null;
					}
					else{
						isAllowed = false;
						error = "user is not allowed to read this document";
					}
				}
				else{
					isAllowed = false;
					error = "please specify access type";
				}
			}
				res.json({
					title: title,
					body: body,
					allowed: isAllowed,
					error: error
				});
			}
		});    
}

exports.getUserDocs = function(req, res, next) {
	DOCS.find({
		'owner': req.params.uid
	    }).exec((err, result)=>{
			res.json({docs: result});
		});
}

exports.updateDocument = function(req, res, next) {

	var updates = {
		"docName": req.body.title,
		"body": req.body.body
	};

	DOCS.findOneAndUpdate({
		'roomId': req.body.roomId
	}, updates, {upsert:true}, function(err, doc){
		if (err) return res.send(500, { error: err });
		return res.json({"result":"changes succesfully saved"});
	});
}

function generateId() {
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
	for (var i = 0; i < 16; i++)
	  text += possible.charAt(Math.floor(Math.random() * possible.length));
  
	return text;
  }