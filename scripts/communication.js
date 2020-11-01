let eventReceiver = function (data) {
    console.log("Response received!!!!!!!!!!!!!!!");
    console.log(data)
    const jsonData = JSON.parse(data)
    console.log(jsonData)
    switch(jsonData.routingKey){
        case 'linklist':
            console.log("Open Linklist")
            openLinks(jsonData);
            break;
        case 'vote':
            console.log("Open vote")
            openVote(jsonData.state)
            break;
        case 'question':
            console.log("Open question")
            openQuestion(jsonData.state) //state is change with fliplop in UE
            break;
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
            break;
    }
}

let sendToUE4 = function (data) {
    console.log("Send to UE4");
    emitUIInteraction(data);
}

const playerInitialization = function(){
    console.log("++++PLAYERINIT++++")
    let container = document.getElementById('sector221');
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
    let container = document.getElementById('sector221');
    container.innerHTML = ""
    container.remove()
}

const sendNewPlayerConnected = function(){
    
    let valueJSON = {
        "routingKey":"ClassGameStateBP.newPlayerConnected",
        "id":"1234",
        "player":getValueOf('PlayerNameTextArea'),
    }
    document.getElementById("username").innerHTML = valueJSON.player;
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

const purge = function(sector){
    let container = document.getElementById(sector);
    container.innerHTML = ""
}
const openLinks = function(jsonData){
    console.log("fg")
    let container = document.getElementById('sector321');
    let Input = `
        <dl id="link-container" class="definitionlist">
            <p>Usefull Links</p>
            <div id="link-content" class="definitioncontainer">
                
            </div>
            <div class="container-close" ></div>
        </dl>
    `;
    container.innerHTML = Input;
    openLinkContainer(jsonData)
}
function openLinkContainer(data){
    var powerdBy = document.getElementById("link-container");
    powerdBy.style.height = window.innerHeight - 160 + 'px';
    createLinklist(data);
}
//Create List of Links
function createLinklist(data){
    container = document.getElementById("link-content")
    for(i=0; i < data.length; i++){
        var content = document.createElement("div");
        content.classList.add("flex-col", "uie");
        //Highlight Link
        if(data[i].state == "true"){
            content.classList.add("active-highlight");
            content.setAttribute("active", "true");
        }
        content.innerHTML = `
            <div class="definitiondivider ">
                <dt class="definitionterm">${data[i].title}</dt>
                <dd class="definition">${data[i].desc}</dd>
            </div>
            <a class="followup" href=${data[i].link} target="_blank">read more</a>
            `;
        container.appendChild(content);
    }
}

const openVote = function(state){
    let container = document.getElementById('sector232');
    let Input = `
    <div class="tgb-container">
    <div class="top-question">
        <p>Hier steht die Frage</p>
    </div>
    <div class="center-question">
        <ol class="orderedlist">
            <li>Lorem ipsum dolor sit amet, consetetur sadipscing elitr</li>
            <li>Lorem ipsum dolor sadipscing elitr</li>
            <li>Lorem ipsum dolor sit amet, consetetur </li>
            <li>Antwort</li>
        </ol>
    </div>
    <div class="bottom-question">
        <label class="radio">
            <input type="radio" name="question" value="1">
            <span><div>1</div></span>
          </label>
          <label class="radio">
            <input type="radio" name="question" value="2">
            <span><div>2</div></span>
          </label>
          <label class="radio">
            <input type="radio" name="question" value="3">
            <span><div>3</div></span>
          </label>
          <label class="radio">
            <input type="radio" name="question" value="4">
            <span><div>4</div></span>
          </label>
    </div>
</div>
    `;
    if(state == "false"){
        purge(container.id)
    }else{
        container.innerHTML = Input;
    }
}
const openQuestion = function(state){
    let container = document.getElementById('sector231');
    console.log(state)
    let Input = `
    <div class="whiteboard">
        <div id="interactionbtn" onclick="showTextarea()" class="interaction-btn">
            <img src="action.svg">
        </div>
        <div class="textareacontainer">
            <textarea id="whiteboard" class="textarea-init" name="whiteboard" rows="4" cols="50">Schreiben Sie hier Ihre Frage...</textarea>
            <button id="whiteboardbtn" class="btn-init" onClick="getTextareaQuestion()" >Fragen</button>
        </div>
    </div>
    `;
    if(state == "false"){
        purge(container.id)
    }else{
        container.innerHTML = Input;
    }
  
   
}
function showTextarea(){
    document.getElementById("interactionbtn").remove();
    document.getElementById("whiteboard").classList.add("whiteboardtextarea","textarea-init")
    document.getElementById("whiteboardbtn").classList.add("whiteboardbutton","btn-init")
}
const getTextareaQuestion = function(){
    let valueJSON = {identifier:"textarea", value: document.getElementById("whiteboard").value}
    let contentJSON = JSON.stringify(valueJSON);
    ShowQuestionToAll(valueJSON)
    //sendToUE4(contentJSON);
}
const ShowQuestionToAll = function(valueJSON){
    let container = document.getElementById('sector211');
    let Input = `
    <div class="tgb-container">
        <div class="top-container">
            <p>${valueJSON.value}</p>
        </div>
        <div class="bottom-container">
            <p>@ Mr Mathe Schmitt</p>
        </div>
    </div>
    `;
    container.innerHTML = Input;
}






		//Functions for GRID -Start- //
		
		/* window.addEventListener("DOMContentLoaded", setHeightContainer); */
		function setHeightContainer(){
			var powerdBy = document.getElementById("link-container");
			powerdBy.style.height = window.innerHeight - 160 + 'px';
		}
		
		window.addEventListener("resize", changeHeightpowerdBy);
		function changeHeightpowerdBy(){
			var powerdBy = document.getElementById("link-container");
			powerdBy.style.height = window.innerHeight - 155 + 'px';
		}

		//Functions for GRID -END- //