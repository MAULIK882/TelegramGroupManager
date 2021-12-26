/**
©Man Ho 
Dec 26 2021 17:04:07 (GMT+0800 Kuala Lumpur, Malaysia Standard Time)
The code is open source.
This project uses the GNU GPL license 
any work using this code must be distributed under the same license. 
**/


function getName(user) {
    var name = user.first_name;
    if (user.last_name) {
        name += " " + user.last_name;
    }

    return name;
}

function escapeMarkDown(toEscapeMsg) {
    var escapedMsg = toEscapeMsg
        .replace(/_/g, "\\_")
        .replace(/\*/g, "\\*")
        .replace(/\[/g, "\\[")
        .replace(/`/g, "\\`");
    return escapedMsg;
}


function getMentionName(user) {
    var username = user.username;
    var mentionName = "";

    var name = getName(user);
    if (!name) {
        name = "Unknown";
    }

    mentionName = getMarkDownUserUrl(escapeMarkDown(name), user.id);

    return mentionName;
}

function getMarkDownUserUrl(userName, userId) {
    return "[" + userName + "](tg://user?id=" + userId + ")";
}