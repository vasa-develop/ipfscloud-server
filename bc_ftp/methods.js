//Adding User

contract.addUser("userId", "userClass", "publicInfo", "email", "metadataHash", "salt", {gas: '900000'}, function(error, result){
            if(!error)
                {
                    console.log("RESULT:  ");
                    console.log(result);
                }
            else{
                console.log("ERROR:  ");
                console.error(error);
            }  
        });

//Getting userInfo

contract.getUserInfo("userId", function(error, result){
    if(!error)
                {
                    console.log("RESULT:  ");
                    console.log(result);
                }
            else{
                console.log("ERROR:  ");
                console.error(error);
            }  
});


//Adding Documents

contract.addDocumentForUser("docId,contentHash,metadata,publicInfo,salt",",","cardId",{gas: '900000'}, function(error, result){
            if(!error)
                {
                    console.log("RESULT:  ");
                    console.log(result);
                }
            else{
                console.log("ERROR:  ");
                console.error(error);
            }  
        });

//Getting documentInfo
contract.getDocumentInfo("docId", function(error, result){
    if(!error)
                {
                    console.log("RESULT:  ");
                    console.log(result);
                }
            else{
                console.log("ERROR:  ");
                console.error(error);
            }  
});