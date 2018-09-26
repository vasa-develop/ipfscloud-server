/*var nodemailer = require('nodemailer');
var ses = require('nodemailer-ses-transport');

var transporter = nodemailer.createTransport(ses({
    accessKeyId: process.env.access_key_id, 
    secretAccessKey: process.env.secret_access_key
}));

exports.shareDocumentEmail = function(email, link) {
  console.log("where mail");
  return new Promise(function(resolve, reject) {
    const mailOptions = {
      from: '"Authox Admin" <vasa@towardsblockchain.com>', // sender address
      to: email, // list of receivers
      subject: 'Document shared with you', // Subject line
      html: `<p>document link - ${link}</p>`// plain text body
    };
    transporter.sendMail(mailOptions)
               .then(function(suc) {console.log(suc); resolve(suc)})
               .catch(function(error) {console.log(error); reject(err);})
  });
};*/

var nodeMailer = require('nodemailer');
var ses = require('nodemailer-ses-transport');

let transporter = nodeMailer.createTransport({
  host: 'email-smtp.us-east-1.amazonaws.com',
  port: 465,
  secure: true,
  auth: {
      user: 'AKIAJU4MKN7IAAWJKVTQ',
      pass: 'Avp/zEJsHc9/dOf/6UflEzUceoLR6Gw+L3jGrEdnpRHz'
  }
});

exports.shareDocumentEmail = function(to, subject, body, link) {
  console.log("where mail");
  if(!to){to = 'vasa@towardsblockchain.com';}
  return new Promise(function(resolve, reject) {
    const mailOptions = {
      from: '"Authox Admin" <vasa@towardsblockchain.com>', // sender address
      to: to, // list of receivers
      subject: subject, // Subject line
      text: body, // plain text body
      html: `<p>document link - ${link}</p>` // html body
  };
    transporter.sendMail(mailOptions)
               .then(function(suc) {console.log(suc); resolve(suc)})
               .catch(function(error) {console.log(error); reject(error);})
  });
};



