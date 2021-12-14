/**Execute this fetchingWebhook function once you get the gas link **/
function fetchingWebhook() {
    var res = UrlFetchApp.fetch('api.telegram.org/bot' + Const.botToken + '/setWebhook?url=LINK')
    Logger.log(res)
}

/** Execute getUpdatesWebhook once there is an unknown error to get the original incoming e message from back-end of Telegram **/
function getUpdatesWebhook() {
    var res = UrlFetchApp.fetch('api.telegram.org/bot' + Const.botToken + '/getUpdates')
    Logger.log(res)
}
/** use to delete webhook **/
function fetchingWebhook() {
    var res = UrlFetchApp.fetch('api.telegram.org/bot' + Const.botToken + '/deleteWebhook')
    Logger.log(res)
}
