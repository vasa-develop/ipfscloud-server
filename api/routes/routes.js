'use strict';

const file = require('../controllers/filesController.js');
const folder = require('../controllers/foldersController.js');
const user = require('../controllers/usersController.js');



module.exports = function(app) {
	app.route('/file')
    	.post(file.addFile);

    app.route('/folder')
    	.post(folder.addFolder);

    app.route('/share/mail')
    	.post(user.shareViaMail);

    app.route('/share/pubKey')
    	.post(user.shareViaPubKey);

    app.route('/')
}