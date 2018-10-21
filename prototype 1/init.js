const CANVAS = document.getElementById("game");
const CTX = CANVAS.getContext("2d");
const TILE_WIDTH = 40;
const TILE_HEIGHT = 40;
const NUM_COLS = CANVAS.width/TILE_WIDTH;
const NUM_ROWS = CANVAS.height/TILE_HEIGHT;
const TILE_GROUND = 0;
const TILE_WALL = 1;
const TILE_PLAYER = 2;
const imgPath = "art/img/";

var map = [];
var images = [];
var imagesLoaded;

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
        CTX.fillStyle = "black";
        CTX.fillRect(0, 0, CANVAS.width, CANVAS.height);
        initTiles();
        loadImages();
    }
}

function startGame(){
    setInterval(update, 1000/30); //set fps to 30
}

function loadImages(){

    var imagePaths = [imgPath + "ground.png", 
                      imgPath + "wall.png",
                      imgPath + "player.png"];

    imagesLoaded = imagePaths.length - 1;

    for(var i = 0; i < imagePaths.length; i++){
        var img = new ImageClass(imagePaths[i], i);
    }

}

function initTiles(){
    for(var x = 0; x < NUM_COLS; x++){
        map[x] = new Array();
        for(var y = 0; y < NUM_ROWS; y++){
            if(x == 0 || x == NUM_COLS - 1 ||
               y == 0 || y == NUM_ROWS - 1){
                map[x][y] = TILE_WALL;
            }
            else{
                map[x][y] = TILE_GROUND;
            }
        }
    }

    map[5][5] = TILE_PLAYER;
}

function drawTiles(){
    for(var x = 0; x < NUM_COLS; x++){
        for(var y = 0; y < NUM_ROWS; y++){
            if(map[x][y] == TILE_PLAYER){
                CTX.drawImage(images[TILE_GROUND], x * 40, y * 40);
            }
            CTX.drawImage(images[map[x][y]], x * 40, y * 40);
        }
    }
}

function ImageClass(path, tileType){
    this.loc = path;
    this.image = new Image();
    this.image.src = this.loc;
    images.push(this.image);
    
    this.image.onload = this.loadImage;

    this.loadImage = checkImagesLoaded();
}

function checkImagesLoaded(){
    console.log(imagesLoaded);
    imagesLoaded--;
    if(imagesLoaded == 0){
        startGame();
    }
}