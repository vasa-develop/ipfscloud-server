const mongoose = require('mongoose');
const API_Keys = require('../models/keysModel.model');


exports.createKey = function(req, res, next) {

	var API_KEY = generateKey();

	var key = new API_Keys({
	 	API_KEY: API_KEY,
    	uid: req.body.uid,
    	created_on: Date.now(),
    	isActive: true
	});	

	// Save the new model instance, passing a callback
	key.save(function (err) {
	  if (err) {
	  	res.json({"error":err});
	  }
	  else{
	  	res.json({"key": API_KEY});
	  }
	});
}

exports.changeKey = function(req, res, next) {

}

function generateKey() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 86; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
