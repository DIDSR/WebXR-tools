// SOURCE https://stackoverflow.com/questions/16616722/sending-all-javascript-console-output-into-a-dom-element 
// Writes console information to the debug div which can be opened by pressing ctrl+i

var baseLogFunction = console.log;
console.log = function(){
    baseLogFunction.apply(console, arguments);

    var args = Array.prototype.slice.call(arguments);
    for(var i=0;i<args.length;i++){
        var node = createLogNode(args[i]);
        document.querySelector("#debug").appendChild(node);
    }

}

function createLogNode(message){
    var node = document.createElement("div");
    node.style.overflowY = 'auto';
    var textNode = document.createTextNode(message);
    node.appendChild(textNode);
    return node;
}

window.onerror = function(message, url, linenumber) {
    console.log("JavaScript error: " + message + " on line " +
        linenumber + " for " + url);
}

function toggleConsole() {
    if(debug.style.display == "block"){
        debug.style.display = "none";
    } else {
        debug.style.display = "block";

    }
}