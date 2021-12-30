function callNetEase(body) {

    if (body.message) {
        var text = body.message.text
        var param = text.trim().split(" "); // remove empty strings
        param = param.filter(function(para) {
            if (para) {
                return true;
            }
        });
        if (param[0]) {
            if (param[1]) {


                if (param[2] || param[3] || param[4] || param[5]) {
                    param[1] += param[3] += param[4] += param[5]
                }

                var Const = {}
                Const.netEaseLink = "https://music-api.heheda.top/"
                Const.searchParam = "search?keywords=" + param[1]
                var req = UrlFetchApp.fetch(Const.netEaseLink + Const.searchParam)
                var res = JSON.parse(req)
                var buttons = []
                var button = []
                for (var i = 0; i < 10; i++) {
                    button[i] = {
                        text: i + 1,
                        callback_data: "netEaseSong:" + res.result.songs[i].id
                    }
                    buttons.push(button[i])
                }
                var page2 = {
                    text: "Next Page",
                    callback_data: "netEasePg2:" + param[1]
                }
                buttons.push(page2)
                var sendMsg = {
                    "method": "sendMessage",
                    "chat_id": body.message.chat.id,
                    "reply_to_message_id": body.message.message_id,
                    "parse_mode": "Markdown",
                    "text": "",
                    "disable_web_page_preview": true,
                    "reply_markup": generateInlineKeyboardMarkup(buttons, 5)
                }
                sendMsg.text = "┌ *Result 结果* :-   *Total : 10 /" + res.result.songs.length + "*\n" +
                    "├ 1 " + res.result.songs[0].name + "\n" + "│ └" + res.result.songs[0].artists[0].name + "\n" +
                    "├ 2 " + res.result.songs[1].name + "\n" + "│ └ " + res.result.songs[1].artists[0].name + "\n" +
                    "├ 3 " + res.result.songs[2].name + "\n" + "│ └ " + res.result.songs[2].artists[0].name + "\n" +
                    "├ 4 " + res.result.songs[3].name + "\n" + "│ └ " + res.result.songs[3].artists[0].name + "\n" +
                    "├ 5 " + res.result.songs[4].name + "\n" + "│ └ " + res.result.songs[4].artists[0].name + "\n" +
                    "├ 6 " + res.result.songs[5].name + "\n" + "│ └ " + res.result.songs[5].artists[0].name + "\n" +
                    "├ 7 " + res.result.songs[6].name + "\n" + "│ └ " + res.result.songs[6].artists[0].name + "\n" +
                    "├ 8 " + res.result.songs[7].name + "\n" + "│ └ " + res.result.songs[7].artists[0].name + "\n" +
                    "├ 9 " + res.result.songs[8].name + "\n" + "│ └ " + res.result.songs[8].artists[0].name + "\n" +
                    "└ 10" + res.result.songs[9].name + "\n" + "     └ " + res.result.songs[9].artists[0].name + "\n" +
                    "\n\n" +
                    "_免责声明_\n音乐搜索功能基与[跨站请求伪造](https://zh.m.wikipedia.org/wiki/%E8%B7%A8%E7%AB%99%E8%AF%B7%E6%B1%82%E4%BC%AA%E9%80%A0)， 配合[第三方接口](https://binaryify.github.io/NeteaseCloudMusicApi/#/)，调用网易云音乐官方API。"
                return sendMsg;
            } else {
                var sendMsg = {
                    "method": "sendMessage",
                    "chat_id": body.message.chat.id,
                    "reply_to_message_id": body.message.message_id,
                    "parse_mode": "Markdown",
                    "text": "unable to request NetEase Music: Bad request; not enough title to  search."
                }
                return sendMsg;
            }
        }
    } else if (body.callback_query) {
        if (body.callback_query) {
            if (body.callback_query.data.indexOf("netEaseSong:") >= 0) {
                var send_cb = {
                    "method": "sendMessage",
                    "chat_id": body.callback_query.message.chat.id,
                    "text": "Please wait a second while the bot is sync data from NetEase Music API.\nSong - " + body.callback_query.data.slice(12),
                    "parse_mode": "Markdown",
                    "disable_web_page_preview": true,
                }
                var wait = postTelegram(send_cb)
                var req = UrlFetchApp.fetch("https://music-api.heheda.top/song/url?id=" + body.callback_query.data.slice(12) + "&realIP=127.0.0.1")
                var res = JSON.parse(req)
                Logger.log(res)
                var audio = res.data[0].url
                var buttons = [] 
                var button1 = {
                    text: "Lyric 歌词",
                    callback_data: "netEaseLyric:" + res.data[0].id                   
                }
                var button2 = {
                    text: "网易云音乐",
                    url: "https://music.163.com/#/song?id=" + res.data[0].id
                } 
                buttons.push(button1)
                buttons.push(button2)
                if (audio != null) {

                    var sendAudio = {
                        "method": "sendAudio",
                        "chat_id": body.callback_query.message.chat.id,
                        "audio": audio, 
                        "parse_mode": "Markdown", 
                        "caption": getMentionName(body.callback_query.from) + " 这是你要的音乐! (ᗒᗨᗕ) ", 
                        "reply_markup": generateInlineKeyboardMarkup(buttons, 2)
                    }
                    postTelegram(sendAudio)
                    if(wait.ok == true){
                        var deleteWaitPayload = {
                            "method": "deleteMessage",
                            "chat_id": wait.result.chat.id,
                            "message_id": wait.result.message_id
                           
                        }
                        postTelegram(deleteWaitPayload)
                    } 
                } else {
                    var send_cb = {
                        "method": "sendMessage",
                        "chat_id": body.callback_query.message.chat.id,
                        "reply_to_message_idd": body.callback_query.message.message_id,
                        "text": "status_code: 200; unable to get music url; Bad request; no enough permission to get.",
                        "parse_mode": "markdown",
                        "disable_web_page_preview": false,
                    };
                    return send_cb
                }
            } else if(body.callback_query.data.indexOf("netEaseLyric") >= 0){
                var send_cb = {
                    "method": "sendMessage",
                    "chat_id": body.callback_query.message.chat.id,
                    "text": "Please wait a second while the bot is sync data from NetEase Music API.\nLyrics - 8" + body.callback_query.data.slice(13),
                    "parse_mode": "Markdown",
                    "disable_web_page_preview": true,
                }
                var wait = postTelegram(send_cb)
                var req = UrlFetchApp.fetch("https://music-api.heheda.top/lyric?id=" + body.callback_query.data.replace("netEaseLyric:", "" ))
                var res = JSON.parse(req)
                var lyrics = escapeMarkDown(res.lrc.lyric)           
                if (lyrics != null) {
                    if(wait.ok == true){
                        var deleteWaitLyricPayload = {
                            "method": "editMessageText",
                            "chat_id": wait.result.chat.id,
                            "message_id": wait.result.message_id,
                            "text": lyrics,
                            "parse_mode": "markdown",
                            "disable_web_page_preview": false,
                        };
                        postTelegram(deleteWaitLyricPayload)
                    }                    
                }
            }  else if(body.callback_query.data.indexOf("netEasePg1") >=0){
                body.callback_query.data = body.callback_query.data.replace("netEasePg1:", "" )
                body.callback_query.data = body.callback_query.data.replace("netEasePg2:", "" )
                body.callback_query.data = body.callback_query.data.replace("netEasePg3:", "" )
                var req = UrlFetchApp.fetch("https://music-api.heheda.top/search?keywords=" + body.callback_query.data)
                var res = JSON.parse(req)
                var buttons = []
                var button = []
                for (var i = 0; i < 10; i++) {
                    button[i] = {
                        text: i +	1,
                        callback_data: "netEaseSong:" + res.result.songs[i].id
                    }
                    buttons.push(button[i])
                }
                var page2 = {
                    text: "Next Page",
                    callback_data: "netEasePg2:" + body.callback_query.data.replace("netEasePg1:", "") 
                }
                buttons.push(page2)
                    if(res.result){
                        var sendMsg = {
                            "method": "editMessageText",
                            "chat_id": body.callback_query.message.chat.id,
                            "message_id": body.callback_query.message.message_id,
                            "parse_mode": "Markdown",
                            "text": "",
                            "disable_web_page_preview": true,
                            "reply_markup": generateInlineKeyboardMarkup(buttons, 5)
                        }
                        sendMsg.text = "┌ *Result 结果* :-   *Total : 10 /  " + res.result.songs.length + "*\n" +
                        "├ 1 " + res.result.songs[0].name + "\n" + "│ └" + res.result.songs[0].artists[0].name + "\n" +
                        "├ 2 " + res.result.songs[1].name + "\n" + "│ └ " + res.result.songs[1].artists[0].name + "\n" +
                        "├ 3 " + res.result.songs[2].name + "\n" + "│ └ " + res.result.songs[2].artists[0].name + "\n" +
                        "├ 4 " + res.result.songs[3].name + "\n" + "│ └ " + res.result.songs[3].artists[0].name + "\n" +
                        "├ 5 " + res.result.songs[4].name + "\n" + "│ └ " + res.result.songs[4].artists[0].name + "\n" +
                        "├ 6 " + res.result.songs[5].name + "\n" + "│ └ " + res.result.songs[5].artists[0].name + "\n" +
                        "├ 7 " + res.result.songs[6].name + "\n" + "│ └ " + res.result.songs[6].artists[0].name + "\n" +
                        "├ 8 " + res.result.songs[7].name + "\n" + "│ └ " + res.result.songs[7].artists[0].name + "\n" +
                        "├ 9 " + res.result.songs[8].name + "\n" + "│ └ " + res.result.songs[8].artists[0].name + "\n" +
                        "└ 10" + res.result.songs[9].name + "\n" + "     └ " + res.result.songs[9].artists[0].name + "\n" +
                        "\n\n" +
                        "_免责声明_\n音乐搜索功能基与[跨站请求伪造](https://zh.m.wikipedia.org/wiki/%E8%B7%A8%E7%AB%99%E8%AF%B7%E6%B1%82%E4%BC%AA%E9%80%A0)， 配合[第三方接口](https://binaryify.github.io/NeteaseCloudMusicApi/#/)，调用网易云音乐官方API。"
                        return sendMsg;
                    }
            } else if(body.callback_query.data.indexOf("netEasePg2") >=0){
                body.callback_query.data = body.callback_query.data.replace("netEasePg1:", "" )
                body.callback_query.data = body.callback_query.data.replace("netEasePg2:", "" )
                body.callback_query.data = body.callback_query.data.replace("netEasePg3:", "" )
                var req = UrlFetchApp.fetch("https://music-api.heheda.top/search?keywords=" + body.callback_query.data)
                var res = JSON.parse(req)
                var buttons = []
                var button = []
                for (var i = 0; i < 10; i++) {
                    button[i] = {
                        text: i + 10,
                        callback_data: "netEaseSong:" + res.result.songs[i + 9].id
                    }
                    buttons.push(button[i])
                }
                var page1 = {
                    text: "Last Page",
                    callback_data: "netEasePg1:" + body.callback_query.data
                }
                var page3 = {
                    text: "Next Page",
                    callback_data: "netEasePg3:" + body.callback_query.data
                }
                buttons.push(page1)
                buttons.push(page3)
                    if(res.result){
                        var sendMsg = {
                            "method": "editMessageText",
                            "chat_id": body.callback_query.message.chat.id,
                            "message_id": body.callback_query.message.message_id,
                            "parse_mode": "Markdown",
                            "text": "",
                            "disable_web_page_preview": true,
                            "reply_markup": generateInlineKeyboardMarkup(buttons, 5)
                        }
                        sendMsg.text = "┌ *Result 结果* :-   *Total : 20 /  " + res.result.songs.length + "*\n" +
                        "├ 11 " + res.result.songs[10].name + "\n" + "│ └" + res.result.songs[0].artists[0].name + "\n" +
                        "├ 12 " + res.result.songs[11].name + "\n" + "│ └ " + res.result.songs[11].artists[0].name + "\n" +
                        "├ 13 " + res.result.songs[12].name + "\n" + "│ └ " + res.result.songs[12].artists[0].name + "\n" +
                        "├ 14 " + res.result.songs[13].name + "\n" + "│ └ " + res.result.songs[13].artists[0].name + "\n" +
                        "├ 15 " + res.result.songs[14].name + "\n" + "│ └ " + res.result.songs[14].artists[0].name + "\n" +
                        "├ 16 " + res.result.songs[15].name + "\n" + "│ └ " + res.result.songs[15].artists[0].name + "\n" +
                        "├ 17 " + res.result.songs[16].name + "\n" + "│ └ " + res.result.songs[16].artists[0].name + "\n" +
                        "├ 18 " + res.result.songs[17].name + "\n" + "│ └ " + res.result.songs[17].artists[0].name + "\n" +
                        "├ 19 " + res.result.songs[18].name + "\n" + "│ └ " + res.result.songs[18].artists[0].name + "\n" +
                        "└ 20" + res.result.songs[19].name + "\n" + "     └ " + res.result.songs[19].artists[0].name + "\n" +
                        "\n\n" +
                        "_免责声明_\n音乐搜索功能基与[跨站请求伪造](https://zh.m.wikipedia.org/wiki/%E8%B7%A8%E7%AB%99%E8%AF%B7%E6%B1%82%E4%BC%AA%E9%80%A0)， 配合[第三方接口](https://binaryify.github.io/NeteaseCloudMusicApi/#/)，调用网易云音乐官方API。"
                        return sendMsg;
                    }
            }  else if(body.callback_query.data.indexOf("netEasePg3") >=0){
                body.callback_query.data = body.callback_query.data.replace("netEasePg1:", "" )
                body.callback_query.data = body.callback_query.data.replace("netEasePg2:", "" )
                body.callback_query.data = body.callback_query.data.replace("netEasePg3:", "" ) 
                var req = UrlFetchApp.fetch("https://music-api.heheda.top/search?keywords=" + body.callback_query.data)
                var res = JSON.parse(req)
                var buttons = []
                var button = []
                for (var i = 0; i < 10; i++) {
                    button[i] = {
                        text: i + 20,
                        callback_data: "netEaseSong:" + res.result.songs[i + 19].id
                    }
                    buttons.push(button[i])
                }
                var page2 = {
                    text: "Last Page",
                    callback_data: "netEasePg2:" + body.callback_query.data
                }
                buttons.push(page1)
                    if(res.result){
                        var sendMsg = {
                            "method": "editMessageText",
                            "chat_id": body.callback_query.message.chat.id,
                            "message_id": body.callback_query.message.message_id,
                            "parse_mode": "Markdown",
                            "text": "",
                            "disable_web_page_preview": true,
                            "reply_markup": generateInlineKeyboardMarkup(buttons, 5)
                        }
                        sendMsg.text = "┌ *Result 结果* :-   *Total : 30 /  " + res.result.songs.length + "*\n" +
                        "├ 21 " + res.result.songs[20].name + "\n" + "│ └" + res.result.songs[20].artists[0].name + "\n" +
                        "├ 22 " + res.result.songs[21].name + "\n" + "│ └ " + res.result.songs[21].artists[0].name + "\n" +
                        "├ 23 " + res.result.songs[22].name + "\n" + "│ └ " + res.result.songs[22].artists[0].name + "\n" +
                        "├ 24 " + res.result.songs[23].name + "\n" + "│ └ " + res.result.songs[23].artists[0].name + "\n" +
                        "├ 25 " + res.result.songs[24].name + "\n" + "│ └ " + res.result.songs[24].artists[0].name + "\n" +
                        "├ 26 " + res.result.songs[25].name + "\n" + "│ └ " + res.result.songs[25].artists[0].name + "\n" +
                        "├ 27 " + res.result.songs[26].name + "\n" + "│ └ " + res.result.songs[26].artists[0].name + "\n" +
                        "├ 28 " + res.result.songs[27].name + "\n" + "│ └ " + res.result.songs[27].artists[0].name + "\n" +
                        "├ 29 " + res.result.songs[28].name + "\n" + "│ └ " + res.result.songs[28].artists[0].name + "\n" +
                        "└ 30" + res.result.songs[29].name + "\n" + "     └ " + res.result.songs[29].artists[0].name + "\n" +
                        "\n\n" +
                        "_免责声明_\n音乐搜索功能基与[跨站请求伪造](https://zh.m.wikipedia.org/wiki/%E8%B7%A8%E7%AB%99%E8%AF%B7%E6%B1%82%E4%BC%AA%E9%80%A0)， 配合[第三方接口](https://binaryify.github.io/NeteaseCloudMusicApi/#/)，调用网易云音乐官方API。"
                        return sendMsg;
                    }
            }
        }
    }
}
