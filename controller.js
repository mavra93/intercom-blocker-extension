chrome.webRequest.onBeforeRequest.addListener(
    (info) => {
        let disableIntercom = JSON.parse(localStorage["disableIntercom"] || false);
        if (info.method === "POST" && disableIntercom) {
            return {
                cancel: true
            };
        }
    }, {
        urls: ["https://*.intercom.io/*"]
    }, ["blocking"]
);

chrome.runtime.onMessage.addListener(
    (request) => {
        chrome.browserAction.setIcon({
            path: request.disableIntercom ? "icons/icon-on.png" : "icons/icon-off.png"
        });
        chrome.browserAction.setTitle({
            title: request.disableIntercom ? "Intercom blocker is enabled" : "Intercom blocker is disabled"
        });
    });