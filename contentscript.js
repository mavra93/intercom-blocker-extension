var disableIntercom = JSON.parse(localStorage["disableIntercom"] || false);

document.addEventListener("DOMContentLoaded", () => {
    changeButtonText(disableIntercom);
    document.getElementById("intercom-status").innerHTML = disableIntercom.toString();
    document.getElementById("disable-enable-intercom").addEventListener("click", () => {
        changeIntercomStatus(!disableIntercom);
    });
});

changeIntercomStatus = (intercomShutdown) => {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, (tabs) => {
        chrome.tabs.executeScript(tabs[0].id, {code: ""}, () => {
            chrome.tabs.update(tabs[0].id, {
                url: tabs[0].url,
                selected: tabs[0].selected
            });
            localStorage["disableIntercom"] = JSON.stringify(intercomShutdown);
            chrome.webRequest.handlerBehaviorChanged();
            document.getElementById("intercom-status").innerHTML = intercomShutdown.toString();
            changeButtonText(intercomShutdown);
            disableIntercom = !disableIntercom;
            //Close popup
            window.close();
        });
    });
};

changeButtonText = (disableIntercom) => {
    let disableEnableButton = document.getElementById("disable-enable-intercom");
    disableEnableButton.innerHTML = (disableIntercom ? "Enable intercom" : "Disable intercom");
    chrome.runtime.sendMessage({"disableIntercom": disableIntercom});
};

