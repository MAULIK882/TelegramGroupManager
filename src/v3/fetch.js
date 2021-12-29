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
function testQYK(){
    var res = UrlFetchApp.fetch("http://api.qingyunke.com/api.php?key=free&appid=0&msg=你好") 
    Logger.log(res)
}
function editMsg(){
    var res = UrlFetchApp.fetch("api.telegram.org/bot" + Const.botToken + "/sentMessage?chat_id=-1001637328377&text=hello")
    Logger.log(res)
}

function testYoutube(){
    var res = UrlFetchApp.fetch("https://www.yt-download.org/@api/button/mp3/ZDxQEqhnb4M")
    Logger.log(res)
}

function testNetEase(){
    var res = UrlFetchApp.fetch("https://music-api.heheda.top/song/url?id=1848190450&realIP=116.23.201.373")
    Logger.log(res)
} 

function testApi163(){
    var res = UrlFetchApp.fetch("http://music.163.com/api/song/detail/?id=848190450&ids=848190450") 
    Logger.log(res) 
}
