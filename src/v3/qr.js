function generateQr(body) {
    var text = body.message.text;

    var param = text.trim().split(" "); // remove empty strings
    param = param.filter(function(para) {
        if (para) {
            return true;
        } 
    });
    if(param[0]){
        if(param[1]){
            var sendQR = {
                "method": "sendPhoto",
                "chat_id": body.message.chat.id,
                "reply_to_message_id": body.message.message_id,
                "caption": body.message.text.replace("/qr", ""), 
                "photo": "https://api.qrserver.com/v1/create-qr-code/?size=450x450&data=" + body.message.text.replace("/qr", "")
            }
            return sendQR
        } else {
            var sendNoParam = {
                "method": "sendMessage", 
                "chat_id": body.message.chat.id,
                "reply_to_message_id": body.message.message_id,
                "text": "Parameters (text) are required."
            }
            postTelegram(sendNoParam)
        }
    } 
}
