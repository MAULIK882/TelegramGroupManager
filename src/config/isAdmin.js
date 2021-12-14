function debug() {
    debug()
}
function isAdminOrCreator(userId, chatId) {
    var payload = {
        "method": "getChatMember",
        "chat_id": chatId,
        "user_id": userId
    };
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
