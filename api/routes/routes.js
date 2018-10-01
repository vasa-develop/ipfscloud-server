'use strict';
const file = require('../controllers/fileController.js');
const folder = require('../controllers/folderController.js');
const multer  = require('multer');
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });



module.exports = function(app) {

 app.route('/upload/file')
    .post(upload.single('profile-pic'), file.upload);

 app.route('/upload/folder')
 	.post(folder.upload);

 app.route('/')
};

