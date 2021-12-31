function handleMessage(body){
    if(body.message.text){
    var isCallingMe = isMyCommand(body)
        if(isCallingMe){
            return handleCommand(body)
        }
    } else if(body.message.sticker){
        convertApi(body)
    } 
}
function preparePayload(body){
    if(body.message){
        return handleMessage(body)
    } else if(body.callback_query){
        return handleCallback(body)
    } else {
        return null
    }
}

function handleCallback(body){
    if(body.callback_query.data.indexOf("netEase") >= 0){
        return callNetEase(body)
    } 
} 
