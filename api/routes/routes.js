'use strict';
var member = require('../controllers/fileController.js');

module.exports = function(app) {

 app.route('/upload')
    .post(member.upload);

 app.route('/')
};

