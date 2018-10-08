'use strict';
const file = require('../controllers/fileController.js');
const folder = require('../controllers/folderController.js');
const share = require('../controllers/shareController.js');
const multer  = require('multer');
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });



module.exports = function(app) {

 app.route('/file')
    .post(upload.single('profile-pic'), file.upload);

 app.route('/file/private')
    .post(upload.any(), file.secretUpload);

 /*app.route('/file/private/:info')
    .get(file.getFile);*/

 app.route('/folder')
 	.post(upload.any(), folder.upload);

 app.route('/folder/private')
   .post(upload.any(), folder.secretUpload);

 /*app.route('/folder/private/:info')
   .get(folder.getFolder);
*/

 app.route('/email')
   .post(share.sendEmail);


 app.route('/')

};

