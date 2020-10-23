
let eventReceiver = function (data) {
    console.log("Response received!!!!!!!!!!!!!!!");
    console.log(data)
    const jsonData = JSON.parse(data)
    switch(jsonData.routingKey){
        case 'table':
            console.log("You entered Table")
            break;
        case 'whiteboard':
            colorPicker()
            inputWhiteboard()
            console.log("You entered Whiteboard")
            break;
        case 'Terminal.Exercise':
            openExerciseTextBlock();
    }
}

let sendToUE4 = function (data) {
    console.log("Send to UE4");
    emitUIInteraction(data);
}

const playerInitialization = function(){
    let container = document.getElementById('sector222');


    let textArea =   `
            <div id="inputusername" class="leaf leaf-center">
                <div class="username-container">
                    <img src="logo-gb.svg">
                    <h2 class="usernamelogin">Who is the User?</h2>
                    <input type="text" value="Username" autofocus="true" id="PlayerNameTextArea"  name="Player Name" rows="4" cols="50">
                    <button onClick="sendNewPlayerConnected()">Join</button>
                </div>
            </div>
                    `;
    container.innerHTML = textArea;
}

const purgeCenter = function(){
    let container = document.getElementById('sector222');
    container.innerHTML = ""
}

const sendNewPlayerConnected = function(){
    
    let valueJSON = {
        "routingKey":"ClassGameStateBP.newPlayerConnected",
        "id":"1234",
        "player":getValueOf('PlayerNameTextArea'),
    }
    console.log(valueJSON)
    purgeCenter();
    sendToUE4(valueJSON);
}



const openExerciseTextBlock = function(){
    let container = document.getElementById('sector231');
    let textArea =   `
                        <label for="SolutionX">&delta; x</label>
                        <textarea id="SolutionX" name="Solution" rows="4" cols="50">
                        Please insert solution here
                        </textarea>
                        <label for="SolutionY">&delta; y</label>
                        <textarea id="SolutionY" name="Solution" rows="4" cols="50">
                        Please insert solution here
                        </textarea>
                        <button onClick="sendBackUI()">Submit</button>`;
    container.innerHTML = textArea;
}
const getValueOf = function(htmlId){
    return document.getElementById(htmlId).value
}

const sendBackUI = function(){
    console.log("PUSHED")
    let valueJSON = {
        routingKey: "Terminal.Exercise",
        player: getValueOf('playerName'),
        solutionX: getValueOf('SolutionX'),
        solutionY: getValueOf('SolutionY')
    }
    sendToUE4(valueJSON);

}




const getValueTextarea = function(){
    let valueJSON = {identifier:"textarea", value: document.getElementById("whiteboard").value}
    let contentJSON = JSON.stringify(valueJSON);
    sendToUE4(contentJSON);
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
                        '<div class="textareacontainer">'+
                            '<textarea id="whiteboard" name="whiteboard" rows="4" cols="50">'+
                                'Enter something to be displayed on the whiteboard'+
                            '</textarea>'+
                            '<button onClick="getValueTextarea()">Transfer to Whiteboard</button>'+
                        '</div>'+
                    '</div>';
    container.innerHTML = Input;
}

const inputTable = function(){
    registerKeyboardEvents = function() {}; 
    let container = document.getElementById('sector231');
    let Input =     '<div class="whiteboard">'+
                        '<form action="">'+
                            '<textarea id="table" name="whiteboard" rows="4" cols="50">'+
                                'Enter something to be displayed on the whiteboard'+
                            '</textarea>'+
                            '<input type="submit" value="Transfer to Table">'+
                        '</form>'+
                    '</div>';
    container.innerHTML = Input;
}


const initGreenBranch = function (){
    console.log("Initialize the green branch")
}


