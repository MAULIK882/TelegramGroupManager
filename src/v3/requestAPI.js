function requestApi(body) {
        var text = body.message.text
        var data = {
                'contentType': 'application/json',
                "method": "get"
        };
        var response, res, method, reqParam2, link, sendText;
        link = Const.TianLink
        if (text.indexOf("文案") >= 0 || text.indexOf("朋友圈") >= 0) {
                method = "pyqwenan"
        } else if (text.indexOf("诗") >= 0) {
                method = "verse"
        } else if (text.indexOf("舔狗") >= 0) {
                method = "tiangou"
        } else if (text.indexOf("emo") >= 0 || text.indexOf("分手") >= 0) {
                method = "hsjz"
        } else if (text.indexOf("语录") === 0 && text.indexOf("个") >= 0) {
                method = "mnpara"
        } else if (text.indexOf("马屁") >= 0) {
                method = "caihongpi"
        } else if (text.indexOf("毒鸡汤") >= 0 || text.indexOf("现实") >= 0 || text.indexOf("扎心") >= 0) {
                method = "dujitang"
        } else if (text.indexOf("顺口溜") >= 0) {
                method = "sql"
        } else if (text.indexOf("情诗") >= 0 || text.indexOf("爱情") >= 0 || text.indexOf("爱情语录") >= 0) {
                method = "qingshi"
        } else if (body.message.reply_to_message.text.indexOf("音乐，歌词，歌手！") >= 0) {
                callNetEase(body)
        } else {
                aiChat(body)
        }
        response = UrlFetchApp.fetch(link + method + "/index?key=" + Const.APIToken, data)
        res = JSON.parse(response)
        if (res.code == 200) {
                var sendText = res.newslist[0].content
        } else if (res.code != 200) {
                var sendText = "failed to request API: unable to request API: Bad Request; error code:" + res.code + "error message: " + res.msg
        }
        var sendMsg = {
                "method": "sendMessage",
                "chat_id": body.message.chat.id,
                "reply_to_message_id": body.message.message_id,
                "text": "Please wait a second while the bot was synchronize the API calling data."
        }
        var edit = postTelegram(sendMsg)
        if (edit.ok == true) {
                var sendApiData = {
                        "method": "editMessageText",
                        "chat_id": edit.result.chat.id,
                        "message_id": edit.result.message_id,
                        "text": sendText
                }
                return sendApiData
        }
}
