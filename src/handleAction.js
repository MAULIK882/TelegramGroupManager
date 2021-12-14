function handleAction(body) {
    body.message.text = body.message.text.toLowerCase();
    body.message.text = body.message.text.replace(/@temptestbot2/g, '');
    /** make it to an array instead it has parameters **/
    var paras = body.message.text.trim().split(" ");
    /** remove empty strings **/
    paras = paras.filter(function(para) {
        if (para) {
            return true;
        }
    });
    if (body.message.text.indexOf("/start") == 0) {
        if (isPrivate(body)) {
            var sendStart = {
                "method": "sendMessage",
                "chat_id": body.message.chat.id,
                "reply_to_message_id": body.message.message_id,
                "parse_mode": "Markdown",
                "text": '',
            }
            sendStart.text = "Hey there! " + getMentionName(body.message.from) + "\nMy name is Miya - I'm here to help you manage your groups! Hit /help to find out more about how to use me to my full potential.";
            postTelegram(sendStart)
        } else {
            var sendStart = {
                "method": "sendMessage",
                "chat_id": body.message.chat.id,
                "reply_to_message_id": body.message.message_id,
                "parse_mode": "Markdown",
                "text": 'Are you sure you want to unpinall messages? ',
            }
            sendStart.text = "Heya :) PM me if you have any questions on how to use me.";
            var inlineKeyboardMarkup = {};
            inlineKeyboardMarkup.inline_keyboard = [];
            var keyboardRow = []
            var button = {
                text: "Check Pm",
                url: "https://telegram.me/sakuramiyabot?start"
            }
            keyboardRow.push(button);
            inlineKeyboardMarkup.inline_keyboard.push(keyboardRow);
            sendStart.reply_markup = inlineKeyboardMarkup;
            postTelegram(sendStart)
        }
    }
    if (body.message.text.indexOf("/help") == 0) {
        if (isPrivate(body)) {
            var sendStart = {
                "method": "sendMessage",
                "chat_id": body.message.chat.id,
                "reply_to_message_id": body.message.message_id,
                "parse_mode": "Markdown",
                "text": "Hi there! " + getMentionName(body.message.from) + "\n\nI am the most completed Bot to help you manage your groups easily and secure.\n\nAdd me to your groups and promote me as an Admin."
            }
            var inlineKeyboardMarkup = {};
            inlineKeyboardMarkup.inline_keyboard = [];
            var keyboardRow = []
            var keyboardRow2 = [];
            var helpButton = {
                text: "Help",
                callback_data: "help_menu"
            };
            var addGrpButton = {
                text: "Add me to your groups",
                url: "https://telegram.me/sakuramiyabot?startgroup=true"
            };
            keyboardRow.push(helpButton);
            keyboardRow2.push(addGrpButton);
            inlineKeyboardMarkup.inline_keyboard.push(keyboardRow);
            inlineKeyboardMarkup.inline_keyboard.push(keyboardRow2);
            sendStart.reply_markup = inlineKeyboardMarkup;
            postTelegram(sendStart)
        } else {
            var sendStart = {
                "method": "sendMessage",
                "chat_id": body.message.chat.id,
                "reply_to_message_id": body.message.message_id,
                "parse_mode": "Markdown",
                "text": 'Please hit the button below.',
            }
            var inlineKeyboardMarkup = {};
            inlineKeyboardMarkup.inline_keyboard = [];
            var keyboardRow = []
            var keyboardRow2 = [];
            var helpButton = {
                text: "Check In Pm✅",
                url: "http://t.me/sakuramiyabot?start=help"
            };
            keyboardRow.push(helpButton);
            inlineKeyboardMarkup.inline_keyboard.push(keyboardRow);
            sendStart.reply_markup = inlineKeyboardMarkup;
            postTelegram(sendStart)
        }
    }
    /**
    ————Dividing line————Dividing line————Dividing line————
    ————Dividing line————Dividing line————Dividing line————
    ————Dividing line————Dividing line————Dividing line————
    ————Handel   pin ————Handel   pin ————Handle   pin ————
    ————Handel   pin ————Handel   pin ————Handle   pin ————
    ————Dividing line————Dividing line————Dividing line————
    ————Dividing line————Dividing line————Dividing line————
    ————Dividing line————Dividing line————Dividing line————
    ————Dividing line————Dividing line————Dividing line————
    **/
    if (body.message.text.indexOf("/pin") == 0) {
        isRepliedAnAdmin = isAdminOrCreator(body.message.reply_to_message.from.id, body.message.chat.id)
        isAdmin = isAdminOrCreator(body.message.from.id, body.message.chat.id)
        if (!isRepliedAnAdmin) {
            if (isAdmin) {
                var sd = {
                    "method": "sendMessage",
                    "chat_id": body.message.chat.id,
                    "text": "Message " + body.message.message_id + " has been pinned.",
                    "parse_mode": "Markdown",
                    "reply_to_message_id": body.message.message_id,
                    "allow_sending_without_reply": true
                };
                var pinMsg = {
                    "method": "pinChatMessage",
                    "chat_id": body.message.chat.id,
                    "message_id": body.message.reply_to_message.message_id,
                };
                postTelegram(sd)
                postTelegram(pinMsg)
            } else {
                var sd = {
                    "method": "sendMessage",
                    "chat_id": body.message.chat.id,
                    "reply_to_message_id": body.message.message_id,
                    "text": "Sorry... " + getMentionName(body.message.from) + "this command only can use by an admin.",
                    "parse_mode": "Markdown"
                };
                var sd2 = {
                    "method": "sendMessage",
                    "chat_id": body.message.chat.id,
                    "reply_to_message_id": body.message.message_id,
                    "text": "Shhh... quiet now.\nMuted " + getMentionName(body.message.reply_to_message.from) + "for 30 minutes due to hit the admin command.",
                    "parse_mode": "Markdown"
                };
                var mute = {
                    "method": 'restrictChatMember',
                    "chat_id": body.message.chat.id,
                    "user_id": body.message.reply_to_message.from.id,
                    "can_send_messages": false,
                    "can_send_media_messages": false,
                    "can_send_other_messages": false,
                    "can_add_web_page_previews": false,
                    "until_date": Date.now() / 1000 + 1800
                };
                postTelegram(sd)
                postTelegram(mute)
                postTelegram(sd2)
            }
        } else {
            var sd = {
                "method": "sendMessage",
                "chat_id": body.message.chat.id,
                "text": "Message " + body.message.message_id + " has been pinned.",
                "parse_mode": "Markdown",
                "reply_to_message_id": body.message.message_id,
                "allow_sending_without_reply": true
            };
            var pinMsg = {
                "method": "pinChatMessage",
                "chat_id": body.message.chat.id,
                "message_id": body.message.reply_to_message.message_id,
            };
            postTelegram(sd)
            postTelegram(pinMsg)
        }
    }
    if (body.message.text.indexOf("/spin") == 0) {
        isAdmin = isAdminOrCreator(body.message.from.id, body.message.chat.id)
        if (isAdmin) {
            var pinMsg = {
                "method": "pinChatMessage",
                "chat_id": body.message.chat.id,
                "message_id": body.message.reply_to_message.message_id,
            };
            var delCommand = {
                "method": "deleteMessage",
                "chat_id": body.message.chat.id,
                "message_id": body.message.message_id
            };
            postTelegram(delCommand)
            postTelegram(pinMsg)
        } else {
            var sd = {
                "method": "sendMessage",
                "chat_id": body.message.chat.id,
                "reply_to_message_id": body.message.message_id,
                "text": "Sorry... " + getMentionName(body.message.from) + "this command only can use by an admin.",
                "parse_mode": "Markdown"
            };
            var delNonAdminComand = {
                "method": "deleteMessage",
                "chat_id": body.message.chat.id,
                "message_id": body.message.message_id
            };
            var sd2 = {
                "method": "sendMessage",
                "chat_id": body.message.chat.id,
                "reply_to_message_id": body.message.message_id,
                "text": "Shhh... quiet now.\nMuted " + getMentionName(body.message.reply_to_message.from) + "for 30 minutes due to hit the admin command.",
                "parse_mode": "Markdown"
            };
            var mute = {
                "method": 'restrictChatMember',
                "chat_id": body.message.chat.id,
                "user_id": body.message.reply_to_message.from.id,
                "can_send_messages": false,
                "can_send_media_messages": false,
                "can_send_other_messages": false,
                "can_add_web_page_previews": false,
                "until_date": Date.now() / 1000 + 1800
            };
            postTelegram(sd)
            postTelegram(mute)
            postTelegram(delNonAdminComand)
            postTelegram(sd2)
        }
    }
    if (body.message.text.indexOf("/unpinall") == 0) {
        isAdmin = isAdminOrCreator(body.message.from.id, body.message.chat.id)
        if (isAdmin) {
            var sendStart = {
                "method": "sendMessage",
                "chat_id": body.message.chat.id,
                "reply_to_message_id": body.message.message_id,
                "parse_mode": "Markdown",
                "text": 'Are you sure you want to unpinall messages? ',
            };
            var inlineKeyboardMarkup = {};
            inlineKeyboardMarkup.inline_keyboard = [];
            var keyboardRow = []
            var keyboardRow2 = [];
            var confirm = {
                text: "✅",
                callback_data: "confirm"
            };
            var cancel = {
                text: "❌",
                callback_data: "cancel"
            };
            keyboardRow.push(cancel);
            keyboardRow.push(confirm);
            inlineKeyboardMarkup.inline_keyboard.push(keyboardRow);
            sendStart.reply_markup = inlineKeyboardMarkup;
            postTelegram(sendStart)
        } else {
            var sd = {
                "method": "sendMessage",
                "chat_id": body.message.chat.id,
                "reply_to_message_id": body.message.message_id,
                "text": "Sorry... " + getMentionName(body.message.from) + "this command only can use by an admin.",
                "parse_mode": "Markdown"
            };
            var delNonAdminComand = {
                "method": "deleteMessage",
                "chat_id": body.message.chat.id,
                "message_id": body.message.message_id
            };
            var sd2 = {
                "method": "sendMessage",
                "chat_id": body.message.chat.id,
                "reply_to_message_id": body.message.message_id,
                "text": "Shhh... quiet now.\nMuted " + getMentionName(body.message.reply_to_message.from) + "for 30 minutes due to hit the admin command.",
                "parse_mode": "Markdown"
            };
            var mute = {
                "method": 'restrictChatMember',
                "chat_id": body.message.chat.id,
                "user_id": body.message.reply_to_message.from.id,
                "can_send_messages": false,
                "can_send_media_messages": false,
                "can_send_other_messages": false,
                "can_add_web_page_previews": false,
                "until_date": Date.now() / 1000 + 1800
            };
            postTelegram(sd)
            postTelegram(mute)
            postTelegram(delNonAdminComand)
            postTelegram(sd2)
        }
    }
    if (body.message.text.indexOf("/unpin") === 0) {
        isAdmin = isAdminOrCreator(body.message.from.id, body.message.chat.id)
        if (isAdmin) {
            var sd = {
                "method": "sendMessage",
                "chat_id": body.message.chat.id,
                "text": "Message " + body.message.message_id + " has been unpinned.",
                "parse_mode": "Markdown",
                "reply_to_message_id": body.message.message_id,
                "allow_sending_without_reply": true
            };
            var unpinMsg = {
                "method": "unpinChatMessage",
                "chat_id": body.message.chat.id,
                "message_id": body.message.reply_to_message.message_id,
            };
            postTelegram(unpinMsg)
            postTelegram(sd)
        } else {
            var sd = {
                "method": "sendMessage",
                "chat_id": body.message.chat.id,
                "reply_to_message_id": body.message.message_id,
                "text": "Sorry... " + getMentionName(body.message.from) + "this command only can use by an admin.",
                "parse_mode": "Markdown"
            };
            var delNonAdminComand = {
                "method": "deleteMessage",
                "chat_id": body.message.chat.id,
                "message_id": body.message.message_id
            };
            var sd2 = {
                "method": "sendMessage",
                "chat_id": body.message.chat.id,
                "reply_to_message_id": body.message.message_id,
                "text": "Shhh... quiet now.\nMuted " + getMentionName(body.message.reply_to_message.from) + "for 30 minutes due to hit the admin command.",
                "parse_mode": "Markdown"
            };
            var mute = {
                "method": 'restrictChatMember',
                "chat_id": body.message.chat.id,
                "user_id": body.message.reply_to_message.from.id,
                "can_send_messages": false,
                "can_send_media_messages": false,
                "can_send_other_messages": false,
                "can_add_web_page_previews": false,
                "until_date": Date.now() / 1000 + 1800
            };
            postTelegram(sd)
            postTelegram(mute)
            postTelegram(delNonAdminComand)
            postTelegram(sd2)
        }
    }

    /**
    ————Dividing line————Dividing line————Dividing line————
    ————Dividing line————Dividing line————Dividing line————
    ————Dividing line————Dividing line————Dividing line————
    ————Handel   mute————Handel   mute————Handle   mute————
    ————Handel   mute————Handel   mute————Handle   mute————
    ————Dividing line————Dividing line————Dividing line————
    ————Dividing line————Dividing line————Dividing line————
    ————Dividing line————Dividing line————Dividing line————
    **/
    if (body.message.text.indexOf("/mute") === 0) {
        isRepliedAnAdmin = isAdminOrCreator(body.message.reply_to_message.from.id, body.message.chat.id)
        isAdmin = isAdminOrCreator(body.message.from.id, body.message.chat.id)
        if (isAdmin) {
            if (body.message.reply_to_message.from.id != 1932532833) {
                if (!isRepliedAnAdmin) {
                    var mute = {
                        "method": 'restrictChatMember',
                        "chat_id": body.message.chat.id,
                        "user_id": body.message.reply_to_message.from.id,
                        "can_send_messages": false,
                        "can_send_media_messages": false,
                        "can_send_other_messages": false,
                        "can_add_web_page_previews": false
                    };
                    var sd = {
                        "method": "sendMessage",
                        "chat_id": body.message.chat.id,
                        "text": "Shhh... quiet now.\nMuted " + getMentionName(body.message.reply_to_message.from) + ".",
                        "parse_mode": "Markdown",
                        "reply_to_message_id": body.message.message_id,
                        "allow_sending_without_reply": true
                    };
                    postTelegram(sd)
                    postTelegram(mute)
                } else {
                    var sd = {
                        "method": "sendMessage",
                        "chat_id": body.message.chat.id,
                        "reply_to_message_id": body.message.message_id,
                        "text": "Ehhh, I'd rather not get involved in muting an admin. I'll stick to muting normal users, thanks.",
                        "parse_mode": "Markdown"
                    };
                    postTelegram(sd)
                }
            } else {
                var sd = {
                    "method": "sendMessage",
                    "chat_id": body.message.chat.id,
                    "text": "You know what I'm not going to do? Mute myself.",
                    "parse_mode": "Markdown",
                    "reply_to_message_id": body.message.message_id,
                    "allow_sending_without_reply": true
                };
                postTelegram(sd)
            }
        } else {
            var sd = {
                "method": "sendMessage",
                "chat_id": body.message.chat.id,
                "reply_to_message_id": body.message.message_id,
                "text": "Sorry... " + getMentionName(body.message.from) + "this command only can use by an admin.",
                "parse_mode": "Markdown"
            };
            var delNonAdminComand = {
                "method": "deleteMessage",
                "chat_id": body.message.chat.id,
                "message_id": body.message.message_id
            };
            var sd2 = {
                "method": "sendMessage",
                "chat_id": body.message.chat.id,
                "reply_to_message_id": body.message.message_id,
                "text": "Shhh... quiet now.\nMuted " + getMentionName(body.message.reply_to_message.from) + "for 30 minutes due to hit the admin command.",
                "parse_mode": "Markdown"
            };
            var mute = {
                "method": 'restrictChatMember',
                "chat_id": body.message.chat.id,
                "user_id": body.message.reply_to_message.from.id,
                "can_send_messages": false,
                "can_send_media_messages": false,
                "can_send_other_messages": false,
                "can_add_web_page_previews": false,
                "until_date": Date.now() / 1000 + 1800
            };
            postTelegram(sd)
            postTelegram(mute)
            postTelegram(delNonAdminComand)
            postTelegram(sd2)
        }
    }
    if (body.message.text.indexOf("/dmute") === 0) {
        isRepliedAnAdmin = isAdminOrCreator(body.message.reply_to_message.from.id, body.message.chat.id)
        isAdmin = isAdminOrCreator(body.message.from.id, body.message.chat.id)
        if (isAdmin) {
            if (body.message.reply_to_message.from.id != 1932532833) {
                if (!isRepliedAnAdmin) {
                    var mute = {
                        "method": 'restrictChatMember',
                        "chat_id": body.message.chat.id,
                        "user_id": body.message.reply_to_message.from.id,
                        "can_send_messages": false,
                        "can_send_media_messages": false,
                        "can_send_other_messages": false,
                        "can_add_web_page_previews": false
                    };
                    var sd = {
                        "method": "sendMessage",
                        "chat_id": body.message.chat.id,
                        "text": "Shhh... quiet now.\nMuted " + getMentionName(body.message.reply_to_message.from) + ".",
                        "parse_mode": "Markdown",
                        "reply_to_message_id": body.message.message_id,
                        "allow_sending_without_reply": true
                    };
                    var delMsg = {
                        "method": "deleteMessage",
                        "chat_id": body.message.chat.id,
                        "message_id": body.message.message_id,
                    };
                    postTelegram(sd)
                    postTelegram(mute)
                    postTelegram(delMsg)
                } else {
                    var sd = {
                        "method": "sendMessage",
                        "chat_id": body.message.chat.id,
                        "reply_to_message_id": body.message.message_id,
                        "text": "Ehhh, I'd rather not get involved in muting an admin. I'll stick to muting normal users, thanks.",
                        "parse_mode": "Markdown"
                    };
                    postTelegram(sd)
                }
            } else {
                var sd = {
                    "method": "sendMessage",
                    "chat_id": body.message.chat.id,
                    "reply_to_message_id": body.message.message_id,
                    "text": "Ehhh, I'd rather not get involved in muting an admin. I'll stick to muting normal users, thanks.",
                    "parse_mode": "Markdown"
                };
                postTelegram(sd)
            }
        } else {
            var sd = {
                "method": "sendMessage",
                "chat_id": body.message.chat.id,
                "reply_to_message_id": body.message.message_id,
                "text": "Sorry... " + getMentionName(body.message.from) + "this command only can use by an admin.",
                "parse_mode": "Markdown"
            };
            var delNonAdminComand = {
                "method": "deleteMessage",
                "chat_id": body.message.chat.id,
                "message_id": body.message.message_id
            };
            var sd2 = {
                "method": "sendMessage",
                "chat_id": body.message.chat.id,
                "reply_to_message_id": body.message.message_id,
                "text": "Shhh... quiet now.\nMuted " + getMentionName(body.message.reply_to_message.from) + "for 30 minutes due to hit the admin command.",
                "parse_mode": "Markdown"
            };
            var mute = {
                "method": 'restrictChatMember',
                "chat_id": body.message.chat.id,
                "user_id": body.message.reply_to_message.from.id,
                "can_send_messages": false,
                "can_send_media_messages": false,
                "can_send_other_messages": false,
                "can_add_web_page_previews": false,
                "until_date": Date.now() / 1000 + 1800
            };
            postTelegram(sd)
            postTelegram(mute)
            postTelegram(delNonAdminComand)
            postTelegram(sd2)
        }
    }
    if (body.message.text.indexOf("/tmute") >= 0) {
        isRepliedAnAdmin = isAdminOrCreator(body.message.reply_to_message.from.id, body.message.chat.id)
        isAdmin = isAdminOrCreator(body.message.from.id, body.message.chat.id)
        if (isAdmin) {
            if (body.message.reply_to_message.from.id != 1932532833) {
                if (!isRepliedAnAdmin) {
                    if (paras[1]) {
                        if (paras[1].indexOf("d") >= 0) {
                            para = (paras[1]);
                            time = para.replace("d", "");
                            if (time > 1) {
                                add = "days";
                            } else {
                                add = "day";
                            }
                            newData = time * 86400;
                            var mute = {
                                "method": 'restrictChatMember',
                                "chat_id": body.message.chat.id,
                                "user_id": body.message.reply_to_message.from.id,
                                "can_send_messages": false,
                                "can_send_media_messages": false,
                                "can_send_other_messages": false,
                                "can_add_web_page_previews": false,
                                "until_date": Date.now() / 1000 + newData
                            };
                            var sd = {
                                "method": "sendMessage",
                                "chat_id": body.message.chat.id,
                                "text": "Shhh... quiet now.\nMuted " + getMentionName(body.message.reply_to_message.from) + " for " + time + " " + add + ".",
                                "parse_mode": "Markdown",
                                "reply_to_message_id": body.message.message_id,
                                "allow_sending_without_reply": true
                            };
                            postTelegram(sd)
                            postTelegram(mute)
                        } else if (paras[1].indexOf("h") >= 0) {
                            time = paras[1].replace("h", "")
                            if (time > 1) {
                                add = "hours";
                            } else {
                                add = "hour";
                            }
                            newData = time * 3600
                            var mute = {
                                "method": 'restrictChatMember',
                                "chat_id": body.message.chat.id,
                                "user_id": body.message.reply_to_message.from.id,
                                "can_send_messages": false,
                                "can_send_media_messages": false,
                                "can_send_other_messages": false,
                                "can_add_web_page_previews": false,
                                "until_date": Date.now() / 1000 + newData
                            };
                            var sd = {
                                "method": "sendMessage",
                                "chat_id": body.message.chat.id,
                                "text": "Shhh... quiet now.\nMuted " + getMentionName(body.message.reply_to_message.from) + " for " + time + " " + add + ".",
                                "parse_mode": "Markdown",
                                "reply_to_message_id": body.message.message_id,
                                "allow_sending_without_reply": true
                            };
                            postTelegram(sd)
                            postTelegram(mute)
                        } else if (paras[1].indexOf("m") >= 0) {
                            time = paras[1].replace("m", "")
                            if (time > 1) {
                                var add = "minutes";
                            } else {
                                var add = "minute";
                            }
                            newData = time * 61
                            var mute = {
                                "method": 'restrictChatMember',
                                "chat_id": body.message.chat.id,
                                "user_id": body.message.reply_to_message.from.id,
                                "can_send_messages": false,
                                "can_send_media_messages": false,
                                "can_send_other_messages": false,
                                "can_add_web_page_previews": false,
                                "until_date": Date.now() / 1000 + newData
                            };
                            var sd = {
                                "method": "sendMessage",
                                "chat_id": body.message.chat.id,
                                "text": "Shhh... quiet now.\nMuted " + getMentionName(body.message.reply_to_message.from) + " for " + time + " " + add + ".",
                                "parse_mode": "Markdown",
                                "reply_to_message_id": body.message.message_id,
                                "allow_sending_without_reply": true
                            };
                            postTelegram(sd)
                            postTelegram(mute)
                        } else {
                            var sd = {
                                "method": "sendMessage",
                                "chat_id": body.message.chat.id,
                                "text": "Failed to get specified time: it is not a valid time char; expected one of d/h/m ( days, hours, minutes)",
                                "parse_mode": "Markdown",
                                "reply_to_message_id": body.message.message_id,
                                "allow_sending_without_reply": true
                            };
                            postTelegram(sd)
                        }
                    } else {
                        var sd = {
                            "method": "sendMessage",
                            "chat_id": body.message.chat.id,
                            "text": "You haven't specified a time to mute this user for!",
                            "parse_mode": "Markdown",
                            "reply_to_message_id": body.message.message_id,
                            "allow_sending_without_reply": true
                        };
                        postTelegram(sd)
                    }
                } else {
                    var sd = {
                        "method": "sendMessage",
                        "chat_id": body.message.chat.id,
                        "reply_to_message_id": body.message.message_id,
                        "text": "Ehhh, I'd rather not get involved in muting an admin. I'll stick to muting normal users, thanks.",
                        "parse_mode": "Markdown"
                    };
                    postTelegram(sd)
                }
            } else {
                var sd = {
                    "method": "sendMessage",
                    "chat_id": body.message.chat.id,
                    "text": "You know what I'm not going to do? Mute myself.",
                    "parse_mode": "Markdown",
                    "reply_to_message_id": body.message.message_id,
                    "allow_sending_without_reply": true
                };
                postTelegram(sd)
            }
        } else {
            var sd = {
                "method": "sendMessage",
                "chat_id": body.message.chat.id,
                "reply_to_message_id": body.message.message_id,
                "text": "Sorry... " + getMentionName(body.message.from) + "this command only can use by an admin.",
                "parse_mode": "Markdown"
            };
            var delNonAdminComand = {
                "method": "deleteMessage",
                "chat_id": body.message.chat.id,
                "message_id": body.message.message_id
            };
            var sd2 = {
                "method": "sendMessage",
                "chat_id": body.message.chat.id,
                "reply_to_message_id": body.message.message_id,
                "text": "Shhh... quiet now.\nMuted " + getMentionName(body.message.reply_to_message.from) + "for 30 minutes due to hit the admin command.",
                "parse_mode": "Markdown"
            };
            var mute = {
                "method": 'restrictChatMember',
                "chat_id": body.message.chat.id,
                "user_id": body.message.reply_to_message.from.id,
                "can_send_messages": false,
                "can_send_media_messages": false,
                "can_send_other_messages": false,
                "can_add_web_page_previews": false,
                "until_date": Date.now() / 1000 + 1800
            };
            postTelegram(sd)
            postTelegram(mute)
            postTelegram(delNonAdminComand)
            postTelegram(sd2)
        }
    }
    if (body.message.text.indexOf("/smute") === 0) {
        isRepliedAnAdmin = isAdminOrCreator(body.message.reply_to_message.from.id, body.message.chat.id)
        isAdmin = isAdminOrCreator(body.message.from.id, body.message.chat.id)
        if (isAdmin) {
            if (body.message.reply_to_message.from.id != 1932532833) {
                if (!isRepliedAnAdmin) {
                    var mute = {
                        "method": 'restrictChatMember',
                        "chat_id": body.message.chat.id,
                        "user_id": body.message.reply_to_message.from.id,
                        "can_send_messages": false,
                        "can_send_media_messages": false,
                        "can_send_other_messages": false,
                        "can_add_web_page_previews": false
                    };
                    var delCommand = {
                        "method": "deleteMessage",
                        "chat_id": body.message.chat.id,
                        "message_id": body.message.message_id
                    };
                    var delMsg = {
                        "method": "deleteMessage",
                        "chat_id": body.message.chat.id,
                        "message_id": body.message.reply_to_message.message_id,
                    };
                    postTelegram(delCommand)
                    postTelegram(mute)
                    postTelegram(delMsg)
                }
            } else {
                var sd = {
                    "method": "sendMessage",
                    "chat_id": body.message.chat.id,
                    "reply_to_message_id": body.message.message_id,
                    "text": "Sorry... " + getMentionName(body.message.from) + "this command only can use by an admin.",
                    "parse_mode": "Markdown"
                };
                var sd2 = {
                    "method": "sendMessage",
                    "chat_id": body.message.chat.id,
                    "reply_to_message_id": body.message.message_id,
                    "text": "Shhh... quiet now.\nMuted " + getMentionName(body.message.reply_to_message.from) + "for 30 minutes due to hit the admin command.",
                    "parse_mode": "Markdown"
                };
                var mute = {
                    "method": 'restrictChatMember',
                    "chat_id": body.message.chat.id,
                    "user_id": body.message.reply_to_message.from.id,
                    "can_send_messages": false,
                    "can_send_media_messages": false,
                    "can_send_other_messages": false,
                    "can_add_web_page_previews": false,
                    "until_date": Date.now() / 1000 + 1800
                };
                postTelegram(sd)
                postTelegram(mute)
                postTelegram(sd2)
            }
        } else {
            var sd = {
                "method": "sendMessage",
                "chat_id": body.message.chat.id,
                "reply_to_message_id": body.message.message_id,
                "text": "Ehhh, I'd rather not get involved in muting an admin. I'll stick to muting normal users, thanks.",
                "parse_mode": "Markdown"
            };
            postTelegram(sd)
        }
    }

    /**
    ————Dividing line————Dividing line————Dividing line————
    ————Dividing line————Dividing line————Dividing line————
    ————Dividing line————Dividing line————Dividing line————
    ————Handel delete————Handle delete————Handle delete————
    ————Handel delete————Handel delete————Handle delete————
    ————Dividing line————Dividing line————Dividing line————
    ————Dividing line————Dividing line————Dividing line————
    ————Dividing line————Dividing line————Dividing line————
    **/
    if (body.message.text.indexOf("/delete") >= 0) {
        isAdmin = isAdminOrCreator(body.message.from.id, body.message.chat.id)
        if (isAdmin) {
            var sd = {
                "method": "sendMessage",
                "chat_id": body.message.chat.id,
                "text": "Message " + body.message.message_id + " has been deleted.",
                "parse_mode": "Markdown",
                "reply_to_message_id": body.message.message_id,
                "allow_sending_without_reply": true
            };
            var delMsg = {
                "method": "deleteMessage",
                "chat_id": body.message.chat.id,
                "message_id": body.message.reply_to_message.message_id
            };
            postTelegram(sd)
            postTelegram(delMsg)
        } else {
            var sd = {
                "method": "sendMessage",
                "chat_id": body.message.chat.id,
                "reply_to_message_id": body.message.message_id,
                "text": "Sorry... " + getMentionName(body.message.from) + "this command only can use by an admin.",
                "parse_mode": "Markdown"
            };
            var sd2 = {
                "method": "sendMessage",
                "chat_id": body.message.chat.id,
                "reply_to_message_id": body.message.message_id,
                "text": "Shhh... quiet now.\nMuted " + getMentionName(body.message.reply_to_message.from) + "for 30 minutes due to hit the admin command.",
                "parse_mode": "Markdown"
            };
            var delCommand = {
                "method": "deleteMessage",
                "chat_id": body.message.chat.id,
                "message_id": body.message.message_id
            };
            var mute = {
                "method": 'restrictChatMember',
                "chat_id": body.message.chat.id,
                "user_id": body.message.reply_to_message.from.id,
                "can_send_messages": false,
                "can_send_media_messages": false,
                "can_send_other_messages": false,
                "can_add_web_page_previews": false,
                "until_date": Date.now() / 1000 + 1800
            };
            postTelegram(sd)
            postTelegram(mute)
            postTelegram(delNonAdminComand)
            postTelegram(sd2)
        }
    }
    if (body.message.text.indexOf("/sdelete") >= 0) {
        isAdmin = isAdminOrCreator(body.message.from.id, body.message.chat.id)
        if (isAdmin) {
            var delCommand = {
                "method": "deleteMessage",
                "chat_id": body.message.chat.id,
                "message_id": body.message.message_id
            };
            var delMsg = {
                "method": "deleteMessage",
                "chat_id": body.message.chat.id,
                "message_id": body.message.reply_to_message.message_id
            };
            postTelegram(delCommand)
            postTelegram(delMsg)
        } else {
            var sd = {
                "method": "sendMessage",
                "chat_id": body.message.chat.id,
                "reply_to_message_id": body.message.message_id,
                "text": "Sorry... " + getMentionName(body.message.from) + "this command only can use by an admin.",
                "parse_mode": "Markdown"
            };
            var sd2 = {
                "method": "sendMessage",
                "chat_id": body.message.chat.id,
                "reply_to_message_id": body.message.message_id,
                "text": "Shhh... quiet now.\nMuted " + getMentionName(body.message.reply_to_message.from) + "for 30 minutes due to hit the admin command.",
                "parse_mode": "Markdown"
            };
            var delNonAdminComand = {
                "method": "deleteMessage",
                "chat_id": body.message.chat.id,
                "message_id": body.message.message_id
            };
            var mute = {
                "method": 'restrictChatMember',
                "chat_id": body.message.chat.id,
                "user_id": body.message.reply_to_message.from.id,
                "can_send_messages": false,
                "can_send_media_messages": false,
                "can_send_other_messages": false,
                "can_add_web_page_previews": false,
                "until_date": Date.now() / 1000 + 1800
            };
            postTelegram(sd)
            postTelegram(mute)
            postTelegram(delNonAdminComand)
            postTelegram(sd2)
        }
    }

    /**
    ————Dividing line————Dividing line————Dividing line————
    ————Dividing line————Dividing line————Dividing line————
    ————Dividing line————Dividing line————Dividing line————
    ————Handel   kick————Handel   kick————Handle   kick————
    ————Handel   kick————Handel   kick————Handle   kick————
    ————Dividing line————Dividing line————Dividing line————
    ————Dividing line————Dividing line————Dividing line————
    ————Dividing line————Dividing line————Dividing line————
    **/
    if (body.message.text.indexOf("/kick") >= 0) {
        isRepliedAnAdmin = isAdminOrCreator(body.message.reply_to_message.from.id, body.message.chat.id)
        isAdmin = isAdminOrCreator(body.message.from.id, body.message.chat.id)
        if (isAdmin) {
            if (body.message.reply_to_message.from.id != 1932532833) {
                if (!isRepliedAnAdmin) {
                    var kick = {
                        "method": "kickChatMember",
                        "chat_id": body.message.chat.id,
                        "user_id": body.message.reply_to_message.from.id
                    }
                    var sd = {
                        "method": "sendMessage",
                        "chat_id": body.message.chat.id,
                        "text": "I've kicked " + getMentionName(body.message.reply_to_message.from) + ".",
                        "parse_mode": "Markdown",
                        "reply_to_message_id": body.message.message_id,
                        "allow_sending_without_reply": true
                    };
                    postTelegram(kick)
                    postTelegram(sd)
                } else {
                    var sd = {
                        "method": "sendMessage",
                        "chat_id": body.message.chat.id,
                        "reply_to_message_id": body.message.message_id,
                        "text": "I'm not gonna kick an admin... Though I reckon it'd be pretty funny.",
                        "parse_mode": "Markdown"
                    };
                    postTelegram(sd)
                }
            } else {
                var sd = {
                    "method": "sendMessage",
                    "chat_id": body.message.chat.id,
                    "text": "Yeahhh, I'm not going to kick myself.",
                    "parse_mode": "Markdown",
                    "reply_to_message_id": body.message.message_id,
                    "allow_sending_without_reply": true
                };
                postTelegram(sd)
            }
        } else {
            var sd = {
                "method": "sendMessage",
                "chat_id": body.message.chat.id,
                "reply_to_message_id": body.message.message_id,
                "text": "Sorry... " + getMentionName(body.message.from) + "this command only can use by an admin.",
                "parse_mode": "Markdown"
            };
            var delNonAdminComand = {
                "method": "deleteMessage",
                "chat_id": body.message.chat.id,
                "message_id": body.message.message_id
            };
            var sd2 = {
                "method": "sendMessage",
                "chat_id": body.message.chat.id,
                "reply_to_message_id": body.message.message_id,
                "text": "Shhh... quiet now.\nMuted " + getMentionName(body.message.reply_to_message.from) + "for 30 minutes due to hit the admin command.",
                "parse_mode": "Markdown"
            };
            var mute = {
                "method": 'restrictChatMember',
                "chat_id": body.message.chat.id,
                "user_id": body.message.reply_to_message.from.id,
                "can_send_messages": false,
                "can_send_media_messages": false,
                "can_send_other_messages": false,
                "can_add_web_page_previews": false,
                "until_date": Date.now() / 1000 + 1800
            };
            postTelegram(sd)
            postTelegram(mute)
            postTelegram(delNonAdminComand)
            postTelegram(sd2)
        }
    }
    if (body.message.text.indexOf("/dkick") >= 0) {
        isRepliedAnAdmin = isAdminOrCreator(body.message.reply_to_message.from.id, body.message.chat.id)
        isAdmin = isAdminOrCreator(body.message.from.id, body.message.chat.id)
        if (isAdmin) {
            if (body.message.reply_to_message.from.id != 1932532833) {
                if (!isRepliedAnAdmin) {
                    var kick = {
                        "method": "kickChatMember",
                        "chat_id": body.message.chat.id,
                        "user_id": body.message.reply_to_message.from.id
                    };
                    var delMsg = {
                        "method": "deleteMessage",
                        "chat_id": body.message.chat.id,
                        "message_id": body.message.reply_to_message.message_id
                    };
                    var sd = {
                        "method": "sendMessage",
                        "chat_id": body.message.chat.id,
                        "text": "I've kicked " + getMentionName(body.message.reply_to_message.from) + ".",
                        "parse_mode": "Markdown",
                        "reply_to_message_id": body.message.message_id,
                        "allow_sending_without_reply": true
                    };
                    postTelegram(kick)
                    postTelegram(sd)
                    postTelegram(delMsg)
                } else {
                    var sd = {
                        "method": "sendMessage",
                        "chat_id": body.message.chat.id,
                        "reply_to_message_id": body.message.message_id,
                        "text": "I'm not gonna kick an admin... Though I reckon it'd be pretty funny.",
                        "parse_mode": "Markdown"
                    };
                    postTelegram(sd)
                }
            } else {
                var sd = {
                    "method": "sendMessage",
                    "chat_id": body.message.chat.id,
                    "text": "Yeahhh, I'm not going to kick myself.",
                    "parse_mode": "Markdown",
                    "reply_to_message_id": body.message.message_id,
                    "allow_sending_without_reply": true
                };
                postTelegram(sd)
            }
        } else {
            var sd = {
                "method": "sendMessage",
                "chat_id": body.message.chat.id,
                "reply_to_message_id": body.message.message_id,
                "text": "Sorry... " + getMentionName(body.message.from) + "this command only can use by an admin.",
                "parse_mode": "Markdown"
            };
            var delNonAdminComand = {
                "method": "deleteMessage",
                "chat_id": body.message.chat.id,
                "message_id": body.message.message_id
            };
            var sd2 = {
                "method": "sendMessage",
                "chat_id": body.message.chat.id,
                "reply_to_message_id": body.message.message_id,
                "text": "Shhh... quiet now.\nMuted " + getMentionName(body.message.reply_to_message.from) + "for 30 minutes due to hit the admin command.",
                "parse_mode": "Markdown"
            };
            var mute = {
                "method": 'restrictChatMember',
                "chat_id": body.message.chat.id,
                "user_id": body.message.reply_to_message.from.id,
                "can_send_messages": false,
                "can_send_media_messages": false,
                "can_send_other_messages": false,
                "can_add_web_page_previews": false,
                "until_date": Date.now() / 1000 + 1800
            };
            postTelegram(sd)
            postTelegram(mute)
            postTelegram(delNonAdminComand)
            postTelegram(sd2)
        }
    }
    if (body.message.text.indexOf("/skick") >= 0) {
        isRepliedAnAdmin = isAdminOrCreator(body.message.reply_to_message.from.id, body.message.chat.id)
        isAdmin = isAdminOrCreator(body.message.from.id, body.message.chat.id)
        if (isAdmin) {
            if (body.message.reply_to_message.from.id != 1932532833) {
                if (!isRepliedAnAdmin) {
                    var kick = {
                        "method": "kickChatMember",
                        "chat_id": body.message.chat.id,
                        "user_id": body.message.reply_to_message.from.id
                    }
                    var delMsg = {
                        "method": "deleteMessage",
                        "chat_id": body.message.chat.id,
                        "message_id": body.message.reply_to_message.message_id
                    };
                    var delCommand = {
                        "method": "deleteMessage",
                        "chat_id": body.message.chat.id,
                        "message_id": body.message.message_id
                    };
                    payloads.push(delCommand);
                    payloads.push(delMsg);
                    payloads.push(kick);
                    return payloads;
                } else {
                    var sd = {
                        "method": "sendMessage",
                        "chat_id": body.message.chat.id,
                        "reply_to_message_id": body.message.message_id,
                        "text": "I'm not gonna kick an admin... Though I reckon it'd be pretty funny.",
                        "parse_mode": "Markdown"
                    };
                    postTelegram(sd)
                }
            } else {
                var sd = {
                    "method": "sendMessage",
                    "chat_id": body.message.chat.id,
                    "text": "Yeahhh, I'm not going to kick myself.",
                    "parse_mode": "Markdown",
                    "reply_to_message_id": body.message.message_id,
                    "allow_sending_without_reply": true
                };
                postTelegram(sd)
            }
        } else {
            var sd = {
                "method": "sendMessage",
                "chat_id": body.message.chat.id,
                "reply_to_message_id": body.message.message_id,
                "text": "Sorry... " + getMentionName(body.message.from) + "this command only can use by an admin.",
                "parse_mode": "Markdown"
            };
            var delNonAdminComand = {
                "method": "deleteMessage",
                "chat_id": body.message.chat.id,
                "message_id": body.message.message_id
            };
            var sd2 = {
                "method": "sendMessage",
                "chat_id": body.message.chat.id,
                "reply_to_message_id": body.message.message_id,
                "text": "Shhh... quiet now.\nMuted " + getMentionName(body.message.reply_to_message.from) + "for 30 minutes due to hit the admin command.",
                "parse_mode": "Markdown"
            };
            var mute = {
                "method": 'restrictChatMember',
                "chat_id": body.message.chat.id,
                "user_id": body.message.reply_to_message.from.id,
                "can_send_messages": false,
                "can_send_media_messages": false,
                "can_send_other_messages": false,
                "can_add_web_page_previews": false,
                "until_date": Date.now() / 1000 + 1800
            };
            postTelegram(sd)
            postTelegram(mute)
            postTelegram(delNonAdminComand)
            postTelegram(sd2)
        }
    }

    /** Here is handling /ban commond **/
    if (body.message.text.indexOf("/ban") >= 0) {
        isRepliedAnAdmin = isAdminOrCreator(body.message.reply_to_message.from.id, body.message.chat.id)
        isAdmin = isAdminOrCreator(body.message.from.id, body.message.chat.id)
        if (isAdmin) {
            if (body.message.reply_to_message.from.id != 1932532833) {
                if (!isRepliedAnAdmin) {
                    var ban = {
                        "method": "banChatMember",
                        "chat_id": body.message.chat.id,
                        "user_id": body.message.reply_to_message.from.id
                    }
                    var sd = {
                        "method": "sendMessage",
                        "chat_id": body.message.chat.id,
                        "text": "I've banned " + getMentionName(body.message.reply_to_message.from) + ".",
                        "parse_mode": "Markdown",
                        "reply_to_message_id": body.message.message_id,
                        "allow_sending_without_reply": true
                    };
                    postTelegram(ban)
                    postTelegram(sd)
                } else {
                    var sd = {
                        "method": "sendMessage",
                        "chat_id": body.message.chat.id,
                        "reply_to_message_id": body.message.message_id,
                        "text": "I'm not gonna ban an admin... Though I reckon it'd be pretty funny.",
                        "parse_mode": "Markdown"
                    };
                    postTelegram(sd)
                }
            } else {
                var sd = {
                    "method": "sendMessage",
                    "chat_id": body.message.chat.id,
                    "text": "Yeahhh, I'm not going to ban myself.",
                    "parse_mode": "Markdown",
                    "reply_to_message_id": body.message.message_id,
                    "allow_sending_without_reply": true
                };
                postTelegram(sd)
            }
        } else {
            var sd = {
                "method": "sendMessage",
                "chat_id": body.message.chat.id,
                "reply_to_message_id": body.message.message_id,
                "text": "Sorry... " + getMentionName(body.message.from) + "this command only can use by an admin.",
                "parse_mode": "Markdown"
            };
            var delNonAdminComand = {
                "method": "deleteMessage",
                "chat_id": body.message.chat.id,
                "message_id": body.message.message_id
            };
            var sd2 = {
                "method": "sendMessage",
                "chat_id": body.message.chat.id,
                "reply_to_message_id": body.message.message_id,
                "text": "Shhh... quiet now.\nMuted " + getMentionName(body.message.reply_to_message.from) + "for 30 minutes due to hit the admin command.",
                "parse_mode": "Markdown"
            };
            var mute = {
                "method": 'restrictChatMember',
                "chat_id": body.message.chat.id,
                "user_id": body.message.reply_to_message.from.id,
                "can_send_messages": false,
                "can_send_media_messages": false,
                "can_send_other_messages": false,
                "can_add_web_page_previews": false,
                "until_date": Date.now() / 1000 + 1800
            };
            postTelegram(sd)
            postTelegram(mute)
            postTelegram(delNonAdminComand)
            postTelegram(sd2)
        }
    }
    if (body.message.text.indexOf("/dban") >= 0) {
        isRepliedAnAdmin = isAdminOrCreator(body.message.reply_to_message.from.id, body.message.chat.id)
        isAdmin = isAdminOrCreator(body.message.from.id, body.message.chat.id)
        if (isAdmin) {
            if (body.message.reply_to_message.from.id != 1932532833) {
                if (!isRepliedAnAdmin) {
                    var ban = {
                        "method": "banChatMember",
                        "chat_id": body.message.chat.id,
                        "user_id": body.message.reply_to_message.from.id
                    };
                    var delMsg = {
                        "method": "deleteMessage",
                        "chat_id": body.message.chat.id,
                        "message_id": body.message.reply_to_message.message_id
                    };
                    var sd = {
                        "method": "sendMessage",
                        "chat_id": body.message.chat.id,
                        "text": "I've banned " + getMentionName(body.message.reply_to_message.from) + ".",
                        "parse_mode": "Markdown",
                        "reply_to_message_id": body.message.message_id,
                        "allow_sending_without_reply": true
                    };
                    postTelegram(ban)
                    postTelegram(sd)
                    postTelegram(delMsg)
                } else {
                    var sd = {
                        "method": "sendMessage",
                        "chat_id": body.message.chat.id,
                        "reply_to_message_id": body.message.message_id,
                        "text": "I'm not gonna ban an admin... Though I reckon it'd be pretty funny.",
                        "parse_mode": "Markdown"
                    };
                    postTelegram(sd)
                }
            } else {
                var sd = {
                    "method": "sendMessage",
                    "chat_id": body.message.chat.id,
                    "text": "Yeahhh, I'm not going to ban myself.",
                    "parse_mode": "Markdown",
                    "reply_to_message_id": body.message.message_id,
                    "allow_sending_without_reply": true
                };
                postTelegram(sd)
            }
        } else {
            var sd = {
                "method": "sendMessage",
                "chat_id": body.message.chat.id,
                "reply_to_message_id": body.message.message_id,
                "text": "Sorry... " + getMentionName(body.message.from) + "this command only can use by an admin.",
                "parse_mode": "Markdown"
            };
            var delNonAdminComand = {
                "method": "deleteMessage",
                "chat_id": body.message.chat.id,
                "message_id": body.message.message_id
            };
            var sd2 = {
                "method": "sendMessage",
                "chat_id": body.message.chat.id,
                "reply_to_message_id": body.message.message_id,
                "text": "Shhh... quiet now.\nMuted " + getMentionName(body.message.reply_to_message.from) + "for 30 minutes due to hit the admin command.",
                "parse_mode": "Markdown"
            };
            var mute = {
                "method": 'restrictChatMember',
                "chat_id": body.message.chat.id,
                "user_id": body.message.reply_to_message.from.id,
                "can_send_messages": false,
                "can_send_media_messages": false,
                "can_send_other_messages": false,
                "can_add_web_page_previews": false,
                "until_date": Date.now() / 1000 + 1800
            };
            postTelegram(sd)
            postTelegram(mute)
            postTelegram(delNonAdminComand)
            postTelegram(sd2)
            postTelegram(sd)
        }
    }
    if (body.message.text.indexOf("/sban") >= 0) {
        isRepliedAnAdmin = isAdminOrCreator(body.message.reply_to_message.from.id, body.message.chat.id)
        isAdmin = isAdminOrCreator(body.message.from.id, body.message.chat.id)
        if (isAdmin) {
            if (body.message.reply_to_message.from.id != 1932532833) {
                if (!isRepliedAnAdmin) {
                    var ban = {
                        "method": "banChatMember",
                        "chat_id": body.message.chat.id,
                        "user_id": body.message.reply_to_message.from.id
                    }
                    var delMsg = {
                        "method": "deleteMessage",
                        "chat_id": body.message.chat.id,
                        "message_id": body.message.reply_to_message.message_id
                    };
                    var delCommand = {
                        "method": "deleteMessage",
                        "chat_id": body.message.chat.id,
                        "message_id": body.message.message_id
                    };
                    payloads.push(delCommand);
                    payloads.push(delMsg);
                    payloads.push(ban);
                    return payloads;
                } else {
                    var sd = {
                        "method": "sendMessage",
                        "chat_id": body.message.chat.id,
                        "reply_to_message_id": body.message.message_id,
                        "text": "I'm not gonna ban an admin... Though I reckon it'd be pretty funny.",
                        "parse_mode": "Markdown"
                    };
                    postTelegram(sd)
                }
            } else {
                var sd = {
                    "method": "sendMessage",
                    "chat_id": body.message.chat.id,
                    "text": "Yeahhh, I'm not going to ban myself.",
                    "parse_mode": "Markdown",
                    "reply_to_message_id": body.message.message_id,
                    "allow_sending_without_reply": true
                };
                postTelegram(sd)
            }
        } else {
            var sd = {
                "method": "sendMessage",
                "chat_id": body.message.chat.id,
                "reply_to_message_id": body.message.message_id,
                "text": "Sorry... " + getMentionName(body.message.from) + "this command only can use by an admin.",
                "parse_mode": "Markdown"
            };
            var delNonAdminComand = {
                "method": "deleteMessage",
                "chat_id": body.message.chat.id,
                "message_id": body.message.message_id
            };
            var sd2 = {
                "method": "sendMessage",
                "chat_id": body.message.chat.id,
                "reply_to_message_id": body.message.message_id,
                "text": "Shhh... quiet now.\nMuted " + getMentionName(body.message.reply_to_message.from) + "for 30 minutes due to hit the admin command.",
                "parse_mode": "Markdown"
            };
            var mute = {
                "method": 'restrictChatMember',
                "chat_id": body.message.chat.id,
                "user_id": body.message.reply_to_message.from.id,
                "can_send_messages": false,
                "can_send_media_messages": false,
                "can_send_other_messages": false,
                "can_add_web_page_previews": false,
                "until_date": Date.now() / 1000 + 1800
            };
            postTelegram(sd)
            postTelegram(mute)
            postTelegram(delNonAdminComand)
            postTelegram(sd2)
        }
    }
    if (body.message.text.indexOf("/") >= 0) {
        var payload = {
            "method": "deleteMessage",
            "chat_id": body.message.chat.id,
            "message_id": body.message.message_id,
        };
        setTimeout(postTelegram(payload), 3000)
    }
}
