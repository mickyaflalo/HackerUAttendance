chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {

    if (msg.action == 'getParts') {

        console.log("time to get some parts!!!");

        let parts = get_parts();

        var port = chrome.runtime.connect();

        port.postMessage({
            'from': 'tab',
            'data': parts,
            'time': Date(Date.now()).split(" ")[4]

        });
    
    //Take attedence on the canvas page
    } else if (msg.action == 'takeAttend') {

        //check if we are on canvas
        takeAttend(msg.data);
    }

    //Reset taking attendence
    else if (msg.action == 'reset') {

        document.getElementById("unmark-all").click();

    }

});

//Get the participants from the zoom meeting
function get_parts() {

    //////////////////////////
    //Check for Parts window//

    //////////////////////////

    console.log(document.getElementsByClassName("participants-item__display-name").length);

    var els = document.getElementsByClassName("participants-item__display-name");

    let parts = "";

    Array.prototype.forEach.call(els, function(el) {
        // Do stuff here
        console.log(el.innerHTML);
        parts = parts + el.innerHTML + "_"
    });

    parts = parts.slice(0, -1)

    console.log("content.js:" + parts)

    return parts;

}

//Take attedence on the canvas page
function takeAttend(data) {

    let parts = data;
    let partsArr = parts.split('_');
    console.log(partsArr);

    let els = document.getElementsByClassName("no-select student-attendance-display student-toggle");

    console.log(els);
    console.log(els.length);

    var i;
    let count = 0;
    Array.prototype.forEach.call(els, function(el) {

        for (i = 0; i < partsArr.length; i++) {

            if (el.firstChild.nextSibling.alt.toLowerCase() == partsArr[i].toLowerCase()) {
                count++;
                console.log("FOUND:" + el.firstChild.nextSibling.alt);
                el.click();
            }

        }
    });
    console.log("count: " + count);
}