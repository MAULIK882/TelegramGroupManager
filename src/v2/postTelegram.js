/**
©Man Ho 
Dec 26 2021 17:04:07 (GMT+0800 Kuala Lumpur, Malaysia Standard Time)
The code is open source.
This project uses the GNU GPL license 
any work using this code must be distributed under the same license. 
**/


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
        var req = {
            "method": "sendMessage",
            "chat_id": 1381836444,
            "text": `Error Log:\n\n ${e}`         
        }
        var data = {
            'contentType': "application/json",
            'method': "post",
            'payload': req
        }
        UrlFetchApp.fetch("https://api.telegram.org/bot" + Const.botToken + "/", data);
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