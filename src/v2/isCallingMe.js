/**
©Man Ho 
Dec 26 2021 17:04:07 (GMT+0800 Kuala Lumpur, Malaysia Standard Time)
The code is open source.
This project uses the GNU GPL license 
any work using this code must be distributed under the same license. 
**/


function isCommand(text){
    if(text){
        if(text.indexOf("/") >= 0 || text.indexOf("!") >= 0){
        return true;
        }
    }
}
function isMyCommand(body){
    if(body.message.chat.type === "private"){
        return true;
    } else if(body.message.chat.type != "private"){
        if(body.message.text){
            var paras = body.message.text.split(" ");
            if (paras[0] && paras[0].indexOf("@") >= 0){
                if (paras[0].toLowerCase().indexOf(Const.botName) >=0){
                    if(isCommand(paras[0])){
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            }
        }
        return true;
    } else {
        return false;
    }
}