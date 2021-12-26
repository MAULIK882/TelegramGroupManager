/**
©Man Ho 
Dec 26 2021 17:04:07 (GMT+0800 Kuala Lumpur, Malaysia Standard Time)
The code is open source.
This project uses the GNU GPL license 
any work using this code must be distributed under the same license. 
**/



function isAdminOrCreator(userId, chatId) {
    var payload = {
        "method": "getChatMember",
        "chat_id": chatId,
        "user_id": userId
    };
    // allow manho
    if (userId === Const.myId){
        return true;
    }
    var chatMember = postTelegram(payload);
    if (chatMember && chatMember.ok === true) {
        if (chatMember.result.status == "creator") {
        return true;
        }
        if (chatMember.result.status == "administrator") {
        return true;
        }
    }
    return false;
}