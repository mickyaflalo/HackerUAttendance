let participants = "";

// opens a communication port
chrome.runtime.onConnect.addListener(function(port) {

    // listen for every message passing throw it
    port.onMessage.addListener(function(o) {

        // Get Participants was clicked
        if (o.from && o.from === 'popup') {

            chrome.tabs.query({
                active: true,
                currentWindow: true
            }, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    action: "getParts"
                });
            });
        }

        // Take attendence button was clicked
        else if (o.from && o.from === 'takeAttend') {

            chrome.tabs.query({
                active: true,
                currentWindow: true
            }, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    action: "takeAttend",
                    data: participants
                });
            });
        }

        // Get Participants was clicked
        if (o.from && o.from === 'reset') {

            chrome.tabs.query({
                active: true,
                currentWindow: true
            }, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    action: "reset"
                });
            });
        }



        // if the message comes from the tab with the zoom and canvas page
        else if (o.from && o.from === 'tab') {

            console.log(o.data);
            participants = o.data;

            chrome.runtime.sendMessage({
                msg: "getParts",
                data: o.data
            });
        }
    });
});