/**
©Man Ho 
Dec 26 2021 17:04:07 (GMT+0800 Kuala Lumpur, Malaysia Standard Time)
The code is open source.
This project uses the GNU GPL license 
any work using this code must be distributed under the same license. 
**/



function getChatMember(chatId, userId) {
    var payload = {
        "method": "getChatMember",
        "chat_id": chatId,
        "user_id": userId
    };
    var chatMember = postTelegram(payload);
    if(chatMember.ok == true){
        if (chatMember.result) {
            return chatMember.result;
        }
        return null;
    }
    if(chatMember.ok == false){
        return chatMember
    }
}
