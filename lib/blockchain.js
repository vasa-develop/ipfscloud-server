const axios = require('axios');
var querystring = require('querystring');
var blockchain = require('../config/blockchain.js');
var http = require('http');
var web3 = require('../config/web3.js');
var abi = require('../config/abi.js');
var address = "0x763aafa318ec048f64f71e0cb2d8b61616181dd6";
var fromAddress = "0x64bae0506c0fc37d44bbcfcab5433520f4452914";

exports.users = function() {
  return new Promise(function(resolve, reject) {
    axios.get('https://jsonplaceholder.typicode.com/posts')
         .then(response => {
            resolve(response.data);
          })
         .catch(error => {
            console.log(error);
            reject(error);
         });
  });
};



exports.createAccount = function(pubKey, userHash, metadataHash, userClass, salt, isOrg) {
  return new Promise(function(resolve, reject) {

    var post_data = querystring.stringify({
          'pubKey' : pubKey,
          'userHash' : userHash,
          'metadataHash' : metadataHash,
          'userClass' : userClass,
          'salt' : salt,
          'isOrg' : isOrg
      });

    var post_options = {
        host: blockchain.ip,
        port: blockchain.port,
        path: '/account',
        method: 'POST',
        headers: {
                          'Content-Type': 'application/x-www-form-urlencoded',
                          'Content-Length': Buffer.byteLength(post_data)
                      }
    };

    // Set up the request
    var post_req = http.request(post_options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log(typeof(chunk));
            resolve(chunk);
        });
        //resolve(res);
    });

    // post the data
    post_req.write(post_data);
    post_req.end();
  });
}




exports.changeAccount = function(newUserHash, pubKey) {
  return new Promise(function(resolve, reject) {

    var post_data = querystring.stringify({
          'newUserHash' : newUserHash,
          'pubKey' : pubKey
      });

    var post_options = {
        host: blockchain.ip,
        port: blockchain.port,
        path: '/newAccount',
        method: 'POST',
        headers: {
                          'Content-Type': 'application/x-www-form-urlencoded',
                          'Content-Length': Buffer.byteLength(post_data)
                      }
    };

    // Set up the request
    var post_req = http.request(post_options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log(typeof(chunk));
            resolve(chunk);
        });
        //resolve(res);
    });

    // post the data
    post_req.write(post_data);
    post_req.end();
 
  });
}



exports.addDocument = function(userHash, documentHash, documentMetadataHash, documentClass, hasSubDocs, documentTransactionMetadataHash, transactionClass) {
  return new Promise(function(resolve, reject) {


    var post_data = querystring.stringify({
          'userHash' : userHash,
          'documentHash' : documentHash,
          'documentMetadataHash': documentMetadataHash,
          'documentClass': documentClass,
          'hasSubDocs': hasSubDocs,
          'documentTransactionMetadataHash': documentTransactionMetadataHash,
          'transactionClass': transactionClass
      });

    var post_options = {
        host: blockchain.ip,
        port: blockchain.port,
        path: '/document',
        method: 'POST',
        headers: {
                          'Content-Type': 'application/x-www-form-urlencoded',
                          'Content-Length': Buffer.byteLength(post_data)
                      }
    };

    // Set up the request
    var post_req = http.request(post_options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log(typeof(chunk));
            resolve(chunk);
        });
        //resolve(res);
    });

    // post the data
    post_req.write(post_data);
    post_req.end();

  });
}

exports.transferDocument = function(userFrom, userTo, documentHash, documentTransactionMetadataHash, transactionClass) {
  return new Promise(function(resolve, reject) {

    var post_data = querystring.stringify({
          'userFrom' : userFrom,
          'userTo' : userTo,
          'documentHash': documentHash,
          'documentTransactionMetadataHash': documentTransactionMetadataHash,
          'transactionClass': transactionClass
      });

    var post_options = {
        host: blockchain.ip,
        port: blockchain.port,
        path: '/transaction',
        method: 'POST',
        headers: {
                          'Content-Type': 'application/x-www-form-urlencoded',
                          'Content-Length': Buffer.byteLength(post_data)
                      }
    };

    // Set up the request
    var post_req = http.request(post_options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log(typeof(chunk));
            resolve(chunk);
        });
        //resolve(res);
    });

    // post the data
    post_req.write(post_data);
    post_req.end();

    
  });
}

exports.addDocumentRelation = function(document1, document2, metadataHash, relationClass) {
  return new Promise(function(resolve, reject) {

    var post_data = querystring.stringify({
          'document1' : document1,
          'document2' : document2,
          'metadataHash': metadataHash,
          'relationClass': relationClass
      });

    var post_options = {
        host: blockchain.ip,
        port: blockchain.port,
        path: '/docrelation',
        method: 'POST',
        headers: {
                          'Content-Type': 'application/x-www-form-urlencoded',
                          'Content-Length': Buffer.byteLength(post_data)
                      }
    };

    // Set up the request
    var post_req = http.request(post_options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log(typeof(chunk));
            resolve(chunk);
        });
        //resolve(res);
    });

    // post the data
    post_req.write(post_data);
    post_req.end();

    
  });
}

exports.addCard = function(cardHash, userHash, documentHash, cardClass) {
  return new Promise(function(resolve, reject) {

    var post_data = querystring.stringify({
          'cardHash' : cardHash,
          'userHash' : userHash,
          'documentHash': documentHash,
          'cardClass': cardClass
      });

    var post_options = {
        host: blockchain.ip,
        port: blockchain.port,
        path: '/card',
        method: 'POST',
        headers: {
                          'Content-Type': 'application/x-www-form-urlencoded',
                          'Content-Length': Buffer.byteLength(post_data)
                      }
    };

    // Set up the request
    var post_req = http.request(post_options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log(typeof(chunk));
            resolve(chunk);
        });
        //resolve(res);
    });

    // post the data
    post_req.write(post_data);
    post_req.end();


  });
}



exports.getAccount = function(userHash) {
  return new Promise(function(resolve, reject) {

    var path = "/account?userHash=" + userHash;
    var host = blockchain.ip;
    var port = blockchain.port;
    var post_data = querystring.stringify();
    var method = "GET";
    var headers = {};

    var post_options = {
      host: host,
      port: port,
      path: path,
      method: method,
      headers: headers
  };

    var post_req = http.request(post_options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log(typeof(chunk));
            resolve(chunk);
        });
        
    });

    post_req.write(post_data);
    post_req.end();
  });
}

exports.getDocbyDocumentHash = function(documentHash) {
  return new Promise(function(resolve, reject) {

    var path = '/document?documentHash='+documentHash;
    var host = blockchain.ip;
    var port = blockchain.port;
    var post_data = querystring.stringify();
    var method = "GET";
    var headers = {};

    var post_options = {
      host: host,
      port: port,
      path: path,
      method: method,
      headers: headers
  };

    var post_req = http.request(post_options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log(typeof(chunk));
            resolve(chunk);
        });
        
    });

    post_req.write(post_data);
    post_req.end();    


    
  });
}

exports.getDocuments = function(startindex, endindex) {
  return new Promise(function(resolve, reject) {

    var path = '/documents?startindex='+startindex+'&endindex='+endindex;
    var host = blockchain.ip;
    var port = blockchain.port;
    var post_data = querystring.stringify();
    var method = "GET";
    var headers = {};

    var post_options = {
      host: host,
      port: port,
      path: path,
      method: method,
      headers: headers
  };

    var post_req = http.request(post_options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log(typeof(chunk));
            resolve(chunk);
        });
        
    });

    post_req.write(post_data);
    post_req.end();    


    
  });
}

exports.getTransactionsbyUsertoUserfrom = function(userTo, userFrom, startindex ,endindex) {
  return new Promise(function(resolve, reject) {

    var path = '/transactions?userFrom='+userFrom+'&userTo='+userTo+'&startindex='+startindex+'&endindex='+endindex;
    var host = blockchain.ip;
    var port = blockchain.port;
    var post_data = querystring.stringify();
    var method = "GET";
    var headers = {};

    var post_options = {
      host: host,
      port: port,
      path: path,
      method: method,
      headers: headers
  };

    var post_req = http.request(post_options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log(typeof(chunk));
            resolve(chunk);
        });
        
    });

    post_req.write(post_data);
    post_req.end();    


    
  });
}

exports.getTransactionsbyUserfrom = function(userFrom, startindex, endindex) {
  return new Promise(function(resolve, reject) {

    var path = 'transactions?userFrom='+userFrom+'&startindex='+startindex+'&endindex='+endindex;
    var host = blockchain.ip;
    var port = blockchain.port;
    var post_data = querystring.stringify();
    var method = "GET";
    var headers = {};

    var post_options = {
      host: host,
      port: port,
      path: path,
      method: method,
      headers: headers
  };

    var post_req = http.request(post_options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log(typeof(chunk));
            resolve(chunk);
        });
        
    });

    post_req.write(post_data);
    post_req.end();


    
  });
}

exports.getTransactionsbyUserto = function(userTo, startindex, endindex) {
  return new Promise(function(resolve, reject) {

    var path = '/transactions?userTo='+userTo+'&startindex='+startindex+'&endindex='+endindex;
    var host = blockchain.ip;
    var port = blockchain.port;
    var post_data = querystring.stringify();
    var method = "GET";
    var headers = {};

    var post_options = {
      host: host,
      port: port,
      path: path,
      method: method,
      headers: headers
  };

    var post_req = http.request(post_options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log(typeof(chunk));
            resolve(chunk);
        });
        
    });

    post_req.write(post_data);
    post_req.end();


    
  });
}


exports.getDocumentRelation = function(documentHash, startindex, endindex) {
  return new Promise(function(resolve, reject) {

    var path = '/docrelation?documentHash='+documentHash+'&startindex='+startindex+'&endindex='+endindex;
    var host = blockchain.ip;
    var port = blockchain.port;
    var post_data = querystring.stringify();
    var method = "GET";
    var headers = {};

    var post_options = {
      host: host,
      port: port,
      path: path,
      method: method,
      headers: headers
  };

    var post_req = http.request(post_options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log(typeof(chunk));
            resolve(chunk);
        });
        
    });

    post_req.write(post_data);
    post_req.end();


    
  });
}

exports.getCardbyCardHash = function(cardHash) {
  return new Promise(function(resolve, reject) {

    var path = '/card?cardHash='+cardHash;
    var host = blockchain.ip;
    var port = blockchain.port;
    var post_data = querystring.stringify();
    var method = "GET";
    var headers = {};

    var post_options = {
      host: host,
      port: port,
      path: path,
      method: method,
      headers: headers
  };

    var post_req = http.request(post_options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log(typeof(chunk));
            resolve(chunk);
        });
        
    });

    post_req.write(post_data);
    post_req.end();


    
  });
}

exports.getCardbyUserHash = function(userHash, startindex, endindex) {
  return new Promise(function(resolve, reject) {

    var path = '/card?userHash='+userHash+'&startindex='+startindex+'&endindex='+endindex;
    var host = blockchain.ip;
    var port = blockchain.port;
    var post_data = querystring.stringify();
    var method = "GET";
    var headers = {};

    var post_options = {
      host: host,
      port: port,
      path: path,
      method: method,
      headers: headers
  };

    var post_req = http.request(post_options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log(typeof(chunk));
            resolve(chunk);
        });
        
    });

    post_req.write(post_data);
    post_req.end();

    
  });
}

exports.getDocumentSaltForIndv = function(docId) {
  return new Promise(function(resolve, reject) {

      var AuthOxContract = new web3.eth.Contract(abi, address, {gasPrice: '0', from: fromAddress});
      AuthOxContract.methods.getDocumentSaltForIndv(docId).call().then(function(res) {resolve(res)});
  });
}
