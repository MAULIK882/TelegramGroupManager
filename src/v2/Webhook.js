/**
©Man Ho 
Dec 26 2021 17:04:07 (GMT+0800 Kuala Lumpur, Malaysia Standard Time)
The code is open source.
This project uses the GNU GPL license 
any work using this code must be distributed under the same license. 
**/

/**Execute this fetchingWebhook function once you get the gas link **/
function fetchingWebhook() {
    var res = UrlFetchApp.fetch('api.telegram.org/bot' + Const.botToken + '/setWebhook?url=https://script.google.com/macros/s/AKfycbwLdcexyfHqSl_Fbt_hcYK8XCLGOwqTialNSGtgFY2Ha9Wdh9Y/exec ')
    Logger.log(res)
}

/** Execute getUpdatesWebhook once there is an unknown error to get the original incoming e message from back-end of Telegram **/
function getUpdatesWebhook() {
    var res = UrlFetchApp.fetch('api.telegram.org/bot' + Const.botToken + '/getUpdates')
    Logger.log(res)
}
/** use to delete webhook **/
function deleteWebhook() {
    var res = UrlFetchApp.fetch('api.telegram.org/bot' + Const.botToken + '/deleteWebhook')
    Logger.log(res)
}

function getChat(){
    var res = UrlFetchApp.fetch('api.telegram.org/bot' + Const.botToken + '/getChat?chat_id=-1001637328377')
    Logger.log(res)
}

function getFile(){
    var res = UrlFetchApp.fetch('api.telegram.org/bot' + Const.botToken + '/getFile?file_path=https://web.telegram.org/z/icon-192x192.png')
}