const config = {
    "development":{
        "quorum":{
          "ip": "18.188.219.84",
          "port": "3000"
        },
        "hyperledger": {
          "ip": "54.208.7.66",
          "port": "3000"
        },
        "ethereum": {
          "ip": "18.219.11.30",
          "port": "3000"
        }
    },
    "production":{
        "quorum":{
          "ip": process.env.QUORUM_IP,
          "port": process.env.QUORUM_PORT
        },
        "hyperledger": {
          "ip": process.env.HYPERLEDGER_IP,
          "port": process.env.HYPERLEDGER_PORT
        },
        "ethereum": {
          "ip": process.env.ETHEREUM_IP,
          "port": process.env.ETHEREUM_PORT
        }
    }
};

console.log(process.env.BLOCKCHAIN);

module.exports = config[process.env.NODE_ENV || 'development'][process.env.BLOCKCHAIN || 'quorum'];
