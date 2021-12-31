function aiChat(body) {
        if (body.message.chat.type == "private") {
                var request = {
                        "appid": "e2cdab56b20a035c8627f8016a5d685f",
                        "userid": "user",
                        "spoken": body.message.text.replace("@sakuramiyabot", "")
                }
                var data = {
                        'contentType': 'application/json',
                        "method": "post",
                        "payload": JSON.stringify(request)
                };
                var response = UrlFetchApp.fetch("https://api.ownthink.com/bot?", data);
                var res = JSON.parse(response);
                var sendMessage = {
                        "method": "sendMessage",
                        "chat_id": body.message.chat.id,
                        "text": res.data.info.text,
                        "disable_web_page_preview": true,
                        "reply_to_message_id": body.message.message_id,
                }
                postTelegram(sendMessage)
        } else {
                if (body.message.reply_to_message.from.id == Const.botId || body.message.text.indexOf("@sakuramiyabot") >= 0) {
                        body.message.text = body.message.text.replace("@sakuramiyabot", "")
                        if (body.message.text == null) {
                                body.message.text = "你好"
                        }
                        var request = {
                                "appid": "e2cdab56b20a035c8627f8016a5d685f",
                                "userid": "user",
                                "spoken": body.message.text
                        }
                        var data = {
                                'contentType': 'application/json',
                                "method": "post",
                                "payload": JSON.stringify(request)
                        }
                        var response = UrlFetchApp.fetch("https://api.ownthink.com/bot?", data);
                        var res = JSON.parse(response);
                        if (res.data.info.text.indexOf("小思") >= 0) {
                                res.data.info.text = res.data.info.text.replace("小思", "呀呀")
                        }
                        var sendMessage = {
                                "method": "sendMessage",
                                "chat_id": body.message.chat.id,
                                "text": res.data.info.text,
                                "disable_web_page_preview": true,
                                "reply_to_message_id": body.message.message_id,
                        }
                        postTelegram(sendMessage)
                }
        }
}
