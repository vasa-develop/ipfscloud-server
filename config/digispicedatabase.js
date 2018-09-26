const config = {
    "development":{
        //"url": 'mongodb://localhost:27017/dmsref'
        //"url": 'mongodb://ec2-54-159-16-22.compute-1.amazonaws.com/authcard'
        "url": 'mongodb://ec2-18-204-88-53.compute-1.amazonaws.com/digispice'
        //"url": 'mongodb://admin:tbc123@ds139920.mlab.com:39920/authoxdev'
    },
    "developmentauthcard":{
        //"url": 'mongodb://localhost:27017/dmsref'
        "url": 'mongodb://ec2-18-204-88-53.compute-1.amazonaws.com/authcard'
        //"url": 'mongodb://ec2-54-159-16-22.compute-1.amazonaws.com/dmsref'
        //"url": 'mongodb://admin:tbc123@ds139920.mlab.com:39920/authoxdev'
    },
    "production":{
       "url": ''
    }
};

module.exports = config[process.env.NODE_ENV || 'development'];
