//If we are not on the zoom tab we wont do anything
console.log(document.getElementsByClassName("participants-item__display-name").length);

var els = document.getElementsByClassName("participants-item__display-name");

let parts = "";

Array.prototype.forEach.call(els, function(el) {
    // Do stuff here
    console.log(el.innerHTML);
    parts = parts + el.innerHTML + "_"
});

console.log(parts)

//Now how do we send this to the background or popup?
// opens a communication between scripts
var port = chrome.runtime.connect();

// sends a message throw the communication port
port.postMessage({
    'from': 'tab',
    'data': parts

});