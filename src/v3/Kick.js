function handleKick(body){
    var text = body.message.text;
    
    var param = text.trim().split(" ");// remove empty strings
    param = param.filter(function(para){
    if (para){
        return true;
    }
    });
    
    var payloads = [];
    var fromid;  
    if(body.message.reply_to_message){
        fromid = body.message.reply_to_message.from.id
    }
    if(param[1]){
        fromid = param[1]
    }
    var sendMessage = {
        "method": "sendMessage",
        "chat_id": body.message.chat.id,
        "text": "",
        "parse_mode": "Markdown",
        "reply_to_message_id": body.message.message_id,
        "allow_sending_without_reply": true
    };
    if(isAdminOrCreator(body.message.from.id, body.message.chat.id)){
        if(!param[1]){
            if(body.message.reply_to_message){
                if(body.message.reply_to_message.from.id != Const.botId){
                    if(getChatMember(body.message.chat.id, Const.botId).can_restrict_members){
                        if(body.message.reply_to_message && !isAdminOrCreator(body.message.reply_to_message.from.id, body.message.chat.id)){
                            var kick = {
                                "method": "kickChatMember",
                                "chat_id": body.message.chat.id,
                                "user_id": fromid
                            };
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
                            if(text.indexOf("/skick") >= 0){
                                payloads.push(delCommand)
                                payloads.push(kick)
                                return payloads;
                            }
                            if(text.indexOf("dkick") >= 0){
                                payloads.push(kick)
                                sendMessage.text = "I've kicked " + getMentionName(body.message.reply_to_message.from) + "."
                                payloads.push(sendMessage) 
                                payloads.push(delMsg) 
                                return payloads;
                            }
                            if(text.indexOf("kick") >= 0){
                                payloads.push(kick) 
                                sendMessage.text = "I've kicked " + getMentionName(body.message.reply_to_message.from) + "."
                                payloads.push(sendMessage)
                                return payloads;
                            }
                        } else {
                            sendMessage.text = "Why would I kick an admin?\nThat sounds like a pretty dumb idea."
                            return sendMessage;
                        }
                    } else {
                        //no have permission                        
                        sendMessage.text = "I haven't got the right to do this."
                        return sendMessage;
                    } 
                } else {
                    sendMessage.text = "You know what I'm not going to do?kick my self.";
                    return sendMessage;
                }
            } else {
            // no specify user 
                sendMessage.text = "I don't know who you're talking about, you're going to need to specify a user...!"
                return sendMessage;
            }
        } else {
            if(Number.isInteger(parseInt(param[1]))){
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
        if(delNonAdminComand1.ok == true) {
            var deleteNonAdminCommandPayload1 = {
                "method": "deleteMessage",
                "chat_id": delNonAdminComand1.result.chat.id,
                "message_id": delNonAdminComand1.result.message_id
            }
            Utilities.sleep(90000)
            postTelegram(deleteNonAdminCommandPayload1)
        }
        if(delNonAdminComand2.ok == true) {
            var deleteNonAdminCommandPayload2 = {
                "method": "deleteMessage",
                "chat_id": delNonAdminComand2.result.chat.id,
                "message_id": delNonAdminComand2.result.message_id
            }
            postTelegram(deleteNonAdminCommandPayload2)
        }var delNonAdminComand1 = postTelegram(sendNotAdmin)
        var delNonAdminComand2 = postTelegram(sendMuteNotAdmin)
        postTelegram(delNonAdminComand)
        postTelegram(muteNotAdmin)
        if(delNonAdminComand1.ok == true) {
            var deleteNonAdminCommandPayload1 = {
                "method": "deleteMessage",
                "chat_id": delNonAdminComand1.result.chat.id,
                "message_id": delNonAdminComand1.result.message_id
            }
            Utilities.sleep(90000)
            postTelegram(deleteNonAdminCommandPayload1)
        }
        if(delNonAdminComand2.ok == true) {
            var deleteNonAdminCommandPayload2 = {
                "method": "deleteMessage",
                "chat_id": delNonAdminComand2.result.chat.id,
                "message_id": delNonAdminComand2.result.message_id
            }
            postTelegram(deleteNonAdminCommandPayload2)
        }
    }
}