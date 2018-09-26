var fs = require('fs');
var s3 = require('../config/s3.js')

exports.new = function(files, body) {
 return {file: '../path/to/file'}
}


var uploadToS3 = function(file) {
  fs.readFile(file.path, function (err, data) {
       var params = {
                Key: file.originalname,
                Body: data
            };

       s3.upload(params, function (err, data) {
                // Whether there is an error or not, delete the temp file
                fs.unlink(file.path, function (err) {
                    if (err) {
                        console.error(err);
                    }
                    console.log('Temp File Delete');
                });

                if (err) {
                    console.log('ERROR MSG: ', err);
                } else {
                    console.log('Successfully uploaded data');
                }
       });
     });
}
