var AWS = require('aws-sdk');
var access_key_id = process.env.access_key_id
var secret_access_key = process.env.secret_access_key

AWS.config.update( {accessKeyId: access_key_id, secretAccessKey: secret_access_key} );

var s3 = new AWS.S3({params: {Bucket: 'authphotos'}});

module.exports = s3;
