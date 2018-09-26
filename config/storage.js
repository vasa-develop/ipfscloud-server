const multer = require('multer');
const fs = require("fs");
var content;

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
  	console.log(file);
  	var name = makeid()+file.originalname;
    cb(null, name);
  }
});
module.exports = multer({ storage: storage });
//module.exports = multer({ dest: 'uploads/' })


function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
