console.log("TEST")

let eventReceiver = function (data) {
    console.log("Response received!!!!!!!!!!!!!!!");
    console.log(data)
    switch(data.object){
        case 'table':
            console.log("You entered Table")
            break;
        case 'whiteboard':
            console.log("You entered Whiteboard")
            break;
    }
}

let sendToUE4 = function (data) {
    console.log("Send to UE4");
    emitUIInteraction("From Web");
}

