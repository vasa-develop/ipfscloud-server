module.exports = [
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
        "constant": false,
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
                "name": "userHash",
                "type": "string"
            }
        ],
        "name": "getUser",
        "outputs": [
            {
                "name": "_class",
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
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "userHash",
                "type": "string"
            }
        ],
        "name": "getCardByUserHash",
        "outputs": [
            {
                "name": "serialized",
                "type": "bytes"
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
        "constant": true,
        "inputs": [
            {
                "name": "orgHash",
                "type": "string"
            }
        ],
        "name": "getOrgDocumentList",
        "outputs": [
            {
                "name": "serialized",
                "type": "bytes"
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
                "name": "cardHash",
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
                "name": "orgHash",
                "type": "string"
            }
        ],
        "name": "getOrg",
        "outputs": [
            {
                "name": "_class",
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
                "name": "orgHash",
                "type": "string"
            }
        ],
        "name": "getLength",
        "outputs": [
            {
                "name": "docnum",
                "type": "uint256"
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
                "name": "docId",
                "type": "string"
            },
            {
                "name": "publicInfo",
                "type": "string"
            },
            {
                "name": "metaData",
                "type": "string"
            },
            {
                "name": "contentHash",
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
                "name": "docIds",
                "type": "string"
            },
            {
                "name": "separator",
                "type": "string"
            }
        ],
        "name": "testx",
        "outputs": [
            {
                "name": "len",
                "type": "uint256"
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
                "name": "orgHash",
                "type": "string"
            },
            {
                "name": "docId",
                "type": "string"
            }
        ],
        "name": "shareSingleDoc",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "isCardPresent",
        "outputs": [
            {
                "name": "isValid",
                "type": "bool"
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
                "name": "cardHash",
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
                "name": "_class",
                "type": "string"
            },
            {
                "name": "docnum",
                "type": "uint256"
            },
            {
                "name": "orgHash",
                "type": "string"
            },
            {
                "name": "publicInfo",
                "type": "string"
            },
            {
                "name": "metadatHash",
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
                "name": "userHash",
                "type": "string"
            },
            {
                "name": "_class",
                "type": "string"
            },
            {
                "name": "publicInfo",
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
                "name": "orgHash",
                "type": "string"
            },
            {
                "name": "_class",
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
                "name": "cardHash",
                "type": "string"
            },
            {
                "name": "userHash",
                "type": "string"
            },
            {
                "name": "_class",
                "type": "string"
            },
            {
                "name": "publicInfo",
                "type": "string"
            },
            {
                "name": "communityCardId",
                "type": "string"
            },
            {
                "name": "metadatHash",
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
                "name": "orgHash",
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
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getDocumentList",
        "outputs": [
            {
                "name": "serialized",
                "type": "bytes"
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
                "name": "docId",
                "type": "string"
            },
            {
                "name": "cardIdTo",
                "type": "string"
            }
        ],
        "name": "transferDocumentSingle",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
]
