function doPost(e) {
    var body = JSON.parse(e.postData.contents);
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