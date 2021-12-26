/**
©Man Ho 
Dec 26 2021 17:04:07 (GMT+0800 Kuala Lumpur, Malaysia Standard Time)
The code is open source.
This project uses the GNU GPL license 
any work using this code must be distributed under the same license. 
**/



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