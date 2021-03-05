document.addEventListener('DOMContentLoaded', function() {

    // opens a communication between scripts
    var port = chrome.runtime.connect();

    // Get Participants button was pressed
    document.getElementById('getParts').addEventListener('click', function() {

        port.postMessage({
            'from': 'popup'
        });
    });

    // Take attendence button was pressed
    document.getElementById('takeAttend').addEventListener('click', function() {

        port.postMessage({
            'from': 'takeAttend'
        });
    });

    //Reset Attendence Button was pressed
    document.getElementById('reset').addEventListener('click', function() {

        port.postMessage({
            'from': 'reset'
        });
    });

    //Method to recieve a message from the background.js
    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            if (request.msg === "getParts") {

                console.log(request);
                
                console.log(request.data);

                document.getElementById("parts").value = request.data;

            }
        }
    );
});