console.log("TEST")

let eventReceiver = function (data) {
    console.log("Response received!!!!!!!!!!!!!!!");
    console.log(data)
}

let sendToUE4 = function (data) {
    console.log("Send to UE4");
    emitUIInteraction("From Web");
}

