const Web3 = require('web3');
var web3;

if (typeof web3 !== 'undefined') {
            //web3 = new Web3(web3.currentProvider);
        } else {
            // set the provider you want from Web3.providers
            web3 = new Web3(new Web3.providers.HttpProvider("http://18.188.219.84:22000"));
        }
        web3.eth.defaultAccount = web3.eth.accounts[0];
        web3.personal.unlockAccount(web3.eth.defaultAccount);
         var CoursetroContract = web3.eth.contract([
	{
		"constant": false,
		"inputs": [],
		"name": "isSuperUser",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "docId",
				"type": "string"
			}
		],
		"name": "getDocumentSaltForIndv",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getUserId",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "docId",
				"type": "string"
			}
		],
		"name": "getDocumentInfo",
		"outputs": [
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "cardIdFrom",
				"type": "string"
			},
			{
				"name": "cardIdTo",
				"type": "string"
			},
			{
				"name": "docIds",
				"type": "string"
			},
			{
				"name": "separator",
				"type": "string"
			}
		],
		"name": "shareDocumentWithUser",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "userId",
				"type": "string"
			},
			{
				"name": "userClass",
				"type": "string"
			},
			{
				"name": "publicInfo",
				"type": "string"
			},
			{
				"name": "email",
				"type": "string"
			},
			{
				"name": "metadataHash",
				"type": "string"
			},
			{
				"name": "salt",
				"type": "string"
			}
		],
		"name": "addUser",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "docId",
				"type": "string"
			}
		],
		"name": "isUserOwner",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "cardId",
				"type": "string"
			},
			{
				"name": "role",
				"type": "uint256"
			},
			{
				"name": "level",
				"type": "uint256"
			}
		],
		"name": "addCardPermissions",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "orgId",
				"type": "string"
			}
		],
		"name": "getOrg",
		"outputs": [
			{
				"name": "orgClass",
				"type": "string"
			},
			{
				"name": "metaDataHash",
				"type": "string"
			},
			{
				"name": "salt",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "userId",
				"type": "string"
			}
		],
		"name": "getUserInfo",
		"outputs": [
			{
				"name": "publicInfo",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "email",
				"type": "string"
			}
		],
		"name": "isValidUser",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "data",
				"type": "string"
			},
			{
				"name": "separator",
				"type": "string"
			},
			{
				"name": "cardId",
				"type": "string"
			}
		],
		"name": "addDocumentForUser",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "cardId",
				"type": "string"
			}
		],
		"name": "getCardInfo",
		"outputs": [
			{
				"name": "pubKey",
				"type": "address"
			},
			{
				"name": "cardClass",
				"type": "string"
			},
			{
				"name": "orgId",
				"type": "string"
			},
			{
				"name": "publicInfo",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "orgId",
				"type": "string"
			},
			{
				"name": "orgClass",
				"type": "string"
			},
			{
				"name": "metaDataHash",
				"type": "string"
			},
			{
				"name": "salt",
				"type": "string"
			}
		],
		"name": "addOrg",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "docId",
				"type": "string"
			},
			{
				"name": "token",
				"type": "string"
			}
		],
		"name": "isWhiteListToken",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			},
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "cardId",
				"type": "string"
			},
			{
				"name": "userId",
				"type": "string"
			},
			{
				"name": "cardClass",
				"type": "string"
			},
			{
				"name": "orgId",
				"type": "string"
			},
			{
				"name": "communityCardId",
				"type": "string"
			},
			{
				"name": "publicInfo",
				"type": "string"
			}
		],
		"name": "addCard",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "cardIdFrom",
				"type": "string"
			},
			{
				"name": "docIds",
				"type": "string"
			},
			{
				"name": "separator",
				"type": "string"
			},
			{
				"name": "tokens",
				"type": "string"
			}
		],
		"name": "addToWhiteList",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "email",
				"type": "string"
			}
		],
		"name": "getUserId",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "cardIdFrom",
				"type": "string"
			},
			{
				"name": "orgId",
				"type": "string"
			},
			{
				"name": "docIds",
				"type": "string"
			},
			{
				"name": "separator",
				"type": "string"
			}
		],
		"name": "shareDocumentWithOrg",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
]);
var Coursetro = CoursetroContract.at('0xc8c9319468c6d276e017f188aaf8f5b31e55000d');

module.exports = Coursetro;
