function handleCommand(body){
    var text = body.message.text;
    
    if(text.indexOf("!") >=0){
        text = text.replace("!", "/")
    }
    
    if(text.indexOf("ban") >=0){
        return handleBan(body);
        
    } else if(text.indexOf("mute") >= 0){
        return handleMute(body);
        
    } else if(text.indexOf("delete") >= 0){
        return handleDelete(body);
    } else if(text.indexOf("qr") >= 0 || text.indexOf("二维码") >=0){
        return generateQr(body)
    } else if(text.indexOf("song") >= 0 || body.message.reply_to_message.text.indexOf("音乐，歌词，歌手！") >= 0 || body.message.reply_to_message.text.indexOf("免责声明") >= 0 || body.message.reply_to_message.text.indexOf("(ᗒᗨᗕ)") >= 0 || body.message.reply_to_message.text.indexOf("(≧▽≦)") >= 0 ){
        return callNetEase(body)
    } else if(text.indexOf("/") >= 0){
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
function handleCommand(body){
    var text = body.message.text;
    
    if(text.indexOf("!") >=0){
        text = text.replace("!", "/")
    }
    
    if(text.indexOf("ban") >=0){
        return handleBan(body);
        
    } else if(text.indexOf("mute") >= 0){
        return handleMute(body);
        
    } else if(text.indexOf("delete") >= 0){
        return handleDelete(body);
    } else if(text.indexOf("qr") >= 0 || text.indexOf("二维码") >=0){
        return generateQr(body)
    } else if(text.indexOf("song") >= 0 || body.message.reply_to_message.text.indexOf("音乐，歌词，歌手！") >= 0 || body.message.reply_to_message.text.indexOf("免责声明") >= 0 || body.message.reply_to_message.text.indexOf("(ᗒᗨᗕ)") >= 0 || body.message.reply_to_message.text.indexOf("(≧▽≦)") >= 0 ){
        return callNetEase(body)
    } else if(text.indexOf("/") >= 0){
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
