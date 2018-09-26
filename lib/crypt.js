var crypto = require('crypto');
var fs = require('fs');
var algorithm = 'aes-128-ecb';

exports.decrypt = function(salt, data) {
    console.log("salt", salt);
  return new Promise(function(resolve, reject) {
     
      var key = sha1(salt);
      var decipher = crypto.createDecipheriv(algorithm, key, '')
      var dec = decipher.update(data, 'binary', 'utf8');
      dec += decipher.final('utf8');
      resolve(dec);
  });
};

function sha1( data ) {
     var generator = crypto.createHash('sha1');
     generator.update( data )  
     let key = generator.digest();
     key = key.slice(0, 16);
     return key
}
  