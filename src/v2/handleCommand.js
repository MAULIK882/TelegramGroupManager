/**
©Man Ho 
Dec 26 2021 17:04:07 (GMT+0800 Kuala Lumpur, Malaysia Standard Time)
The code is open source.
This project uses the GNU GPL license 
any work using this code must be distributed under the same license. 
**/



function handleCommand(body){
    var text = body.message.text;
    
    if(text.indexOf("!") >=0){
        text = text.replace("!", "/")
    }
    if(text.indexOf("ban") >=0){
        return handleBan(body);
    } else 
    
    if(text.indexOf("mute") >= 0){
        return handleMute(body);
    } else
    
    if(text.indexOf("delete") >= 0){
        return handleDelete(body) 
        
    } else
    if(text.indexOf("kick") >= 0){
        return handleKick(body) 
    } else
    if(text.indexOf("pin") >= 0){
        return handlePin(body) 
    } else 
    if(text.indexOf("/") >= 0){
        var deleteOtherCommandPayload = {
            "method": "deleteMessage",
            "chat_id": body.message.chat.id,
            "message_id": body.message.message_id           
        };
        var sendOtherCommandPayload = {
            "method": "sendMessage",
            "chat_id": body.message.chat.id,
            "reply_to_message_id": body.message.message_id, 
            "text": "Unexpected command.\n\nSelf-destruct in 10 seconds.", 
        }
        var nonCommand = postTelegram(sendOtherCommandPayload)
        Utilities.sleep(3000)
        postTelegram(deleteOtherCommandPayload)
        if(nonCommand.ok == true) {
            var deleteSentPayload = {
                "method": "deleteMessage",
                "chat_id": nonCommand.result.chat.id,
                "message_id": nonCommand.result.message_id
            }
            Utilities.sleep(5000)
            postTelegram(deleteSentPayload)
        }
    }
}