const CANVAS = document.getElementById("game");
const CTX = CANVAS.getContext("2d");

window.onload = function(){
    init();
}

//get canvas and ctx
function init(){
    //if we can't get canvas context, user is on an unsupported browser
    if(!CTX){
        document.createTextNode("Unsupported browser");
    }
    else{
        
        CANVAS.width = 800;
        CANVAS.height = 600;
        CTX.fillStyle = "black";
        CTX.fillRect(0, 0, CANVAS.width, CANVAS.height);
        setInterval(update, 1000/30); //set fps to 30
    }
}

function update(){
    
}