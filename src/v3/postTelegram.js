

function postTelegram(payload){

var data = {
    'contentType': 'application/json',
    "method": "post",
    "muteHttpExceptions": true,
    "payload": JSON.stringify(payload)
};
var response, res;
  
    try {
        response = UrlFetchApp.fetch("https://api.telegram.org/bot" + Const.botToken + "/", data);
        res = JSON.parse(response);
        Logger.log(res)
        return res;
    } catch (e) {
        var errorLog = {
            error: e
        };
        return  errorLog
        Logger.log(JSON.stringify(errorLog))
    }
}

function testApi(){
    var payload = {
        "method": "sendMessage",
        "chat_id": Const.myId,
        "text": "Hello World", 
    }
    postTelegram(payload)
}