console.log("TEST")

let eventReceiver = function (data) {
    console.log("Response received!!!!!!!!!!!!!!!");
    console.log(data)
    const jsonData = JSON.parse(data)
    switch(jsonData.object){
        case 'table':
            console.log("You entered Table")
            break;
        case 'whiteboard':
            colorPicker()
            inputWhiteboard()
            console.log("You entered Whiteboard")
            break;
    }
}

let sendToUE4 = function (data) {
    console.log("Send to UE4");
    emitUIInteraction("From Web");
}

const colorPicker = function(){
    let container = document.getElementById('sector321');
    let Picker =    '<div class="colorpicker-container">'+
                        '<div class="colorpicker">'+
                            '<input type="color" id="head" name="head" value="#ffffff">'+
                            '<label for="head">Change Color</label>'+
                        '</div>'+
                    '</div>';
    container.innerHTML = Picker;
}
 const inputWhiteboard = function(){
    registerKeyboardEvents = function() {}; 
    let container = document.getElementById('sector231');
    let Input =     '<div class="whiteboard">'+
                        '<form action="">'+
                            '<textarea id="whiteboard" name="whiteboard" rows="4" cols="50">'+
                                'Enter something to be displayed on the whiteboard'+
                            '</textarea>'+
                            '<input type="submit" value="Transfer to Whiteboard">'+
                        '</form>'+
                    '</div>';
    container.innerHTML = Input;
}
