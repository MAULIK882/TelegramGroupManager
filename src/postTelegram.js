function debug() {
    debug()
}

var Const = {};
Const.botToken = "1234:abcd";
Const.botId = 12345678


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
    return res;
    } catch (e) {
    var errorLog = {
      error: e,
      payload: payload,
    };
    Logger.log(errorLog)
    return errorLog;
  }
}

function testApi(){
    var payload = {
        "method": "sendMessage",
        "chat_id": 1381836444,
        "text": "Hello World", 
    }
    postTelegram(payload)
}