function debug() {
    debug()
}
function callbackQuery(body) {
    var back_butt = {
        text: "Back",
        callback_data: "help_menu"
    };
    var back_text = {
        text: "Back",
        callback_data: "back-text"
    };
    var ban_butt = {
        text: "Ban",
        callback_data: "ban-menu"
    };
    var mute_butt = {
        text: "Mute",
        callback_data: "mute-menu"
    };
    var pin_butt = {
        text: "Pin",
        callback_data: "pin-menu"
    };
    /** send text message in callback query. **/
    var send_cb = {
        "method": "sendMessage",
        "chat_id": body.callback_query.message.chat.id,
        "text": "",
        "parse_mode": "Markdown",
        "disable_web_page_preview": true,
    };
    /** answer call back query once member click the inline button. **/
    var answer_cb = {
        "method": "answerCallbackQuery",
        "callback_query_id": body.callback_query.id,
        "text": "answerCallbackQuery",
        "show_alert": false
    };
    /** edit text messages within callback query **/
    var edit_cb = {
        "method": "editMessageText",
        "chat_id": body.callback_query.message.chat.id,
        "message_id": body.callback_query.message.message_id,
        "text": "",
        "parse_mode": "markdown",
        "disable_web_page_preview": false,
    };
    if (body.callback_query.data.indexOf("help_menu") === 0) {
        edit_cb.text = "Hey! My name is Miya. I am a group management bot, here to help you get around and keep the order in your groups!" + "I have lots of handy features, such as groups member control , a muting system, " + "and more features about to manage your groups.";
        /** Use to prepare a inline Keboard **/
        var inlineKeyboardMarkup = {};
        inlineKeyboardMarkup.inline_keyboard = [];
        var keyboardRow = [];
        var keyboardRow2 = [];
        var keyboardRow3 = [];
        keyboardRow.push(ban_butt);
        keyboardRow.push(mute_butt);
        keyboardRow2.push(pin_butt);
        keyboardRow3.push(back_text);
        inlineKeyboardMarkup.inline_keyboard.push(keyboardRow);
        inlineKeyboardMarkup.inline_keyboard.push(keyboardRow2);
        inlineKeyboardMarkup.inline_keyboard.push(keyboardRow3);
        edit_cb.reply_markup = inlineKeyboardMarkup;
        payloads.push(edit_cb);
        answer_cb.text = "You have entered to help menu."
        payloads.push(answer_cb);
        return payloads;
    }
    if (body.callback_query.data.indexOf("ban-menu") === 0) {
        edit_cb.text = "" + "*Ban Command*(Reply)\n" + "/ban - Ban a user.\n" + "/dban - Ban a user by reply, and delete their message.\n" + "/sban - Silently ban a user, and delete your message.\n" + "/unban - Unban a user." + "\n\n" + "- /kick - Kick a user.\n" + "/dkick - Kick a user by reply, and delete their message.\n" + "/skick - Silently kick a user, and delete your message.";
        var inlineKeyboardMarkup = {};
        inlineKeyboardMarkup.inline_keyboard = [];
        var keyboardRow = [];
        var keyboardRow2 = [];
        var keyboardRow3 = [];
        keyboardRow.push(ban_butt);
        keyboardRow.push(mute_butt);
        keyboardRow2.push(pin_butt);
        keyboardRow3.push(back_butt);
        inlineKeyboardMarkup.inline_keyboard.push(keyboardRow3);
        inlineKeyboardMarkup.inline_keyboard.push(keyboardRow);
        inlineKeyboardMarkup.inline_keyboard.push(keyboardRow2);
        edit_cb.reply_markup = inlineKeyboardMarkup;
        answer_cb.text = "You have entered to /kick menu."
        payloads.push(edit_cb);
        payloads.push(answer_cb);
        return payloads;
    }
    if (body.callback_query.data.indexOf("mute-menu") === 0) {
        edit_cb.text = "" + "*Mute Command*(Reply)\n" + "/mute - Mute a user.\n" + "/dmute - Mute a user by reply, and delete their message.\n" + "/smute - Silently mute a user, and delete your message.\n" + "/unmute - Unmute a user.\n" + "- /rmute - Mute a user for random until time.\n" + "/tmute - Mute a user by reply, provide two number , Miya will mute that user for the time in two number range.\n" + "Example:\n==> /tmute 60 180" + "\n\nThat user will get ban random seconds in range (60 and 180).";
        var inlineKeyboardMarkup = {};
        inlineKeyboardMarkup.inline_keyboard = [];
        var keyboardRow = [];
        var keyboardRow2 = [];
        var keyboardRow3 = [];
        keyboardRow.push(ban_butt);
        keyboardRow.push(mute_butt);
        keyboardRow2.push(pin_butt);
        keyboardRow3.push(back_butt);
        inlineKeyboardMarkup.inline_keyboard.push(keyboardRow3);
        inlineKeyboardMarkup.inline_keyboard.push(keyboardRow);
        inlineKeyboardMarkup.inline_keyboard.push(keyboardRow2);
        edit_cb.reply_markup = inlineKeyboardMarkup;
        answer_cb.text = "You have entered to mute menu."
        payloads.push(edit_cb);
        payloads.push(answer_cb);
        return payloads;;
    }
    if (body.callback_query.data.indexOf("pin-menu") === 0) {
        edit_cb.text = "" + "*Pin Command*(Reply)\n" + "/pin - Pin a message.\n" + "/spin - Silently pin a message by reply, and delete your message.\n" + "/unpin - Unpin a message.\n" + "/unpinall - Unpin all message.";
        var inlineKeyboardMarkup = {};
        inlineKeyboardMarkup.inline_keyboard = [];
        var keyboardRow = [];
        var keyboardRow2 = [];
        var keyboardRow3 = [];
        keyboardRow.push(ban_butt);
        keyboardRow.push(mute_butt);
        keyboardRow2.push(pin_butt);
        keyboardRow3.push(back_butt);
        inlineKeyboardMarkup.inline_keyboard.push(keyboardRow3);
        inlineKeyboardMarkup.inline_keyboard.push(keyboardRow);
        inlineKeyboardMarkup.inline_keyboard.push(keyboardRow2);
        edit_cb.reply_markup = inlineKeyboardMarkup;
        answer_cb.text = "You have entered to pin menu."
        payloads.push(edit_cb);
        payloads.push(answer_cb);
        return payloads;
    }
    if (body.callback_query.data.indexOf("back-text") === 0) {
        edit_cb.text = "Hi there! " + getMentionName(body.callback_query.from) + "\nMy name is Miya - I'm here to help you manage your groups! Hit /help to find out more about how to use me to my full potential."
        var keyboardRow = [];
        var keyboardRow2 = [];
        keyboardRow.push(helpButton);
        keyboardRow2.push(addGrpButton);
        inlineKeyboardMarkup.inline_keyboard.push(keyboardRow);
        inlineKeyboardMarkup.inline_keyboard.push(keyboardRow2);
        edit_cb.reply_markup = inlineKeyboardMarkup;
        answer_cb.text = "You have returned."
        payloads.push(edit_cb);
        payloads.push(answer_cb);
        return payloads;;
    }
    /** Double confirm the unpinall message **/
    if (body.callback_query.data.indexOf("confirm") === 0) {
        edit_cb.text = "Please make a double confirm.It's a danger action.\n\n" + "The all pinned message will no longer pinned.\n\n" + "If not, choose ❌ instead.";
        var inlineKeyboardMarkup = {};
        inlineKeyboardMarkup.inline_keyboard = [];
        var keyboardRow = []
        var keyboardRow2 = [];
        var double_confirm = {
            text: "✅",
            callback_data: "double_confirm"
        };
        var cancel = {
            text: "❌",
            callback_data: "cancel"
        };
        keyboardRow.push(cancel);
        keyboardRow.push(double_confirm);
        inlineKeyboardMarkup.inline_keyboard.push(keyboardRow);
        edit_cb.reply_markup = inlineKeyboardMarkup;
        answer_cb.text = "Please make a double confirm!"
        payloads.push(edit_cb)
        payloads.push(answer_cb)
        return payloads;
    }
    /** confirmed unpinall message **/
    if (body.callback_query.data.indexOf("double_confirm") === 0) {
        isAdmin = isAdminOrCreator(body.callback.from.id, body.callback_query.message.chat.id)
        if (isAdmin) {
            var unpinall = {
                "method": "unpinAllChatMessages",
                "chat_id": body.callback_query.message.chat.id,
            };
            edit_cb.text = "All pinned messages have been unpinned.";
            answer_cb.text = "All pinned messages have been unpinned.";
            postTelegram(unpinall)
            postTelegram(edit_cb)
            postTelegram(answer_cb)
        } else {
            answer_cb.text = "This can only use by an admin.";
            postTelegram(answer_cb)
        }
    }
    /** Cancel unpin all the message **/
    if (body.callback_query.data.indexOf("cancel") === 0) {
        edit_cb.text = "Unpin of all pinned messages has been cancelled."
        postTelegram(edit_cb)
    }
    /** New chat member answered wrong of verification **/
    if (body.callback_query.data.indexOf("wrong") >= 0) {
        var data = body.callback_query.data.trim().split(" ")
        /** check is the user or other user click. **/
        if (data[1] == body.callback_query.from.id) {
            edit_cb.text = "❌❌Wrong answers!!!!\n" + getMentionName(body.callback_query.from) + "Unsuccessful to complete the verification and have been kicked out.";
         /** kick the unverified member **/
            var kick_cb = {
                "method": 'kickChatMember',
                "chat_id": body.callback_query.message.chat.id,
                "user_id": data[1],
            }
            postTelegram(edit_cb)
            postTelegram(kick_cb)
        } else {
        /** Answer to other user who click **/
            answer_cb.text = "Im not asking you... " + data[1] + "😡\nYou are passionate";
            answer_cb.show_alert = true;
            postTelegram(answer_cb)
        }
    }
    if (body.callback_query.data.indexOf("true") === 0) {
        edit_cb.text = "Hi !" + getMentionName(body.callback_query.from) + "welcome to join this group!";
        var data = body.callback_query.data.trim().split(" ")
        //check is the user click or other idiots. 
        if (body.callback_query.from.id == data[1]) {
            var unmute = {
                "method": 'restrictChatMember',
                "chat_id": body.callback_query.message.chat.id,
                "user_id": data[1],
                "can_send_messages": true,
                "can_send_media_messages": true,
                "can_send_other_messages": true,
                "can_add_web_page_previews": true
            };
            postTelegram(edit_cb)
            postTelegram(unmute)
        } else {
            answer_cb.text = "Im not asking you... \nEven you get a correct answer instead you are a passionate";
            answer_cb.show_alert = true;
            postTelegram(answer_cb)
        }
    }
    if (body.callback_query.data.indexOf("adminpass") >= 0) {
        //callback data included name n userid that need approval. 
        data = body.callback_query.data.trim().split(" ")
        var name = data[2]
        var ids = data[1]
        var isAdmin = isAdminOrCreator(body.callback_query.from.id, body.callback_query.message.chat.id)
        if (isAdmin) {
            edit_cb.text = "[" + name + "](tg://user?id=" + ids + ") have been approved by an admin";
            //unmute the user instead if the admin pased.
            var unmute = {
                "method": 'restrictChatMember',
                "chat_id": body.callback_query.message.chat.id,
                "user_id": data[1],
                "can_send_messages": true,
                "can_send_media_messages": true,
                "can_send_other_messages": true,
                "can_add_web_page_previews": true
            };
            postTelegram(unmute)
            postTelegram(edit_cb)
        } else {
            answer_cb.text = "Im not asking you...\nYou are passionate";
            answer_cb.show_alert = true;
            postTelegram(edit_cb)
        }
    }
    if (body.callback_query.data.indexOf("adminreject") >= 0) {
        var data = body.callback_query.data.trim().split(" ")
        var isAdmin = isAdminOrCreator(body.callback_query.from.id, body.callback_query.message.chat.id)
        if (isAdmin) {
            edit_cb.text = "An admin reject the request of [" + data[2] + "](tg://user?id=" + data[1] + ")and have been kicked out. ";
            //kick the chat member instead admin have rejected. 
            var kick = {
                "method": "kickChatMember",
                "chat_id": body.callback_query.message.chat.id,
                "user_id": data[1]
            }
            postTelegram(kick)
            postTelegram(edit_cb)
        } else {
            answer_cb.text = "Im not asking you...\nYou are passionate";
            answer_cb.show_alert = true;
            postTelegram(answer_cb)
        }
    }
}