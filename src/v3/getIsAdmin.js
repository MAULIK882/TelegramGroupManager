function isAdminOrCreator(userId, chatId) {
    var payload = {
        "method": "getChatMember",
        "chat_id": chatId,
        "user_id": userId
    };
    // allow manho
    if (userId === 1381836444){
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
