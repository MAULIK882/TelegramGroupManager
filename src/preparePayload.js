function debug() {
    debug()
}
function preparePayload(body) {
    var helpButton, addGrpButton, add, para, time, newData, data, isRepliedAnAdmin, isAdmin;
    var payloads = [];
    var inlineKeyboardMarkup = {};
    inlineKeyboardMarkup.inline_keyboard = [];
    var keyboardRow, keyboardRow2, keyboardRow3 = [];
    var res;
    var question1  = randomIntFromInterval(10, 150);
    var question2 = randomIntFromInterval(100,150);
    var answer = question1 + question2
    var n1 = answer + 1;
    var n2 = answer + 2;
    var n3 = answer - 1;
    var n4 = answer;
    var n5 = answer - 2;
    var helpButton = {
        text: "Help",
        callback_data: "help_menu"
    };
    var addGrpButton = {
        text: "Add me to your groups",
        url: "https://telegram.me/sakuramiyabot?startgroup=true"
    };
    if(body.message) {
        body.message.chat.id = body.message.chat.id + '';
    }
    if(body.callback_query) {
    callbackQuery(body)
    }
    if(body.message.new_chat_member) {
        newMember(body, n1, n2, n3, n4, n5)
    }
    /** delete the pinned message **/
    if(body.message.pinned_message) {
        var delMsg = {
            "method": "deleteMessage",
            "chat_id": body.message.chat.id,
            "message_id": body.message.message_id
        };
        postTelegram(delMsg)
    }
    /** speak to left chat member **/
    if(body.message.left_chat_member) {
        var sd = {
            "method": "sendMessage",
            "chat_id": body.message.chat.id,
            "text": "Nice knowing you!",
            "parse_mode": "Markdown",
            "reply_to_message_id": body.message.message_id,
            "allow_sending_without_reply": true
        };
        postTelegram(sd)
    }
    /** handle text message **/
    if(body.message.text) {
       handleAction(body)
    }
}
