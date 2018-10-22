var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");
const TILE_WIDTH = 40;
const TILE_HEIGHT = 40;
const NUM_COLS = canvas.width/TILE_WIDTH;
const NUM_ROWS = canvas.height/TILE_HEIGHT;
const TILE_GROUND = 0;
const TILE_WALL = 1;
const TILE_PLAYER = 2;
const TILE_ENEMY = 3;
const TILE_DOOR = 4;
const TILE_KEY = 5;
const IMG_PATH = "art/img/";


var map = [];
var images = [];
var imagesLoaded;
var playerPos = {x: 0, y: 0};
var playerHealth = 40;

window.onload = function(){
    init();
}

//get canvas and ctx
function init(){
    //if we can't get canvas context, user is on an unsupported browser
    if(!ctx){
        document.createTextNode("Unsupported browser");
    }
    else{
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        initTiles();
        loadImages();
    }
}

function startGame(){
    setInterval(update, 1000/30); //set fps to 30
    setPlayerInput();
}

function loadImages(){

    var imagePaths = [IMG_PATH + "ground.png", 
                      IMG_PATH + "wall.png",
                      IMG_PATH + "player.png",
                      IMG_PATH + "enemy.png",
                      IMG_PATH + "door.png",
                      IMG_PATH + "key.png"];

    imagesLoaded = imagePaths.length - 1;

    for(var i = 0; i < imagePaths.length; i++){
        var img = new ImageClass(imagePaths[i], i);
    }
}

function checkImagesLoaded(){
    imagesLoaded--;
    if(imagesLoaded == 0){
        startGame();
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
    map[8][8] = TILE_ENEMY;
    map[2][13] = TILE_ENEMY;
    map[0][6] = TILE_DOOR;
    map[12][6] = TILE_KEY;
}

function drawTiles(){
    for(var x = 0; x < NUM_COLS; x++){
        for(var y = 0; y < NUM_ROWS; y++){
            if(map[x][y] != TILE_WALL && map[x][y] != TILE_DOOR){
                ctx.drawImage(images[TILE_GROUND], x * 40, y * 40);
            }
            if(map[x][y] == TILE_PLAYER){
                playerPos.x = x;
                playerPos.y = y;
            }
            ctx.drawImage(images[map[x][y]], x * 40, y * 40);
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

function initEnemies(){
    var numEnemies = Math.floor(Math.random() * 8) + 1;

    for(var i = 0; i < numEnemies; i++){

    }
}