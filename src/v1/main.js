var Const = {}
//改token
Const.botToken = "1234abcd"
/** Execute getUpdatesWebhook once there is an unknown error to get the original incoming e message from back-end of Telegram **/
function getUpdatesWebhook() {
    var res = UrlFetchApp.fetch('api.telegram.org/bot' + Const.botToken + '/getUpdates')
    Logger.log(res)
}
/** use to delete webhook **/
function deleteWebhook() {
    var res = UrlFetchApp.fetch('api.telegram.org/bot' + Const.botToken + '/deleteWebhook')
    Logger.log(res)
}
function debug() {
	debug()
}
function doGet(e) {
	return HtmlService.createHtmlOutput("Hello World!! No, this link should be hidden!!!");
}
function isPrivate(body) {
    var chat = body.message.chat;
        if (chat.type === "private") {
            return true;
        }
        return false;
}
function isAdminOrCreator(userId, chatId) {
    var payload = {
        "method": "getChatMember",
        "chat_id": chatId,
        "user_id": userId
    };
    /* allow manho
    if (userId === Const.myId){
        return true;
    }
    */
    var chatMember = postTelegram(payload);
    if (chatMember && chatMember.ok === true) {
        if (chatMember.result.status == "creator") {
        return true;
        }
        if (chatMember.result.status == "administrator") {
        return true;
        }
    }
    return false;
}
function doPost(e) {
	var body = JSON.parse(e.postData.contents);
	Logger.log(body)
	var payload = preparePayload(body);
	if (Array.isArray(payload)) {
		payloads = payload;
	} else {
		payloads = [payload]
	}
	for (var i = 0; i < payloads.length; i++) {
		payload = payloads[i];
		if (payload) {
			var handleResponseCallBack = null;
			var delay = 0;
			if (payload.callback) {
				handleResponseCallBack = payload.callback;
				delete payload.callback;
			}
			if (payload.delay) {
				delay = payload.delay;
				delete payload.delay;
			}
			var res = postTelegram(payload);
			if (handleResponseCallBack) {
				handleResponseCallBack(res);
			}
		}
	}
}
function postTelegram(payload){

var data = {
    'contentType': 'application/json',
    "method": "post",
    "muteHttpExceptions": true,
    "payload": JSON.stringify(payload)
};
var response, res;
  
    try {
        response = UrlFetchApp.fetch("https://api.telegram.org/bot" + Const.botToken + "/", data);
        res = JSON.parse(response);
        Logger.log(res)
    return res;
    } catch (e) {
        var req = {
            "method": "sendMessage",
            "chat_id": "" ,
            "text": `Error Log:\n\n ${e}`         
        } 
        var data = {
            'contentType': "application/json",
            'method': "post",
            'payload': req
        }
        UrlFetchApp.fetch("https://api.telegram.org/bot" + Const.botToken + "/", data);
    }
}


function getName(user) {
	var name = user.first_name;
	if (user.last_name) {
		name += " " + user.last_name;
	}
	return name;
}

function escapeMarkDown(toEscapeMsg) {
	var escapedMsg = toEscapeMsg.replace(/_/g, "\\_")
		.replace(/\*/g, "\\*")
		.replace(/\[/g, "\\[")
		.replace(/`/g, "\\`")
	return escapedMsg;
}

function getMentionName(user) {
	var username = user.username;
	var mentionName = "";
	var name = getName(user);
	if (!name) {
		name = "神秘人";
	}
	mentionName = getMarkDownUserUrl(escapeMarkDown(name), user.id);
	return mentionName;
}

function getMarkDownUserUrl(userName, userId) {
	return "[" + userName + "](tg://user?id=" + userId + ")";
}

function randomIntFromInterval(min, max) {
	// min and max included 
	return Math.floor(Math.random() * (max - min + 1) + min)
}

function preparePayload(body) {
	var helpButton, addGrpButton, add, para, time, newData, data, isRepliedAnAdmin, isAdmin;
	var payloads = [];
	var inlineKeyboardMarkup = {};
	inlineKeyboardMarkup.inline_keyboard = [];
	var keyboardRow, keyboardRow2, keyboardRow3 = [];
	var res;
	var question1 = randomIntFromInterval(10, 150);
	var question2 = randomIntFromInterval(100, 150);
	var answer = question1 + question2
	var n1 = answer + 1;
	var n2 = answer + 2;
	var n3 = answer - 1;
	var n4 = answer;
	var n5 = answer - 2;
	var helpButton = {
		text: "Help",
		callback_data: "help_menu"
	};
	var addGrpButton = {
		text: "Add me to your groups",
		url: "https://telegram.me/sakuramiyabot?startgroup=true"
	};
	if (body.message) {
		body.message.chat.id = body.message.chat.id + '';
	}
	if (body.callback_query) {
		var back_butt = {
			text: "Back",
			callback_data: "help_menu"
		};
		var back_text = {
			text: "Back",
			callback_data: "back-text"
		};
		var ban_butt = {
			text: "Ban",
			callback_data: "ban-menu"
		};
		var mute_butt = {
			text: "Mute",
			callback_data: "mute-menu"
		};
		var pin_butt = {
			text: "Pin",
			callback_data: "pin-menu"
		};
		var send_cb = {
			"method": "sendMessage",
			"chat_id": body.callback_query.message.chat.id,
			"text": "这是一个 callback",
			"parse_mode": "Markdown",
			"disable_web_page_preview": true,
		};
		var answer_cb = {
			"method": "answerCallbackQuery",
			"callback_query_id": body.callback_query.id,
			"text": "answerCallbackQuery",
			"show_alert": false
		};
		var edit_cb = {
			"method": "editMessageText",
			"chat_id": body.callback_query.message.chat.id,
			"message_id": body.callback_query.message.message_id,
			"text": "",
			"parse_mode": "markdown",
			"disable_web_page_preview": false,
		};
		if (body.callback_query.data.indexOf("help_menu") === 0) {
			edit_cb.text = "Hey! My name is Miya. I am a group management bot, here to help you get around and keep the order in your groups!" + "I have lots of handy features, such as groups member control , a muting system, " + "and more features about to manage your groups.";
			/** Use to prepare a inline Keboard **/
			var inlineKeyboardMarkup = {};
			inlineKeyboardMarkup.inline_keyboard = [];
			var keyboardRow = [];
			var keyboardRow2 = [];
			var keyboardRow3 = [];
			keyboardRow.push(ban_butt);
			keyboardRow.push(mute_butt);
			keyboardRow2.push(pin_butt);
			keyboardRow3.push(back_text);
			inlineKeyboardMarkup.inline_keyboard.push(keyboardRow);
			inlineKeyboardMarkup.inline_keyboard.push(keyboardRow2);
			inlineKeyboardMarkup.inline_keyboard.push(keyboardRow3);
			edit_cb.reply_markup = inlineKeyboardMarkup;
			payloads.push(edit_cb);
			answer_cb.text = "You have entered to help menu."
			payloads.push(answer_cb);
			return payloads;
		}
		if (body.callback_query.data.indexOf("ban-menu") === 0) {
			edit_cb.text = "" + "*Ban Command*(Reply)\n" + "/ban - Ban a user.\n" + "/dban - Ban a user by reply, and delete their message.\n" + "/sban - Silently ban a user, and delete your message.\n" + "/unban - Unban a user." + "\n\n" + "- /kick - Kick a user.\n" + "/dkick - Kick a user by reply, and delete their message.\n" + "/skick - Silently kick a user, and delete your message.";
			var inlineKeyboardMarkup = {};
			inlineKeyboardMarkup.inline_keyboard = [];
			var keyboardRow = [];
			var keyboardRow2 = [];
			var keyboardRow3 = [];
			keyboardRow.push(ban_butt);
			keyboardRow.push(mute_butt);
			keyboardRow2.push(pin_butt);
			keyboardRow3.push(back_butt);
			inlineKeyboardMarkup.inline_keyboard.push(keyboardRow3);
			inlineKeyboardMarkup.inline_keyboard.push(keyboardRow);
			inlineKeyboardMarkup.inline_keyboard.push(keyboardRow2);
			edit_cb.reply_markup = inlineKeyboardMarkup;
			answer_cb.text = "You have entered to /kick menu."
			payloads.push(edit_cb);
			payloads.push(answer_cb);
			return payloads;
		}
		if (body.callback_query.data.indexOf("mute-menu") === 0) {
			edit_cb.text = "" + "*Mute Command*(Reply)\n" + "/mute - Mute a user.\n" + "/dmute - Mute a user by reply, and delete their message.\n" + "/smute - Silently mute a user, and delete your message.\n" + "/unmute - Unmute a user.\n" + "- /rmute - Mute a user for random until time.\n" + "/tmute - Mute a user by reply, provide two number , Miya will mute that user for the time in two number range.\n" + "Example:\n==> /tmute 60 180" + "\n\nThat user will get ban random seconds in range (60 and 180).";
			var inlineKeyboardMarkup = {};
			inlineKeyboardMarkup.inline_keyboard = [];
			var keyboardRow = [];
			var keyboardRow2 = [];
			var keyboardRow3 = [];
			keyboardRow.push(ban_butt);
			keyboardRow.push(mute_butt);
			keyboardRow2.push(pin_butt);
			keyboardRow3.push(back_butt);
			inlineKeyboardMarkup.inline_keyboard.push(keyboardRow3);
			inlineKeyboardMarkup.inline_keyboard.push(keyboardRow);
			inlineKeyboardMarkup.inline_keyboard.push(keyboardRow2);
			edit_cb.reply_markup = inlineKeyboardMarkup;
			answer_cb.text = "You have entered to mute menu."
			payloads.push(edit_cb);
			payloads.push(answer_cb);
			return payloads;;
		}
		if (body.callback_query.data.indexOf("pin-menu") === 0) {
			edit_cb.text = "" + "*Pin Command*(Reply)\n" + "/pin - Pin a message.\n" + "/spin - Silently pin a message by reply, and delete your message.\n" + "/unpin - Unpin a message.\n" + "/unpinall - Unpin all message.";
			var inlineKeyboardMarkup = {};
			inlineKeyboardMarkup.inline_keyboard = [];
			var keyboardRow = [];
			var keyboardRow2 = [];
			var keyboardRow3 = [];
			keyboardRow.push(ban_butt);
			keyboardRow.push(mute_butt);
			keyboardRow2.push(pin_butt);
			keyboardRow3.push(back_butt);
			inlineKeyboardMarkup.inline_keyboard.push(keyboardRow3);
			inlineKeyboardMarkup.inline_keyboard.push(keyboardRow);
			inlineKeyboardMarkup.inline_keyboard.push(keyboardRow2);
			edit_cb.reply_markup = inlineKeyboardMarkup;
			answer_cb.text = "You have entered to pin menu."
			payloads.push(edit_cb);
			payloads.push(answer_cb);
			return payloads;
		}
		if (body.callback_query.data.indexOf("back-text") === 0) {
			edit_cb.text = "Hi there! " + getMentionName(body.callback_query.from) + "\nMy name is Miya - I'm here to help you manage your groups! Hit /help to find out more about how to use me to my full potential."
			var keyboardRow = [];
			var keyboardRow2 = [];
			keyboardRow.push(helpButton);
			keyboardRow2.push(addGrpButton);
			inlineKeyboardMarkup.inline_keyboard.push(keyboardRow);
			inlineKeyboardMarkup.inline_keyboard.push(keyboardRow2);
			edit_cb.reply_markup = inlineKeyboardMarkup;
			answer_cb.text = "You have returned."
			payloads.push(edit_cb);
			payloads.push(answer_cb);
			return payloads;;
		}
		if (body.callback_query.data.indexOf("confirm") === 0) {
			edit_cb.text = "Please make a double confirm.It's a danger action.\n\n" + "The all pinned message will no longer pinned.\n\n" + "If not, choose ❌ instead.";
			var inlineKeyboardMarkup = {};
			inlineKeyboardMarkup.inline_keyboard = [];
			var keyboardRow = []
			var keyboardRow2 = [];
			var double_confirm = {
				text: "✅",
				callback_data: "double_confirm"
			};
			var cancel = {
				text: "❌",
				callback_data: "cancel"
			};
			keyboardRow.push(cancel);
			keyboardRow.push(double_confirm);
			inlineKeyboardMarkup.inline_keyboard.push(keyboardRow);
			edit_cb.reply_markup = inlineKeyboardMarkup;
			answer_cb.text = "Please make a double confirm!"
			payloads.push(edit_cb)
			payloads.push(answer_cb)
			return payloads;
		}
		if (body.callback_query.data.indexOf("double_confirm") === 0) {
			isAdmin = isAdminOrCreator(body.callback.from.id, body.callback_query.message.chat.id)
			if (isAdmin) {
				var unpinall = {
					"method": "unpinAllChatMessages",
					"chat_id": body.callback_query.message.chat.id,
				};
				edit_cb.text = "All pinned messages have been unpinned.";
				answer_cb.text = "All pinned messages have been unpinned.";
				postTelegram(unpinall)
				postTelegram(edit_cb)
				postTelegram(answer_cb)
			} else {
				answer_cb.text = "This can only use by an admin.";
				postTelegram(answer_cb)
			}
		}
		if (body.callback_query.data.indexOf("cancel") === 0) {
			edit_cb.text = "Unpin of all pinned messages has been cancelled."
			postTelegram(edit_cb)
		}
		if (body.callback_query.data.indexOf("wrong") >= 0) {
			var data = body.callback_query.data.trim().split(" ")
			//check is the user or other user click. 
			if (data[1] == body.callback_query.from.id) {
				edit_cb.text = "❌❌Wrong answers!!!!\n" + getMentionName(body.callback_query.from) + "Unsuccessful to complete the verification and have been kicked out.";
				var kick_cb = {
					"method": 'kickChatMember',
					"chat_id": body.callback_query.message.chat.id,
					"user_id": data[1],
				}
				postTelegram(edit_cb)
				postTelegram(kick_cb)
			} else {
				answer_cb.text = "Im not asking you... " + data[1] + "😡\nYou are passionate";
				answer_cb.show_alert = true;
				postTelegram(answer_cb)
			}
		}
		if (body.callback_query.data.indexOf("true") === 0) {
			edit_cb.text = "Hi !" + getMentionName(body.callback_query.from) + "welcome to join this group!";
			var data = body.callback_query.data.trim().split(" ")
			//check is the user click or other idiots. 
			if (body.callback_query.from.id == data[1]) {
				var unmute = {
					"method": 'restrictChatMember',
					"chat_id": body.callback_query.message.chat.id,
					"user_id": data[1],
					"can_send_messages": true,
					"can_send_media_messages": true,
					"can_send_other_messages": true,
					"can_add_web_page_previews": true
				};
				postTelegram(edit_cb)
				postTelegram(unmute)
			} else {
				answer_cb.text = "Im not asking you... \nEven you get a correct answer instead you are a passionate";
				answer_cb.show_alert = true;
				postTelegram(answer_cb)
			}
		}
		if (body.callback_query.data.indexOf("adminpass") >= 0) {
			//callback data included name n userid that need approval. 
			data = body.callback_query.data.trim().split(" ")
			var name = data[2]
			var ids = data[1]
			var isAdmin = isAdminOrCreator(body.callback_query.from.id, body.callback_query.message.chat.id)
			if (isAdmin) {
				edit_cb.text = "[" + name + "](tg://user?id=" + ids + ") have been approved by an admin";
				//unmute the user instead if the admin pased.
				var unmute = {
					"method": 'restrictChatMember',
					"chat_id": body.callback_query.message.chat.id,
					"user_id": data[1],
					"can_send_messages": true,
					"can_send_media_messages": true,
					"can_send_other_messages": true,
					"can_add_web_page_previews": true
				};
				postTelegram(unmute)
				postTelegram(edit_cb)
			} else {
				answer_cb.text = "Im not asking you...\nYou are passionate";
				answer_cb.show_alert = true;
				postTelegram(edit_cb)
			}
		}
		if (body.callback_query.data.indexOf("adminreject") >= 0) {
			var data = body.callback_query.data.trim().split(" ")
			var isAdmin = isAdminOrCreator(body.callback_query.from.id, body.callback_query.message.chat.id)
			if (isAdmin) {
				edit_cb.text = "An admin reject the request of [" + data[2] + "](tg://user?id=" + data[1] + ")and have been kicked out. ";
				var kick = {
					//kick the chat member instead admin have rejected. 
					"method": "kickChatMember",
					"chat_id": body.callback_query.message.chat.id,
					"user_id": data[1]
				}
				postTelegram(kick)
				postTelegram(edit_cb)
			} else {
				answer_cb.text = "Im not asking you...\nYou are passionate";
				answer_cb.show_alert = true;
				postTelegram(answer_cb)
			}
		}
	}
	if (body.message.new_chat_member) {
		if (body.message.new_chat_member.id != 1932532833) {
			var sd = {
				"method": "sendMessage",
				"chat_id": body.message.chat.id,
				"text": "Hi " + getMentionName(body.message.new_chat_member) + "!\nPlease complete the test given.Otherwise you will get mute.\n\n\n" + question1 + "+" + question2 + "=❓❓",
				"parse_mode": "Markdown"
			};
			var mute = {
				"method": 'restrictChatMember',
				"chat_id": body.message.chat.id,
				"user_id": body.message.new_chat_member.id,
				"can_send_messages": false,
				"can_send_media_messages": false,
				"can_send_other_messages": false,
				"can_add_web_page_previews": false
			};
			var delMsg = {
				"method": "deleteMessage",
				"chat_id": body.message.chat.id,
				"message_id": body.message.message_id
			};
			var inlineKeyboardMarkup = {};
			inlineKeyboardMarkup.inline_keyboard = [];
			var keyboardRow = [];
			var keyboardRow5 = [];
			var keyboardRow2 = [];
			var keyboardRow3 = [];
			var keyboardRow4 = [];
			var keyboardRow6 = [];
			var q1 = {
				text: n1,
				callback_data: "wrong1 " + body.message.new_chat_member.id + " " + body.message.new_chat_member.first_name
			};
			var q2 = {
				text: n2,
				callback_data: "wrong2 " + body.message.new_chat_member.id + " " + body.message.new_chat_member.first_name
			};
			var q3 = {
				text: n3,
				callback_data: "wrong3 " + body.message.new_chat_member.id + " " + body.message.new_chat_member.first_name
			};
			var q4 = {
				text: n4,
				callback_data: "true " + body.message.new_chat_member.id + " " + body.message.new_chat_member.first_name
			};
			var q5 = {
				text: n5,
				callback_data: "wrong5 " + body.message.new_chat_member.id + " " + body.message.new_chat_member.first_name
			};
			var manualpass = {
				text: "Manual approve",
				callback_data: "adminpass " + body.message.new_chat_member.id + " " + body.message.new_chat_member.first_name
			};
			var manualreject = {
				text: "Manual reject",
				callback_data: "adminreject " + body.message.new_chat_member.id + " " + body.message.new_chat_member.first_name
			};
			keyboardRow.push(q1);
			keyboardRow.push(q2);
			keyboardRow.push(q3);
			keyboardRow.push(q4);
			keyboardRow.push(q5);
			keyboardRow2.push(manualpass);
			keyboardRow2.push(manualreject);
			inlineKeyboardMarkup.inline_keyboard.push(keyboardRow);
			inlineKeyboardMarkup.inline_keyboard.push(keyboardRow2);
			sd.reply_markup = inlineKeyboardMarkup;
			postTelegram(delMsg)
			postTelegram(mute)
			postTelegram(sd)
		} else {
			var sd = {
				"method": "sendMessage",
				"chat_id": body.message.chat.id,
				"text": "",
				"parse_mode": "Markdown"
			};
			sd.text = "Thanks for adding me to your groups! Promote me as an admin i can got more features!. "
			postTelegram(sd)
		}
	}
	/** delete the pinned message **/
	if (body.message.pinned_message) {
		var delMsg = {
			"method": "deleteMessage",
			"chat_id": body.message.chat.id,
			"message_id": body.message.message_id
		};
		postTelegram(delMsg)
	}
	/** speak to left chat member **/
	if (body.message.left_chat_member) {
		var sd = {
			"method": "sendMessage",
			"chat_id": body.message.chat.id,
			"text": "Nice knowing you!",
			"parse_mode": "Markdown",
			"reply_to_message_id": body.message.message_id,
			"allow_sending_without_reply": true
		};
		postTelegram(sd)
	}
	/** handle text message **/
	if (body.message.text) {
		body.message.text = body.message.text.toLowerCase();
		body.message.text = body.message.text.replace(/@temptestbot2/g, '');
		/** make it to an array instead it has parameters **/
		var paras = body.message.text.trim().split(" ");
		/** remove empty strings **/
		paras = paras.filter(function(para) {
			if (para) {
				return true;
			}
		});
		if (body.message.text.indexOf("/start") == 0) {
			if (isPrivate(body)) {
				var sendStart = {
					"method": "sendMessage",
					"chat_id": body.message.chat.id,
					"reply_to_message_id": body.message.message_id,
					"parse_mode": "Markdown",
					"text": '',
				}
				sendStart.text = "Hey there! " + getMentionName(body.message.from) + "\nMy name is Miya - I'm here to help you manage your groups! Hit /help to find out more about how to use me to my full potential.";
				postTelegram(sendStart)
			} else {
				var sendStart = {
					"method": "sendMessage",
					"chat_id": body.message.chat.id,
					"reply_to_message_id": body.message.message_id,
					"parse_mode": "Markdown",
					"text": 'Are you sure you want to unpinall messages? ',
				}
				sendStart.text = "Heya :) PM me if you have any questions on how to use me.";
				var inlineKeyboardMarkup = {};
				inlineKeyboardMarkup.inline_keyboard = [];
				var keyboardRow = []
				var button = {
					text: "Check Pm",
					url: "https://telegram.me/sakuramiyabot?start"
				}
				keyboardRow.push(button);
				inlineKeyboardMarkup.inline_keyboard.push(keyboardRow);
				sendStart.reply_markup = inlineKeyboardMarkup;
				postTelegram(sendStart)
			}
		}
		if (body.message.text.indexOf("/help") == 0) {
			if (isPrivate(body)) {
				var sendStart = {
					"method": "sendMessage",
					"chat_id": body.message.chat.id,
					"reply_to_message_id": body.message.message_id,
					"parse_mode": "Markdown",
					"text": "Hi there! " + getMentionName(body.message.from) + "\n\nI am the most completed Bot to help you manage your groups easily and secure.\n\nAdd me to your groups and promote me as an Admin."
				}
				var inlineKeyboardMarkup = {};
				inlineKeyboardMarkup.inline_keyboard = [];
				var keyboardRow = []
				var keyboardRow2 = [];
				var helpButton = {
					text: "Help",
					callback_data: "help_menu"
				};
				var addGrpButton = {
					text: "Add me to your groups",
					url: "https://telegram.me/sakuramiyabot?startgroup=true"
				};
				keyboardRow.push(helpButton);
				keyboardRow2.push(addGrpButton);
				inlineKeyboardMarkup.inline_keyboard.push(keyboardRow);
				inlineKeyboardMarkup.inline_keyboard.push(keyboardRow2);
				sendStart.reply_markup = inlineKeyboardMarkup;
				postTelegram(sendStart)
			} else {
				var sendStart = {
					"method": "sendMessage",
					"chat_id": body.message.chat.id,
					"reply_to_message_id": body.message.message_id,
					"parse_mode": "Markdown",
					"text": 'Please hit the button below.',
				}
				var inlineKeyboardMarkup = {};
				inlineKeyboardMarkup.inline_keyboard = [];
				var keyboardRow = []
				var keyboardRow2 = [];
				var helpButton = {
					text: "Check In Pm✅",
					url: "http://t.me/sakuramiyabot?start=help"
				};
				keyboardRow.push(helpButton);
				inlineKeyboardMarkup.inline_keyboard.push(keyboardRow);
				sendStart.reply_markup = inlineKeyboardMarkup;
				postTelegram(sendStart)
			}
		}
		/**
		Pin
		**/
		if (body.message.text.indexOf("/pin") == 0) {
			isRepliedAnAdmin = isAdminOrCreator(body.message.reply_to_message.from.id, body.message.chat.id)
			isAdmin = isAdminOrCreator(body.message.from.id, body.message.chat.id)
			if (body.message.chat.type != private) {
				if (!isRepliedAnAdmin) {
					if (isAdmin) {
						var sd = {
							"method": "sendMessage",
							"chat_id": body.message.chat.id,
							"text": "Message " + body.message.message_id + " has been pinned.",
							"parse_mode": "Markdown",
							"reply_to_message_id": body.message.message_id,
							"allow_sending_without_reply": true
						};
						var pinMsg = {
							"method": "pinChatMessage",
							"chat_id": body.message.chat.id,
							"message_id": body.message.reply_to_message.message_id,
						};
						postTelegram(sd)
						postTelegram(pinMsg)
					} else {
						var sd = {
							"method": "sendMessage",
							"chat_id": body.message.chat.id,
							"reply_to_message_id": body.message.message_id,
							"text": "Sorry... " + getMentionName(body.message.from) + "this command only can use by an admin.",
							"parse_mode": "Markdown"
						};
						var sd2 = {
							"method": "sendMessage",
							"chat_id": body.message.chat.id,
							"reply_to_message_id": body.message.message_id,
							"text": "Shhh... quiet now.\nMuted " + getMentionName(body.message.reply_to_message.from) + "for 30 minutes due to hit the admin command.",
							"parse_mode": "Markdown"
						};
						var mute = {
							"method": 'restrictChatMember',
							"chat_id": body.message.chat.id,
							"user_id": body.message.reply_to_message.from.id,
							"can_send_messages": false,
							"can_send_media_messages": false,
							"can_send_other_messages": false,
							"can_add_web_page_previews": false,
							"until_date": Date.now() / 1000 + 1800
						};
						postTelegram(sd)
						postTelegram(mute)
						postTelegram(sd2)
					}
				} else {
					var sd = {
						"method": "sendMessage",
						"chat_id": body.message.chat.id,
						"text": "Message " + body.message.message_id + " has been pinned.",
						"parse_mode": "Markdown",
						"reply_to_message_id": body.message.message_id,
						"allow_sending_without_reply": true
					};
					var pinMsg = {
						"method": "pinChatMessage",
						"chat_id": body.message.chat.id,
						"message_id": body.message.reply_to_message.message_id,
					};
					postTelegram(sd)
					postTelegram(pinMsg)
				}
			} else {
				var sd = {
					"method": "sendMessage",
					"chat_id": body.message.chat.id,
					"text": "This command only can use in group, not Pm!",
					"parse_mode": "Markdown",
					"reply_to_message_id": body.message.message_id,
					"allow_sending_without_reply": true
				};
				postTelegram(sd)
			}
		}
		if (body.message.text.indexOf("/spin") == 0) {
			isAdmin = isAdminOrCreator(body.message.from.id, body.message.chat.id)
			if (body.message.chat.type != private) {
				if (isAdmin) {
					var pinMsg = {
						"method": "pinChatMessage",
						"chat_id": body.message.chat.id,
						"message_id": body.message.reply_to_message.message_id,
					};
					var delCommand = {
						"method": "deleteMessage",
						"chat_id": body.message.chat.id,
						"message_id": body.message.message_id
					};
					postTelegram(delCommand)
					postTelegram(pinMsg)
				} else {
					var sd = {
						"method": "sendMessage",
						"chat_id": body.message.chat.id,
						"reply_to_message_id": body.message.message_id,
						"text": "Sorry... " + getMentionName(body.message.from) + "this command only can use by an admin.",
						"parse_mode": "Markdown"
					};
					var delNonAdminComand = {
						"method": "deleteMessage",
						"chat_id": body.message.chat.id,
						"message_id": body.message.message_id
					};
					var sd2 = {
						"method": "sendMessage",
						"chat_id": body.message.chat.id,
						"reply_to_message_id": body.message.message_id,
						"text": "Shhh... quiet now.\nMuted " + getMentionName(body.message.reply_to_message.from) + "for 30 minutes due to hit the admin command.",
						"parse_mode": "Markdown"
					};
					var mute = {
						"method": 'restrictChatMember',
						"chat_id": body.message.chat.id,
						"user_id": body.message.reply_to_message.from.id,
						"can_send_messages": false,
						"can_send_media_messages": false,
						"can_send_other_messages": false,
						"can_add_web_page_previews": false,
						"until_date": Date.now() / 1000 + 1800
					};
					postTelegram(sd)
					postTelegram(mute)
					postTelegram(delNonAdminComand)
					postTelegram(sd2)
				}
			} else {
				var sd = {
					"method": "sendMessage",
					"chat_id": body.message.chat.id,
					"text": "This command only can use in group, not Pm!",
					"parse_mode": "Markdown",
					"reply_to_message_id": body.message.message_id,
					"allow_sending_without_reply": true
				};
				postTelegram(sd)
			}
		}
		if (body.message.text.indexOf("/unpinall") == 0) {
			isAdmin = isAdminOrCreator(body.message.from.id, body.message.chat.id)
			if (body.message.chat.type != private) {
				if (isAdmin) {
					var sendStart = {
						"method": "sendMessage",
						"chat_id": body.message.chat.id,
						"reply_to_message_id": body.message.message_id,
						"parse_mode": "Markdown",
						"text": 'Are you sure you want to unpinall messages? ',
					};
					var inlineKeyboardMarkup = {};
					inlineKeyboardMarkup.inline_keyboard = [];
					var keyboardRow = []
					var keyboardRow2 = [];
					var confirm = {
						text: "✅",
						callback_data: "confirm"
					};
					var cancel = {
						text: "❌",
						callback_data: "cancel"
					};
					keyboardRow.push(cancel);
					keyboardRow.push(confirm);
					inlineKeyboardMarkup.inline_keyboard.push(keyboardRow);
					sendStart.reply_markup = inlineKeyboardMarkup;
					postTelegram(sendStart)
				} else {
					var sd = {
						"method": "sendMessage",
						"chat_id": body.message.chat.id,
						"reply_to_message_id": body.message.message_id,
						"text": "Sorry... " + getMentionName(body.message.from) + "this command only can use by an admin.",
						"parse_mode": "Markdown"
					};
					var delNonAdminComand = {
						"method": "deleteMessage",
						"chat_id": body.message.chat.id,
						"message_id": body.message.message_id
					};
					var sd2 = {
						"method": "sendMessage",
						"chat_id": body.message.chat.id,
						"reply_to_message_id": body.message.message_id,
						"text": "Shhh... quiet now.\nMuted " + getMentionName(body.message.reply_to_message.from) + "for 30 minutes due to hit the admin command.",
						"parse_mode": "Markdown"
					};
					var mute = {
						"method": 'restrictChatMember',
						"chat_id": body.message.chat.id,
						"user_id": body.message.reply_to_message.from.id,
						"can_send_messages": false,
						"can_send_media_messages": false,
						"can_send_other_messages": false,
						"can_add_web_page_previews": false,
						"until_date": Date.now() / 1000 + 1800
					};
					postTelegram(sd)
					postTelegram(mute)
					postTelegram(delNonAdminComand)
					postTelegram(sd2)
				}
			} else {
				var sd = {
					"method": "sendMessage",
					"chat_id": body.message.chat.id,
					"text": "This command only can use in group, not Pm!",
					"parse_mode": "Markdown",
					"reply_to_message_id": body.message.message_id,
					"allow_sending_without_reply": true
				};
				postTelegram(sd)
			}
		}
        if (body.message.text.indexOf("/unpin") === 0) {
			isAdmin = isAdminOrCreator(body.message.from.id, body.message.chat.id)
			if (body.message.chat.type != private) {
				if (isAdmin) {
					var sd = {
						"method": "sendMessage",
						"chat_id": body.message.chat.id,
						"text": "Message " + body.message.message_id + " has been unpinned.",
						"parse_mode": "Markdown",
						"reply_to_message_id": body.message.message_id,
						"allow_sending_without_reply": true
					};
					var unpinMsg = {
						"method": "unpinChatMessage",
						"chat_id": body.message.chat.id,
						"message_id": body.message.reply_to_message.message_id,
					};
					postTelegram(unpinMsg)
					postTelegram(sd)
				} else {
					var sd = {
						"method": "sendMessage",
						"chat_id": body.message.chat.id,
						"reply_to_message_id": body.message.message_id,
						"text": "Sorry... " + getMentionName(body.message.from) + "this command only can use by an admin.",
						"parse_mode": "Markdown"
					};
					var delNonAdminComand = {
						"method": "deleteMessage",
						"chat_id": body.message.chat.id,
						"message_id": body.message.message_id
					};
					var sd2 = {
						"method": "sendMessage",
						"chat_id": body.message.chat.id,
						"reply_to_message_id": body.message.message_id,
						"text": "Shhh... quiet now.\nMuted " + getMentionName(body.message.reply_to_message.from) + "for 30 minutes due to hit the admin command.",
						"parse_mode": "Markdown"
					};
					var mute = {
						"method": 'restrictChatMember',
						"chat_id": body.message.chat.id,
						"user_id": body.message.reply_to_message.from.id,
						"can_send_messages": false,
						"can_send_media_messages": false,
						"can_send_other_messages": false,
						"can_add_web_page_previews": false,
						"until_date": Date.now() / 1000 + 1800
					};
					postTelegram(sd)
					postTelegram(mute)
					postTelegram(delNonAdminComand)
					postTelegram(sd2)
				}
			} else {
				var sd = {
					"method": "sendMessage",
					"chat_id": body.message.chat.id,
					"text": "This command only can use in group, not Pm!",
					"parse_mode": "Markdown",
					"reply_to_message_id": body.message.message_id,
					"allow_sending_without_reply": true
				};
				postTelegram(sd)
			}
		}

		/**
		Mute
		**/
		if (body.message.text.indexOf("/mute") === 0) {
			isRepliedAnAdmin = isAdminOrCreator(body.message.reply_to_message.from.id, body.message.chat.id)
			isAdmin = isAdminOrCreator(body.message.from.id, body.message.chat.id)
			if (body.message.chat.type != private) {
				if (isAdmin) {
					if (body.message.reply_to_message.from.id != 1932532833) {
						if (!isRepliedAnAdmin) {
							var mute = {
								"method": 'restrictChatMember',
								"chat_id": body.message.chat.id,
								"user_id": body.message.reply_to_message.from.id,
								"can_send_messages": false,
								"can_send_media_messages": false,
								"can_send_other_messages": false,
								"can_add_web_page_previews": false
							};
							var sd = {
								"method": "sendMessage",
								"chat_id": body.message.chat.id,
								"text": "Shhh... quiet now.\nMuted " + getMentionName(body.message.reply_to_message.from) + ".",
								"parse_mode": "Markdown",
								"reply_to_message_id": body.message.message_id,
								"allow_sending_without_reply": true
							};
							postTelegram(sd)
							postTelegram(mute)
						} else {
							var sd = {
								"method": "sendMessage",
								"chat_id": body.message.chat.id,
								"reply_to_message_id": body.message.message_id,
								"text": "Ehhh, I'd rather not get involved in muting an admin. I'll stick to muting normal users, thanks.",
								"parse_mode": "Markdown"
							};
							postTelegram(sd)
						}
					} else {
						var sd = {
							"method": "sendMessage",
							"chat_id": body.message.chat.id,
							"text": "You know what I'm not going to do? Mute myself.",
							"parse_mode": "Markdown",
							"reply_to_message_id": body.message.message_id,
							"allow_sending_without_reply": true
						};
						postTelegram(sd)
					}
				} else {
					var sd = {
						"method": "sendMessage",
						"chat_id": body.message.chat.id,
						"reply_to_message_id": body.message.message_id,
						"text": "Sorry... " + getMentionName(body.message.from) + "this command only can use by an admin.",
						"parse_mode": "Markdown"
					};
					var delNonAdminComand = {
						"method": "deleteMessage",
						"chat_id": body.message.chat.id,
						"message_id": body.message.message_id
					};
					var sd2 = {
						"method": "sendMessage",
						"chat_id": body.message.chat.id,
						"reply_to_message_id": body.message.message_id,
						"text": "Shhh... quiet now.\nMuted " + getMentionName(body.message.reply_to_message.from) + "for 30 minutes due to hit the admin command.",
						"parse_mode": "Markdown"
					};
					var mute = {
						"method": 'restrictChatMember',
						"chat_id": body.message.chat.id,
						"user_id": body.message.reply_to_message.from.id,
						"can_send_messages": false,
						"can_send_media_messages": false,
						"can_send_other_messages": false,
						"can_add_web_page_previews": false,
						"until_date": Date.now() / 1000 + 1800
					};
					postTelegram(sd)
					postTelegram(mute)
					postTelegram(delNonAdminComand)
					postTelegram(sd2)
				}
			} else {
				var sd = {
					"method": "sendMessage",
					"chat_id": body.message.chat.id,
					"text": "This command only can use in group, not Pm!",
					"parse_mode": "Markdown",
					"reply_to_message_id": body.message.message_id,
					"allow_sending_without_reply": true
				};
				postTelegram(sd)
			}
		}
		if (body.message.text.indexOf("/dmute") === 0) {
			isRepliedAnAdmin = isAdminOrCreator(body.message.reply_to_message.from.id, body.message.chat.id)
			isAdmin = isAdminOrCreator(body.message.from.id, body.message.chat.id)
			if (body.message.chat.type != private) {
				if (isAdmin) {
					if (body.message.reply_to_message.from.id != 1932532833) {
						if (!isRepliedAnAdmin) {
							var mute = {
								"method": 'restrictChatMember',
								"chat_id": body.message.chat.id,
								"user_id": body.message.reply_to_message.from.id,
								"can_send_messages": false,
								"can_send_media_messages": false,
								"can_send_other_messages": false,
								"can_add_web_page_previews": false
							};
							var sd = {
								"method": "sendMessage",
								"chat_id": body.message.chat.id,
								"text": "Shhh... quiet now.\nMuted " + getMentionName(body.message.reply_to_message.from) + ".",
								"parse_mode": "Markdown",
								"reply_to_message_id": body.message.message_id,
								"allow_sending_without_reply": true
							};
							var delMsg = {
								"method": "deleteMessage",
								"chat_id": body.message.chat.id,
								"message_id": body.message.message_id,
							};
							postTelegram(sd)
							postTelegram(mute)
							postTelegram(delMsg)
						} else {
							var sd = {
								"method": "sendMessage",
								"chat_id": body.message.chat.id,
								"reply_to_message_id": body.message.message_id,
								"text": "Ehhh, I'd rather not get involved in muting an admin. I'll stick to muting normal users, thanks.",
								"parse_mode": "Markdown"
							};
							postTelegram(sd)
						}
					} else {
						var sd = {
							"method": "sendMessage",
							"chat_id": body.message.chat.id,
							"reply_to_message_id": body.message.message_id,
							"text": "Ehhh, I'd rather not get involved in muting an admin. I'll stick to muting normal users, thanks.",
							"parse_mode": "Markdown"
						};
						postTelegram(sd)
					}
				} else {
					var sd = {
						"method": "sendMessage",
						"chat_id": body.message.chat.id,
						"reply_to_message_id": body.message.message_id,
						"text": "Sorry... " + getMentionName(body.message.from) + "this command only can use by an admin.",
						"parse_mode": "Markdown"
					};
					var delNonAdminComand = {
						"method": "deleteMessage",
						"chat_id": body.message.chat.id,
						"message_id": body.message.message_id
					};
					var sd2 = {
						"method": "sendMessage",
						"chat_id": body.message.chat.id,
						"reply_to_message_id": body.message.message_id,
						"text": "Shhh... quiet now.\nMuted " + getMentionName(body.message.reply_to_message.from) + "for 30 minutes due to hit the admin command.",
						"parse_mode": "Markdown"
					};
					var mute = {
						"method": 'restrictChatMember',
						"chat_id": body.message.chat.id,
						"user_id": body.message.reply_to_message.from.id,
						"can_send_messages": false,
						"can_send_media_messages": false,
						"can_send_other_messages": false,
						"can_add_web_page_previews": false,
						"until_date": Date.now() / 1000 + 1800
					};
					postTelegram(sd)
					postTelegram(mute)
					postTelegram(delNonAdminComand)
					postTelegram(sd2)
				}
			} else {
				var sd = {
					"method": "sendMessage",
					"chat_id": body.message.chat.id,
					"text": "This command only can use in group, not Pm!",
					"parse_mode": "Markdown",
					"reply_to_message_id": body.message.message_id,
					"allow_sending_without_reply": true
				};
				postTelegram(sd)
			}
		}
		if (body.message.text.indexOf("/tmute") >= 0) {
			isRepliedAnAdmin = isAdminOrCreator(body.message.reply_to_message.from.id, body.message.chat.id)
			isAdmin = isAdminOrCreator(body.message.from.id, body.message.chat.id)
			if (body.message.chat.type != private) {
				if (isAdmin) {
					if (body.message.reply_to_message.from.id != 1932532833) {
						if (!isRepliedAnAdmin) {
							if (paras[1]) {
								if (paras[1].indexOf("d") >= 0) {
									para = (paras[1]);
									time = para.replace("d", "");
									if (time > 1) {
										add = "days";
									} else {
										add = "day";
									}
									newData = time * 86400;
									var mute = {
										"method": 'restrictChatMember',
										"chat_id": body.message.chat.id,
										"user_id": body.message.reply_to_message.from.id,
										"can_send_messages": false,
										"can_send_media_messages": false,
										"can_send_other_messages": false,
										"can_add_web_page_previews": false,
										"until_date": Date.now() / 1000 + newData
									};
									var sd = {
										"method": "sendMessage",
										"chat_id": body.message.chat.id,
										"text": "Shhh... quiet now.\nMuted " + getMentionName(body.message.reply_to_message.from) + " for " + time + " " + add + ".",
										"parse_mode": "Markdown",
										"reply_to_message_id": body.message.message_id,
										"allow_sending_without_reply": true
									};
									postTelegram(sd)
									postTelegram(mute)
								} else if (paras[1].indexOf("h") >= 0) {
									time = paras[1].replace("h", "")
									if (time > 1) {
										add = "hours";
									} else {
										add = "hour";
									}
									newData = time * 3600
									var mute = {
										"method": 'restrictChatMember',
										"chat_id": body.message.chat.id,
										"user_id": body.message.reply_to_message.from.id,
										"can_send_messages": false,
										"can_send_media_messages": false,
										"can_send_other_messages": false,
										"can_add_web_page_previews": false,
										"until_date": Date.now() / 1000 + newData
									};
									var sd = {
										"method": "sendMessage",
										"chat_id": body.message.chat.id,
										"text": "Shhh... quiet now.\nMuted " + getMentionName(body.message.reply_to_message.from) + " for " + time + " " + add + ".",
										"parse_mode": "Markdown",
										"reply_to_message_id": body.message.message_id,
										"allow_sending_without_reply": true
									};
									postTelegram(sd)
									postTelegram(mute)
								} else if (paras[1].indexOf("m") >= 0) {
									time = paras[1].replace("m", "")
									if (time > 1) {
										var add = "minutes";
									} else {
										var add = "minute";
									}
									newData = time * 61
									var mute = {
										"method": 'restrictChatMember',
										"chat_id": body.message.chat.id,
										"user_id": body.message.reply_to_message.from.id,
										"can_send_messages": false,
										"can_send_media_messages": false,
										"can_send_other_messages": false,
										"can_add_web_page_previews": false,
										"until_date": Date.now() / 1000 + newData
									};
									var sd = {
										"method": "sendMessage",
										"chat_id": body.message.chat.id,
										"text": "Shhh... quiet now.\nMuted " + getMentionName(body.message.reply_to_message.from) + " for " + time + " " + add + ".",
										"parse_mode": "Markdown",
										"reply_to_message_id": body.message.message_id,
										"allow_sending_without_reply": true
									};
									postTelegram(sd)
									postTelegram(mute)
								} else {
									var sd = {
										"method": "sendMessage",
										"chat_id": body.message.chat.id,
										"text": "Failed to get specified time: it is not a valid time char; expected one of d/h/m ( days, hours, minutes)",
										"parse_mode": "Markdown",
										"reply_to_message_id": body.message.message_id,
										"allow_sending_without_reply": true
									};
									postTelegram(sd)
								}
							} else {
								var sd = {
									"method": "sendMessage",
									"chat_id": body.message.chat.id,
									"text": "You haven't specified a time to mute this user for!",
									"parse_mode": "Markdown",
									"reply_to_message_id": body.message.message_id,
									"allow_sending_without_reply": true
								};
								postTelegram(sd)
							}
						} else {
							var sd = {
								"method": "sendMessage",
								"chat_id": body.message.chat.id,
								"reply_to_message_id": body.message.message_id,
								"text": "Ehhh, I'd rather not get involved in muting an admin. I'll stick to muting normal users, thanks.",
								"parse_mode": "Markdown"
							};
							postTelegram(sd)
						}
					} else {
						var sd = {
							"method": "sendMessage",
							"chat_id": body.message.chat.id,
							"text": "You know what I'm not going to do? Mute myself.",
							"parse_mode": "Markdown",
							"reply_to_message_id": body.message.message_id,
							"allow_sending_without_reply": true
						};
						postTelegram(sd)
					}
				} else {
					var sd = {
						"method": "sendMessage",
						"chat_id": body.message.chat.id,
						"reply_to_message_id": body.message.message_id,
						"text": "Sorry... " + getMentionName(body.message.from) + "this command only can use by an admin.",
						"parse_mode": "Markdown"
					};
					var delNonAdminComand = {
						"method": "deleteMessage",
						"chat_id": body.message.chat.id,
						"message_id": body.message.message_id
					};
					var sd2 = {
						"method": "sendMessage",
						"chat_id": body.message.chat.id,
						"reply_to_message_id": body.message.message_id,
						"text": "Shhh... quiet now.\nMuted " + getMentionName(body.message.reply_to_message.from) + "for 30 minutes due to hit the admin command.",
						"parse_mode": "Markdown"
					};
					var mute = {
						"method": 'restrictChatMember',
						"chat_id": body.message.chat.id,
						"user_id": body.message.reply_to_message.from.id,
						"can_send_messages": false,
						"can_send_media_messages": false,
						"can_send_other_messages": false,
						"can_add_web_page_previews": false,
						"until_date": Date.now() / 1000 + 1800
					};
					postTelegram(sd)
					postTelegram(mute)
					postTelegram(delNonAdminComand)
					postTelegram(sd2)
				}
			} else {
				var sd = {
					"method": "sendMessage",
					"chat_id": body.message.chat.id,
					"text": "This command only can use in group, not Pm!",
					"parse_mode": "Markdown",
					"reply_to_message_id": body.message.message_id,
					"allow_sending_without_reply": true
				};
				postTelegram(sd)
			}
		}
		if (body.message.text.indexOf("/smute") === 0) {
			isRepliedAnAdmin = isAdminOrCreator(body.message.reply_to_message.from.id, body.message.chat.id)
			isAdmin = isAdminOrCreator(body.message.from.id, body.message.chat.id)
			if (body.message.chat.type != private) {
				if (isAdmin) {
					if (body.message.reply_to_message.from.id != 1932532833) {
						if (!isRepliedAnAdmin) {
							var mute = {
								"method": 'restrictChatMember',
								"chat_id": body.message.chat.id,
								"user_id": body.message.reply_to_message.from.id,
								"can_send_messages": false,
								"can_send_media_messages": false,
								"can_send_other_messages": false,
								"can_add_web_page_previews": false
							};
							var delCommand = {
								"method": "deleteMessage",
								"chat_id": body.message.chat.id,
								"message_id": body.message.message_id
							};
							var delMsg = {
								"method": "deleteMessage",
								"chat_id": body.message.chat.id,
								"message_id": body.message.reply_to_message.message_id,
							};
							postTelegram(delCommand)
							postTelegram(mute)
							postTelegram(delMsg)
						}
					} else {
						var sd = {
							"method": "sendMessage",
							"chat_id": body.message.chat.id,
							"reply_to_message_id": body.message.message_id,
							"text": "Sorry... " + getMentionName(body.message.from) + "this command only can use by an admin.",
							"parse_mode": "Markdown"
						};
						var sd2 = {
							"method": "sendMessage",
							"chat_id": body.message.chat.id,
							"reply_to_message_id": body.message.message_id,
							"text": "Shhh... quiet now.\nMuted " + getMentionName(body.message.reply_to_message.from) + "for 30 minutes due to hit the admin command.",
							"parse_mode": "Markdown"
						};
						var mute = {
							"method": 'restrictChatMember',
							"chat_id": body.message.chat.id,
							"user_id": body.message.reply_to_message.from.id,
							"can_send_messages": false,
							"can_send_media_messages": false,
							"can_send_other_messages": false,
							"can_add_web_page_previews": false,
							"until_date": Date.now() / 1000 + 1800
						};
						postTelegram(sd)
						postTelegram(mute)
						postTelegram(sd2)
					}
				} else {
					var sd = {
						"method": "sendMessage",
						"chat_id": body.message.chat.id,
						"reply_to_message_id": body.message.message_id,
						"text": "Ehhh, I'd rather not get involved in muting an admin. I'll stick to muting normal users, thanks.",
						"parse_mode": "Markdown"
					};
					postTelegram(sd)
				}
			} else {
				var sd = {
					"method": "sendMessage",
					"chat_id": body.message.chat.id,
					"text": "This command only can use in group, not Pm!",
					"parse_mode": "Markdown",
					"reply_to_message_id": body.message.message_id,
					"allow_sending_without_reply": true
				};
				postTelegram(sd)
			}
		}

		/**
		Delete
		**/
		if (body.message.text.indexOf("/delete") >= 0) {
			isAdmin = isAdminOrCreator(body.message.from.id, body.message.chat.id)
			if (body.message.chat.type != private) {
				if (isAdmin) {
					var sd = {
						"method": "sendMessage",
						"chat_id": body.message.chat.id,
						"text": "Message " + body.message.message_id + " has been deleted.",
						"parse_mode": "Markdown",
						"reply_to_message_id": body.message.message_id,
						"allow_sending_without_reply": true
					};
					var delMsg = {
						"method": "deleteMessage",
						"chat_id": body.message.chat.id,
						"message_id": body.message.reply_to_message.message_id
					};
					postTelegram(sd)
					postTelegram(delMsg)
				} else {
					var sd = {
						"method": "sendMessage",
						"chat_id": body.message.chat.id,
						"reply_to_message_id": body.message.message_id,
						"text": "Sorry... " + getMentionName(body.message.from) + "this command only can use by an admin.",
						"parse_mode": "Markdown"
					};
					var sd2 = {
						"method": "sendMessage",
						"chat_id": body.message.chat.id,
						"reply_to_message_id": body.message.message_id,
						"text": "Shhh... quiet now.\nMuted " + getMentionName(body.message.reply_to_message.from) + "for 30 minutes due to hit the admin command.",
						"parse_mode": "Markdown"
					};
					var delCommand = {
						"method": "deleteMessage",
						"chat_id": body.message.chat.id,
						"message_id": body.message.message_id
					};
					var mute = {
						"method": 'restrictChatMember',
						"chat_id": body.message.chat.id,
						"user_id": body.message.reply_to_message.from.id,
						"can_send_messages": false,
						"can_send_media_messages": false,
						"can_send_other_messages": false,
						"can_add_web_page_previews": false,
						"until_date": Date.now() / 1000 + 1800
					};
					postTelegram(sd)
					postTelegram(mute)
					postTelegram(delNonAdminComand)
					postTelegram(sd2)
				}
			} else {
				var sd = {
					"method": "sendMessage",
					"chat_id": body.message.chat.id,
					"text": "This command only can use in group, not Pm!",
					"parse_mode": "Markdown",
					"reply_to_message_id": body.message.message_id,
					"allow_sending_without_reply": true
				};
				postTelegram(sd)
			}
		}
		if (body.message.text.indexOf("/sdelete") >= 0) {
			isAdmin = isAdminOrCreator(body.message.from.id, body.message.chat.id)
			if (body.message.chat.type != private) {
				if (isAdmin) {
					var delCommand = {
						"method": "deleteMessage",
						"chat_id": body.message.chat.id,
						"message_id": body.message.message_id
					};
					var delMsg = {
						"method": "deleteMessage",
						"chat_id": body.message.chat.id,
						"message_id": body.message.reply_to_message.message_id
					};
					postTelegram(delCommand)
					postTelegram(delMsg)
				} else {
					var sd = {
						"method": "sendMessage",
						"chat_id": body.message.chat.id,
						"reply_to_message_id": body.message.message_id,
						"text": "Sorry... " + getMentionName(body.message.from) + "this command only can use by an admin.",
						"parse_mode": "Markdown"
					};
					var sd2 = {
						"method": "sendMessage",
						"chat_id": body.message.chat.id,
						"reply_to_message_id": body.message.message_id,
						"text": "Shhh... quiet now.\nMuted " + getMentionName(body.message.reply_to_message.from) + "for 30 minutes due to hit the admin command.",
						"parse_mode": "Markdown"
					};
					var delNonAdminComand = {
						"method": "deleteMessage",
						"chat_id": body.message.chat.id,
						"message_id": body.message.message_id
					};
					var mute = {
						"method": 'restrictChatMember',
						"chat_id": body.message.chat.id,
						"user_id": body.message.reply_to_message.from.id,
						"can_send_messages": false,
						"can_send_media_messages": false,
						"can_send_other_messages": false,
						"can_add_web_page_previews": false,
						"until_date": Date.now() / 1000 + 1800
					};
					postTelegram(sd)
					postTelegram(mute)
					postTelegram(delNonAdminComand)
					postTelegram(sd2)
				}
			} else {
				var sd = {
					"method": "sendMessage",
					"chat_id": body.message.chat.id,
					"text": "This command only can use in group, not Pm!",
					"parse_mode": "Markdown",
					"reply_to_message_id": body.message.message_id,
					"allow_sending_without_reply": true
				};
				postTelegram(sd)
			}
		}

		/**
		Kick
		**/
		if (body.message.text.indexOf("/kick") >= 0) {
			isRepliedAnAdmin = isAdminOrCreator(body.message.reply_to_message.from.id, body.message.chat.id)
			isAdmin = isAdminOrCreator(body.message.from.id, body.message.chat.id)
			if (body.message.chat.type != private) {
				if (isAdmin) {
					if (body.message.reply_to_message.from.id != 1932532833) {
						if (!isRepliedAnAdmin) {
							var kick = {
								"method": "kickChatMember",
								"chat_id": body.message.chat.id,
								"user_id": body.message.reply_to_message.from.id
							}
							var sd = {
								"method": "sendMessage",
								"chat_id": body.message.chat.id,
								"text": "I've kicked " + getMentionName(body.message.reply_to_message.from) + ".",
								"parse_mode": "Markdown",
								"reply_to_message_id": body.message.message_id,
								"allow_sending_without_reply": true
							};
							postTelegram(kick)
							postTelegram(sd)
						} else {
							var sd = {
								"method": "sendMessage",
								"chat_id": body.message.chat.id,
								"reply_to_message_id": body.message.message_id,
								"text": "I'm not gonna kick an admin... Though I reckon it'd be pretty funny.",
								"parse_mode": "Markdown"
							};
							postTelegram(sd)
						}
					} else {
						var sd = {
							"method": "sendMessage",
							"chat_id": body.message.chat.id,
							"text": "Yeahhh, I'm not going to kick myself.",
							"parse_mode": "Markdown",
							"reply_to_message_id": body.message.message_id,
							"allow_sending_without_reply": true
						};
						postTelegram(sd)
					}
				} else {
					var sd = {
						"method": "sendMessage",
						"chat_id": body.message.chat.id,
						"reply_to_message_id": body.message.message_id,
						"text": "Sorry... " + getMentionName(body.message.from) + "this command only can use by an admin.",
						"parse_mode": "Markdown"
					};
					var delNonAdminComand = {
						"method": "deleteMessage",
						"chat_id": body.message.chat.id,
						"message_id": body.message.message_id
					};
					var sd2 = {
						"method": "sendMessage",
						"chat_id": body.message.chat.id,
						"reply_to_message_id": body.message.message_id,
						"text": "Shhh... quiet now.\nMuted " + getMentionName(body.message.reply_to_message.from) + "for 30 minutes due to hit the admin command.",
						"parse_mode": "Markdown"
					};
					var mute = {
						"method": 'restrictChatMember',
						"chat_id": body.message.chat.id,
						"user_id": body.message.reply_to_message.from.id,
						"can_send_messages": false,
						"can_send_media_messages": false,
						"can_send_other_messages": false,
						"can_add_web_page_previews": false,
						"until_date": Date.now() / 1000 + 1800
					};
					postTelegram(sd)
					postTelegram(mute)
					postTelegram(delNonAdminComand)
					postTelegram(sd2)
				}
			} else {
				var sd = {
					"method": "sendMessage",
					"chat_id": body.message.chat.id,
					"text": "This command only can use in group, not Pm!",
					"parse_mode": "Markdown",
					"reply_to_message_id": body.message.message_id,
					"allow_sending_without_reply": true
				};
				postTelegram(sd)
			}
		}
		if (body.message.text.indexOf("/dkick") >= 0) {
			isRepliedAnAdmin = isAdminOrCreator(body.message.reply_to_message.from.id, body.message.chat.id)
			isAdmin = isAdminOrCreator(body.message.from.id, body.message.chat.id)
			if (body.message.chat.type != private) {
				if (isAdmin) {
					if (body.message.reply_to_message.from.id != 1932532833) {
						if (!isRepliedAnAdmin) {
							var kick = {
								"method": "kickChatMember",
								"chat_id": body.message.chat.id,
								"user_id": body.message.reply_to_message.from.id
							};
							var delMsg = {
								"method": "deleteMessage",
								"chat_id": body.message.chat.id,
								"message_id": body.message.reply_to_message.message_id
							};
							var sd = {
								"method": "sendMessage",
								"chat_id": body.message.chat.id,
								"text": "I've kicked " + getMentionName(body.message.reply_to_message.from) + ".",
								"parse_mode": "Markdown",
								"reply_to_message_id": body.message.message_id,
								"allow_sending_without_reply": true
							};
							postTelegram(kick)
							postTelegram(sd)
							postTelegram(delMsg)
						} else {
							var sd = {
								"method": "sendMessage",
								"chat_id": body.message.chat.id,
								"reply_to_message_id": body.message.message_id,
								"text": "I'm not gonna kick an admin... Though I reckon it'd be pretty funny.",
								"parse_mode": "Markdown"
							};
							postTelegram(sd)
						}
					} else {
						var sd = {
							"method": "sendMessage",
							"chat_id": body.message.chat.id,
							"text": "Yeahhh, I'm not going to kick myself.",
							"parse_mode": "Markdown",
							"reply_to_message_id": body.message.message_id,
							"allow_sending_without_reply": true
						};
						postTelegram(sd)
					}
				} else {
					var sd = {
						"method": "sendMessage",
						"chat_id": body.message.chat.id,
						"reply_to_message_id": body.message.message_id,
						"text": "Sorry... " + getMentionName(body.message.from) + "this command only can use by an admin.",
						"parse_mode": "Markdown"
					};
					var delNonAdminComand = {
						"method": "deleteMessage",
						"chat_id": body.message.chat.id,
						"message_id": body.message.message_id
					};
					var sd2 = {
						"method": "sendMessage",
						"chat_id": body.message.chat.id,
						"reply_to_message_id": body.message.message_id,
						"text": "Shhh... quiet now.\nMuted " + getMentionName(body.message.reply_to_message.from) + "for 30 minutes due to hit the admin command.",
						"parse_mode": "Markdown"
					};
					var mute = {
						"method": 'restrictChatMember',
						"chat_id": body.message.chat.id,
						"user_id": body.message.reply_to_message.from.id,
						"can_send_messages": false,
						"can_send_media_messages": false,
						"can_send_other_messages": false,
						"can_add_web_page_previews": false,
						"until_date": Date.now() / 1000 + 1800
					};
					postTelegram(sd)
					postTelegram(mute)
					postTelegram(delNonAdminComand)
					postTelegram(sd2)
				}
			} else {
				var sd = {
					"method": "sendMessage",
					"chat_id": body.message.chat.id,
					"text": "This command only can use in group, not Pm!",
					"parse_mode": "Markdown",
					"reply_to_message_id": body.message.message_id,
					"allow_sending_without_reply": true
				};
				postTelegram(sd)
			}
		}
        if (body.message.text.indexOf("/skick") >= 0) {
			isRepliedAnAdmin = isAdminOrCreator(body.message.reply_to_message.from.id, body.message.chat.id)
			isAdmin = isAdminOrCreator(body.message.from.id, body.message.chat.id)
			if (body.message.chat.type != private) {
				if (isAdmin) {
					if (body.message.reply_to_message.from.id != 1932532833) {
						if (!isRepliedAnAdmin) {
							var kick = {
								"method": "kickChatMember",
								"chat_id": body.message.chat.id,
								"user_id": body.message.reply_to_message.from.id
							}
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
							payloads.push(delCommand);
							payloads.push(delMsg);
							payloads.push(kick);
							return payloads;
						} else {
							var sd = {
								"method": "sendMessage",
								"chat_id": body.message.chat.id,
								"reply_to_message_id": body.message.message_id,
								"text": "I'm not gonna kick an admin... Though I reckon it'd be pretty funny.",
								"parse_mode": "Markdown"
							};
							postTelegram(sd)
						}
					} else {
						var sd = {
							"method": "sendMessage",
							"chat_id": body.message.chat.id,
							"text": "Yeahhh, I'm not going to kick myself.",
							"parse_mode": "Markdown",
							"reply_to_message_id": body.message.message_id,
							"allow_sending_without_reply": true
						};
						postTelegram(sd)
					}
				} else {
					var sd = {
						"method": "sendMessage",
						"chat_id": body.message.chat.id,
						"reply_to_message_id": body.message.message_id,
						"text": "Sorry... " + getMentionName(body.message.from) + "this command only can use by an admin.",
						"parse_mode": "Markdown"
					};
					var delNonAdminComand = {
						"method": "deleteMessage",
						"chat_id": body.message.chat.id,
						"message_id": body.message.message_id
					};
					var sd2 = {
						"method": "sendMessage",
						"chat_id": body.message.chat.id,
						"reply_to_message_id": body.message.message_id,
						"text": "Shhh... quiet now.\nMuted " + getMentionName(body.message.reply_to_message.from) + "for 30 minutes due to hit the admin command.",
						"parse_mode": "Markdown"
					};
					var mute = {
						"method": 'restrictChatMember',
						"chat_id": body.message.chat.id,
						"user_id": body.message.reply_to_message.from.id,
						"can_send_messages": false,
						"can_send_media_messages": false,
						"can_send_other_messages": false,
						"can_add_web_page_previews": false,
						"until_date": Date.now() / 1000 + 1800
					};
					postTelegram(sd)
					postTelegram(mute)
					postTelegram(delNonAdminComand)
					postTelegram(sd2)
				}
			} else {
				var sd = {
					"method": "sendMessage",
					"chat_id": body.message.chat.id,
					"text": "This command only can use in group, not Pm!",
					"parse_mode": "Markdown",
					"reply_to_message_id": body.message.message_id,
					"allow_sending_without_reply": true
				};
				postTelegram(sd)
			}

			/** Here is handling /ban commond **/
			if (body.message.text.indexOf("/ban") >= 0) {
				isRepliedAnAdmin = isAdminOrCreator(body.message.reply_to_message.from.id, body.message.chat.id)
				isAdmin = isAdminOrCreator(body.message.from.id, body.message.chat.id)
				if (body.message.chat.type != private) {
					if (isAdmin) {
						if (body.message.reply_to_message.from.id != 1932532833) {
							if (!isRepliedAnAdmin) {
								var ban = {
									"method": "banChatMember",
									"chat_id": body.message.chat.id,
									"user_id": body.message.reply_to_message.from.id
								}
								var sd = {
									"method": "sendMessage",
									"chat_id": body.message.chat.id,
									"text": "I've banned " + getMentionName(body.message.reply_to_message.from) + ".",
									"parse_mode": "Markdown",
									"reply_to_message_id": body.message.message_id,
									"allow_sending_without_reply": true
								};
								postTelegram(ban)
								postTelegram(sd)
							} else {
								var sd = {
									"method": "sendMessage",
									"chat_id": body.message.chat.id,
									"reply_to_message_id": body.message.message_id,
									"text": "I'm not gonna ban an admin... Though I reckon it'd be pretty funny.",
									"parse_mode": "Markdown"
								};
								postTelegram(sd)
							}
						} else {
							var sd = {
								"method": "sendMessage",
								"chat_id": body.message.chat.id,
								"text": "Yeahhh, I'm not going to ban myself.",
								"parse_mode": "Markdown",
								"reply_to_message_id": body.message.message_id,
								"allow_sending_without_reply": true
							};
							postTelegram(sd)
						}
					} else {
						var sd = {
							"method": "sendMessage",
							"chat_id": body.message.chat.id,
							"reply_to_message_id": body.message.message_id,
							"text": "Sorry... " + getMentionName(body.message.from) + "this command only can use by an admin.",
							"parse_mode": "Markdown"
						};
						var delNonAdminComand = {
							"method": "deleteMessage",
							"chat_id": body.message.chat.id,
							"message_id": body.message.message_id
						};
						var sd2 = {
							"method": "sendMessage",
							"chat_id": body.message.chat.id,
							"reply_to_message_id": body.message.message_id,
							"text": "Shhh... quiet now.\nMuted " + getMentionName(body.message.reply_to_message.from) + "for 30 minutes due to hit the admin command.",
							"parse_mode": "Markdown"
						};
						var mute = {
							"method": 'restrictChatMember',
							"chat_id": body.message.chat.id,
							"user_id": body.message.reply_to_message.from.id,
							"can_send_messages": false,
							"can_send_media_messages": false,
							"can_send_other_messages": false,
							"can_add_web_page_previews": false,
							"until_date": Date.now() / 1000 + 1800
						};
						postTelegram(sd)
						postTelegram(mute)
						postTelegram(delNonAdminComand)
						postTelegram(sd2)
					}
				} else {
					var sd = {
						"method": "sendMessage",
						"chat_id": body.message.chat.id,
						"text": "This command only can use in group, not Pm!",
						"parse_mode": "Markdown",
						"reply_to_message_id": body.message.message_id,
						"allow_sending_without_reply": true
					};
					postTelegram(sd)
				}
			}
			if (body.message.text.indexOf("/dban") >= 0) {
				isRepliedAnAdmin = isAdminOrCreator(body.message.reply_to_message.from.id, body.message.chat.id)
				isAdmin = isAdminOrCreator(body.message.from.id, body.message.chat.id)
				if (body.message.chat.type != private) {
					if (isAdmin) {
						if (body.message.reply_to_message.from.id != 1932532833) {
							if (!isRepliedAnAdmin) {
								var ban = {
									"method": "banChatMember",
									"chat_id": body.message.chat.id,
									"user_id": body.message.reply_to_message.from.id
								};
								var delMsg = {
									"method": "deleteMessage",
									"chat_id": body.message.chat.id,
									"message_id": body.message.reply_to_message.message_id
								};
								var sd = {
									"method": "sendMessage",
									"chat_id": body.message.chat.id,
									"text": "I've banned " + getMentionName(body.message.reply_to_message.from) + ".",
									"parse_mode": "Markdown",
									"reply_to_message_id": body.message.message_id,
									"allow_sending_without_reply": true
								};
								postTelegram(ban)
								postTelegram(sd)
								postTelegram(delMsg)
							} else {
								var sd = {
									"method": "sendMessage",
									"chat_id": body.message.chat.id,
									"reply_to_message_id": body.message.message_id,
									"text": "I'm not gonna ban an admin... Though I reckon it'd be pretty funny.",
									"parse_mode": "Markdown"
								};
								postTelegram(sd)
							}
						} else {
							var sd = {
								"method": "sendMessage",
								"chat_id": body.message.chat.id,
								"text": "Yeahhh, I'm not going to ban myself.",
								"parse_mode": "Markdown",
								"reply_to_message_id": body.message.message_id,
								"allow_sending_without_reply": true
							};
							postTelegram(sd)
						}
					} else {
						var sd = {
							"method": "sendMessage",
							"chat_id": body.message.chat.id,
							"reply_to_message_id": body.message.message_id,
							"text": "Sorry... " + getMentionName(body.message.from) + "this command only can use by an admin.",
							"parse_mode": "Markdown"
						};
						var delNonAdminComand = {
							"method": "deleteMessage",
							"chat_id": body.message.chat.id,
							"message_id": body.message.message_id
						};
						var sd2 = {
							"method": "sendMessage",
							"chat_id": body.message.chat.id,
							"reply_to_message_id": body.message.message_id,
							"text": "Shhh... quiet now.\nMuted " + getMentionName(body.message.reply_to_message.from) + "for 30 minutes due to hit the admin command.",
							"parse_mode": "Markdown"
						};
						var mute = {
							"method": 'restrictChatMember',
							"chat_id": body.message.chat.id,
							"user_id": body.message.reply_to_message.from.id,
							"can_send_messages": false,
							"can_send_media_messages": false,
							"can_send_other_messages": false,
							"can_add_web_page_previews": false,
							"until_date": Date.now() / 1000 + 1800
						};
						postTelegram(sd)
						postTelegram(mute)
						postTelegram(delNonAdminComand)
						postTelegram(sd2)
						postTelegram(sd)
					}
				} else {
					var sd = {
						"method": "sendMessage",
						"chat_id": body.message.chat.id,
						"text": "This command only can use in group, not Pm!",
						"parse_mode": "Markdown",
						"reply_to_message_id": body.message.message_id,
						"allow_sending_without_reply": true
					};
					postTelegram(sd)
				}
			}
			if (body.message.text.indexOf("/sban") >= 0) {
				isRepliedAnAdmin = isAdminOrCreator(body.message.reply_to_message.from.id, body.message.chat.id)
				isAdmin = isAdminOrCreator(body.message.from.id, body.message.chat.id)
				if (body.message.chat.type != private) {
					if (isAdmin) {
						if (body.message.reply_to_message.from.id != 1932532833) {
							if (!isRepliedAnAdmin) {
								var ban = {
									"method": "banChatMember",
									"chat_id": body.message.chat.id,
									"user_id": body.message.reply_to_message.from.id
								}
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
								payloads.push(delCommand);
								payloads.push(delMsg);
								payloads.push(ban);
								return payloads;
							} else {
								var sd = {
									"method": "sendMessage",
									"chat_id": body.message.chat.id,
									"reply_to_message_id": body.message.message_id,
									"text": "I'm not gonna ban an admin... Though I reckon it'd be pretty funny.",
									"parse_mode": "Markdown"
								};
								postTelegram(sd)
							}
						} else {
							var sd = {
								"method": "sendMessage",
								"chat_id": body.message.chat.id,
								"text": "Yeahhh, I'm not going to ban myself.",
								"parse_mode": "Markdown",
								"reply_to_message_id": body.message.message_id,
								"allow_sending_without_reply": true
							};
							postTelegram(sd)
						}
					} else {
						var sd = {
							"method": "sendMessage",
							"chat_id": body.message.chat.id,
							"reply_to_message_id": body.message.message_id,
							"text": "Sorry... " + getMentionName(body.message.from) + "this command only can use by an admin.",
							"parse_mode": "Markdown"
						};
						var delNonAdminComand = {
							"method": "deleteMessage",
							"chat_id": body.message.chat.id,
							"message_id": body.message.message_id
						};
						var sd2 = {
							"method": "sendMessage",
							"chat_id": body.message.chat.id,
							"reply_to_message_id": body.message.message_id,
							"text": "Shhh... quiet now.\nMuted " + getMentionName(body.message.reply_to_message.from) + "for 30 minutes due to hit the admin command.",
							"parse_mode": "Markdown"
						};
						var mute = {
							"method": 'restrictChatMember',
							"chat_id": body.message.chat.id,
							"user_id": body.message.reply_to_message.from.id,
							"can_send_messages": false,
							"can_send_media_messages": false,
							"can_send_other_messages": false,
							"can_add_web_page_previews": false,
							"until_date": Date.now() / 1000 + 1800
						};
						postTelegram(sd)
						postTelegram(mute)
						postTelegram(delNonAdminComand)
						postTelegram(sd2)
					}
				} else {
					var sd = {
						"method": "sendMessage",
						"chat_id": body.message.chat.id,
						"text": "This command only can use in group, not Pm!",
						"parse_mode": "Markdown",
						"reply_to_message_id": body.message.message_id,
						"allow_sending_without_reply": true
					};
					postTelegram(sd)
				}
			}
			if (body.message.text.indexOf("/") >= 0) {
				var payload = {
					"method": "deleteMessage",
					"chat_id": body.message.chat.id,
					"message_id": body.message.message_id,
				};
				setTimeout(postTelegram(payload), 3000)
			}
		}
	}
}
