const cmd = require('node-cmd');

exports.sendEmail = function(req, res, next) {

	var body = req.body.body;
	var subject = req.body.subject;
	var to = req.body.to;

	cmd.run('echo \"'+body+'\" | mail -s \"'+subject+'\" '+to+' ');

	res.json({"result": "mail sent successfully"});
}

