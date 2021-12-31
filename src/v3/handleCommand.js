function handleCommand(body){
    
    if(body.message.text.indexOf("!") >=0){
        text = text.replace("!", "/")
    }
    
    if(body.message.text .indexOf("ban") >=0){
        return handleBan(body);
        
    } else if(body.message.text.indexOf("mute") >= 0){
        return handleMute(body);
        
    } else if(body.message.text.indexOf("delete") >= 0){
        return handleDelete(body);
    } else if(body.message.text.indexOf("qr") >= 0 || body.message.text.indexOf("二维码") >=0){
        return generateQr(body)
    } else if(body.message.text.indexOf("song") >= 0){
        return callNetEase(body)
    } else if(body.message.text.indexOf("/") >= 0){
        var deleteOtherCommandPayload = {
            "method": "deleteMessage",
            "chat_id": body.message.chat.id,
            "message_id": body.message.message_id           
        };
        Utilities.sleep(3000)
        postTelegram(deleteOtherCommandPayload);
    } else {
    return requestApi(body)
    }
}
