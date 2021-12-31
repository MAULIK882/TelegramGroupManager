function convertApi(body) {
    if(body.message.chat.type == "private"){
        if(body.message.sticker){
            var reqTG = UrlFetchApp.fetch("api.telegram.org/bot" + Const.botToken + "/getFile?file_id=" + body.message.sticker.thumb.file_id)
            var parseReq = JSON.parse(reqTG)
            var path = parseReq.result.file_path
            var reqFilePath = "api.telegram.org/file/bot" + Const.botToken + "/" + path
            var payload = {
                "FileName": "Converted", 
                "storeFile": true,
                "ImageHeight": 512,
                "ImageWidth": 512,
                "ImageQuality": 85
            }
            var data = {
                'contentType': 'application/json',
                "method": "post",
                "muteHttpExceptions": true,
                "payload": JSON.stringify(payload)
              
            };
            var reqConvert = JSON.parse(UrlFetchApp.fetch("https://v2.convertapi.com/convert/webp/to/png?Secret=y6mSvwnqMPr3FooC&storeFile=true&File=https://" + reqFilePath + "&ImageHeight=1024&ImageWidth=1024&FileName=Converted&ImageQuality=100&ImageResolution=500", data))
            var sendDocument = {
                "method": "sendDocument",
                "chat_id": body.message.chat.id,
                "reply_to_message_id": body.message.message_id, 
                "document": reqConvert.Files[0].Url
            } 
            postTelegram(sendDocument)
        }
    } 
}
