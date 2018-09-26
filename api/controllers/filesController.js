var multer = require('multer')
var upload = multer().single('avatar')

exports.addFile = function(req, res, next) {

    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
      } else {
        // An unknown error occurred when uploading.
      }
   
      console.log(req);

      // Everything went fine.
    })

    
    /*u(req, res, function(err){
      if(err){
      	res.json({error: err});
      }
      else{
      	res.json({result: "vasa"});	
      }
    });*/
  
  };