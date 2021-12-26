/**
©Man Ho 
Dec 26 2021 17:04:07 (GMT+0800 Kuala Lumpur, Malaysia Standard Time)
The code is open source.
This project uses the GNU GPL license 
any work using this code must be distributed under the same license. 
**/

function handlePin(body) {
    var text = body.message.text;

    var param = text.trim().split(" "); // remove empty strings
    param = param.filter(function(para) {
        if (para) {
            return true;
        }
    });

    var payloads = [];
    var fromid;
    var sendMessage = {
        "method": "sendMessage",
        "chat_id": body.message.chat.id,
        "text": "",
        "parse_mode": "Markdown",
        "reply_to_message_id": body.message.message_id,
        "allow_sending_without_reply": true
    };
    if (isAdminOrCreator(body.message.from.id, body.message.chat.id)) {
        if (!param[1]) {
            if (body.message.reply_to_message) {
                if (getChatMember(body.message.chat.id, Const.botId).can_restrict_members) {
                    var pinMsg= {
                        "method": "pinChatMessage",
                        "chat_id": body.message.chat.id,
                        "message_id": body.message.reply_to_message.message_id
                    };
                    var delCommand = {
                        "method": "deleteMessage",
                        "chat_id": body.message.chat.id,
                        "message_id": body.message.message_id
                    };
                    var unpinAll = {
                        "method": "unpinAllChatMessages", 
                        "chat_id": body.message.chat.id, 
                    };
                    if (text.indexOf("s") >= 0) {
                        payloads.push(delCommand)
                        disable_notification = true
                        payloads.push(pinMsg)
                        return payloads;
                    } else if(text.indexOf("un") >= 0){
                        pinMsg.method = "unpinChatMessage" 
                        return(pinMsg)
                        sendMessage.text = "Message" + body.message.reply_to_message.message_id + "has been unpinned.\n\nSelf-destruct in a few seconds later. "
                        postTelegram(delMsg)
                        var deleteSentMsg = postTelegram(sendMessage)
                        if(deleteSentMsg.ok == true){
                            var deleteSentPayload = {
                                "method": "deleteMessage", 
                                "chat_id": deleteSentMsg.result.chat.id,
                                "message_id": deleteSentMsg.result.message_id
                            }
                            Utilities.sleep(28000)
                            postTelegram(deleteSentPayload)
                        }
                        
                    } else if(text.indexOf("all") >= 0){
                        var buttons = [] 
                        
                        var button1 = {
                            text: "✅", 
                            callback_data: "uncomfortable_unpinall"
                        }
                        var button2 = {
                            text: "❎", 
                            callback_data: "cancel_unpinall"
                        }
                        buttons.push(button1)
                        buttons.push(button2)
                        
                        sendMessage.text = "Are you sure to unpinall message?"
                        sendMessage.reply_markup = generateInlineKeyboardMarkup(buttons, 2)
                        postTelegra(sendMessage)
                        
                    } else {
                        sendMessage.text = "Message" + body.message.reply_to_message.message_id + "has been pinned.\n\nSelf-destruct in a few seconds later. "
                        postTelegram(delMsg)
                        var deleteSentMsg = postTelegram(sendMessage)
                        if(deleteSentMsg.ok == true){
                            var deleteSentPayload = {
                                "method": "deleteMessage", 
                                "chat_id": delNonAdminComand2.result.chat.id,
                                "message_id": delNonAdminComand2.result.message_id
                            }
                            Utilities.sleep(28000)
                            postTelegram(deleteSentPayload)
                        }
                    }
                } else {
                    //no have permission                        
                    sendMessage.text = "I haven't got the rights to do this."
                    return sendMessage;
                }
            } else {
                // no specify user 
                sendMessage.text = "I don't know which message you're want to delete , you're going to need to specify a message by reply...!"
                return sendMessage;
            }
        } else {
            if (Number.isInteger(parseInt(param[1]))) {
                sendMessage.text = "Received para with integer"
                return sendMessage
            } else {
                sendMessage.text = "Received para without integer"
                return sendMessage
            }
        }
    } else {
        // not an admin 
        var sendNotAdmin = {
            "method": "sendMessage",
            "chat_id": body.message.chat.id,
            "reply_to_message_id": body.message.message_id,
            "text": "Sorry... " + getMentionName(body.message.from) + "this command only can use by an admin.\n\n\nSelf-destruct in a few minutes later.",
            "parse_mode": "Markdown"
        };
        var delNonAdminComand = {
            "method": "deleteMessage",
            "chat_id": body.message.chat.id,
            "message_id": body.message.message_id
        };
        var sendMuteNotAdmin = {
            "method": "sendMessage",
            "chat_id": body.message.chat.id,
            "reply_to_message_id": body.message.message_id,
            "text": "Shhh... quiet now.\nMuted " + getMentionName(body.message.from) + "for 30 minutes due to hit the admin command.\n\n\nSelf-destruct in a few minutes later.",
            "parse_mode": "Markdown"
        };
        var muteNotAdmin = {
            "method": 'restrictChatMember',
            "chat_id": body.message.chat.id,
            "user_id": body.message.from.id,
            "can_send_messages": false,
            "can_send_media_messages": false,
            "can_send_other_messages": false,
            "can_add_web_page_previews": false,
            "until_date": Date.now() / 1000 + 1800
        };
        var delNonAdminComand1 = postTelegram(sendNotAdmin)
        var delNonAdminComand2 = postTelegram(sendMuteNotAdmin)
        postTelegram(delNonAdminComand)
        postTelegram(muteNotAdmin)
        if (delNonAdminComand1.ok == true) {
            var deleteNonAdminCommandPayload1 = {
                "method": "deleteMessage",
                "chat_id": delNonAdminComand1.result.chat.id,
                "message_id": delNonAdminComand1.result.message_id
            }
            Utilities.sleep(90000)
            postTelegram(deleteNonAdminCommandPayload1)
        }
        if (delNonAdminComand2.ok == true) {
            var deleteNonAdminCommandPayload2 = {
                "method": "deleteMessage",
                "chat_id": delNonAdminComand2.result.chat.id,
                "message_id": delNonAdminComand2.result.message_id
            }
            postTelegram(deleteNonAdminCommandPayload2)
        }
    }
}