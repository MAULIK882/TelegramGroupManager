/**
©Man Ho 
Dec 26 2021 17:04:07 (GMT+0800 Kuala Lumpur, Malaysia Standard Time)
The code is open source.
This project uses the GNU GPL license 
any work using this code must be distributed under the same license. 
**/

function handleMute(body){
    var text = body.message.text;
    
    var paras = text.trim().split(" ");// remove empty strings
    paras = paras.filter(function(para){
    if (para){
        return true;
    }
    });
    
    var payloads = [];
    var fromid;  
    if(body.message.reply_to_message){
        fromid = body.message.reply_to_message.from.id
    }
    if(paras[1]){
        fromid = paras[1]
    }
    var sendMessage = {
        "method": "sendMessage",
        "chat_id": body.message.chat.id,
        "text": "I've banned.",
        "parse_mode": "Markdown",
        "reply_to_message_id": body.message.message_id,
        "allow_sending_without_reply": true
    };
    if(isAdminOrCreator(body.message.from.id, body.message.chat.id)){
        if(body.message){
            if(body.message.reply_to_message){
                if(body.message.reply_to_message.from.id != Const.botId){
                    if(getChatMember(body.message.chat.id, Const.botId).can_restrict_members){
                        if(body.message.reply_to_message && !isAdminOrCreator(body.message.reply_to_message.from.id, body.message.chat.id)){
                            var mute = {
                                "method": 'restrictChatMember',
                                "chat_id": body.message.chat.id,
                                "user_id": body.message.reply_to_message.from.id,
                                "can_send_messages": false,
                                "can_send_media_messages": false,
                                "can_send_other_messages": false,
                                "can_add_web_page_previews": false,
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
                            if(text.indexOf("smute") >= 0){
                                payloads.push(delCommand)
                                payloads.push(mute)
                                return payloads;
                            }
                            if(text.indexOf("dmute") >= 0){
                                payloads.push(mute)
                                sendMessage.text = "Shhh... quiet now.Muted " + getMentionName(body.message.reply_to_message.from) + "."
                                payloads.push(sendMessage) 
                                payloads.push(delMsg) 
                                return payloads;
                            }
                            if(text.indexOf("tmute") >=0 ){
                                var muteTime, send, toMuteTime, origParam;
                                if(paras[1]){
                                    
                                    origParam = paras[1]
                                    if(paras[1].indexOf("m") >= 0 ){
                                        muteTime = paras[1].replace("m", "")
                                        
                                        mute.until_date = Date.now() / 1000 + parseInt(muteTime) * 62
                                        if(muteTime < 2){
                                            send = "1 minute"
                                        } else {
                                            send = muteTime + " minutes"
                                        }
                                        payloads.push(mute)
                                        sendMessage.text = "Shhh... quiet now.\nMuted " + getMentionName(body.message.reply_to_message.from) + " for " + send + "."
                                        payloads.push(sendMessage)
                                        return payloads;
                                    } else if(paras[1].indexOf("h") >= 0 ){
                                        muteTime = muteTime.replace("h", "")
                                        
                                        mute.until_date = Date.now() / 1000 + parseInt(muteTime) * 3605
                                        if(muteTime <= 1){
                                            send = "1 hour"
                                        } else {
                                            send = muteTime + " hours"
                                        }
                                    } else if(paras[1].indexOf("d") >= 0 ){
                                        muteTime = paras[1].replace("d", "")
                                        
                                        mute.until_date = Date.now() / 1000 + parseInt(muteTime) * 86400
                                        if(muteTime <= 1){
                                            send = "1 day"
                                        } else {
                                            send = paras[1] + " days"
                                        }
                                        payloads.push(mute)
                                        sendMessage.text = "Shhh... quiet now.\nMuted " + getMentionName(body.message.reply_to_message.from) + " for " + send + "."
                                        payloads.push(sendMessage)
                                        return payloads;
                                    } else {
                                        sendMessage.text = "Failed to get specified time: " + origParam.replace(/\d/g, "") + "is not a valid time char; expected one of /d/h/m (days, hours, minutes)"
                                        return sendMessage;
                                    }
                                } else {
                                    sendMessage.text = "You haven't specified a time to mute this user for!"
                                    return sendMessage
                                }
                            }
                            if(text.indexOf("mute") >= 0){
                                payloads.push(mute) 
                                sendMessage.text = "Shhh... quiet now.\nMuted" + getMentionName(body.message.reply_to_message.from) + "."
                                payloads.push(sendMessage)
                                return payloads;
                            }
                        } else {
                            sendMessage.text = "Ehhh, I'd rather not get involved in muting an admin. I'll stick to muting normal users, thanks."
                            return sendMessage;
                        }
                    } else {
                        //no have permission                        
                        sendMessage.text = "I haven't got the right to do this."
                        return sendMessage;
                    } 
                } else {
                    sendMessage.text = "You know what I'm not going to do?Ban my self.";
                    return sendMessage;
                }
            } else {
            // no specify user 
                sendMessage.text = "I don't know who you're talking about, you're going to need to specify a user...!"
                return sendMessage;
            }
        }
    } else {
    // not an admin 
        var sendNotAdmin = {
            "method": "sendMessage",
            "chat_id": body.message.chat.id,
            "reply_to_message_id": body.message.message_id,
            "text": "Sorry... " + getMentionName(body.message.from) + ".\nThis command only can use by an admin.\n\n\nSelf-destruct in a few minutes later.",
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
            "text": "Shhh... quiet now.\nMuted " + getMentionName(body.message.from) + " for 30 minutes due to hit the admin command.\n\n\nSelf-destruct in a few minutes later.",
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
        }        
    }
}