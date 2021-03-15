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

    //Recieving the data back from background.js <-- content.js
    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            if (request.msg === "getParts") {

                console.log(request);
                
                console.log(request.data);

                document.getElementById("parts").value = request.data;
                addTimestamp(Date(Date.now()).split(" ")[4].substring(0,5));
            }
        }
    );

    function addTimestamp(timeNow) {
        
        let newTimestamp = document.createElement("div");
        newTimestamp.className = "btn btn-info";
        let time = document.createTextNode(timeNow);
        
        if (document.getElementById("timestamp").children.length>5) {
            document.getElementById("timestamp").removeChild(document.getElementById("timestamp").lastChild)
        }

        newTimestamp.appendChild(time);
        document.getElementById("timestamp").appendChild(newTimestamp);

        //------------------------------------------------------------------
        let key = Date(Date.now());
        let value = Date(Date.now()).split(" ")[4].substring(0,5);
        addToStorage(key, value);

        
    }

    function addToStorage(time,value) {
        chrome.storage.sync.set({time: value}, function() {
          console.log('Value is set to ' + "key: " + key + "\nValue: "+value);
        });
    }

});