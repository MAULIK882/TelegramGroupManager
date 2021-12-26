/**
©Man Ho 
Dec 26 2021 17:04:07 (GMT+0800 Kuala Lumpur, Malaysia Standard Time)
The code is open source.
This project uses the GNU GPL license 
any work using this code must be distributed under the same license. 
**/


function handleMessage(body){
    if(body.message.text){
    var isCallingMe = isMyCommand(body)
        if(isCallingMe){
            return handleCommand(body)
        } else {
            return null
        }
    }
}