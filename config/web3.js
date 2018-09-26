const Web3 = require('web3')
web3 = new Web3(new Web3.providers.HttpProvider("http://18.188.219.84:22000"));

module.exports = web3;
