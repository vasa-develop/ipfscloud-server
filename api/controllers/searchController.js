const fetch = require('node-fetch');

exports.search = function(req, res, next) {
    if(req.query.page){
        fetch('https://api.ipfs-search.com/v1/search?q='+req.query.q+'&page='+req.query.page)
        .then(res => res.json())
        .then(json => res.json(json));
    }
    else{
        fetch('https://api.ipfs-search.com/v1/search?q='+req.query.q)
        .then(res => res.json())
        .then(json => res.json(json));
    }
	
}


exports.metadata = function(req, res, next) {
	fetch('https://api.ipfs-search.com/v1/metadata/'+req.params.id)
    .then(res => res.json())
    .then(json => res.json(json));
}
