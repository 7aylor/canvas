var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");
const TILE_WIDTH = 40;
const TILE_HEIGHT = 40;
const NUM_COLS = canvas.width/TILE_WIDTH;
const NUM_ROWS = canvas.height/TILE_HEIGHT;
const IMG_PATH = "art/img/";
const LEFT_ARROW = 37;
const UP_ARROW = 38;
const RIGHT_ARROW = 39;
const DOWN_ARROW = 40;
const FRAME_RATE = 30;

var tick = 0;

var rawImages = [
    "ground.png", 
    "wall.png", 
    "player.png", 
    "enemy.png", 
    "door.png", 
    "key.png", 
    "bag.png"
];

var tiles = [];
var map = [];
var images = [];
var imagesLoaded;
var player;
var playerHealth = 40;
var inventory = [];
var numKeys = 0;


//TODO: Change all 40s to TILE_WIDTH or TILE_HEIGHT

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
        initMap();
        loadImages();
    }
}

function startGame(){
    setInterval(update, 1000/FRAME_RATE); //set fps to 30
    player = new PlayerClass(5, 5, 40, 1, 0, images[getIndexOfItemInArray(tiles, "player")], 0, 30);
    console.log(player);
    setPlayerInput();
}

function loadImages(){

    imagesLoaded = rawImages.length;
    /*
    imagesLoaded = Object.keys(tiles).length;//imagePaths.length - 1;

    for(var t in tiles){
        var obj = tiles[t];
        var img = new ImageClass(obj.imgLoc);
    }
    */
   for(var i = 0; i < rawImages.length; i++){
        var img = new ImageClass(tiles[i].imgLoc);
   }
}

function checkImagesLoaded(){
    imagesLoaded--;
    
    if(imagesLoaded == 0){
        startGame();
    }
}

function initTiles(){
    for(var i = 0; i < rawImages.length; i++){
        tiles.push(new TileClass(i, rawImages[i].slice(0, rawImages[i].length - 4), rawImages[i]));
    }
}

function initMap(){
    //default level
    for(var x = 0; x < NUM_COLS; x++){
        map[x] = new Array();
        for(var y = 0; y < NUM_ROWS - 1; y++){
            if(x == 0 || x == NUM_COLS - 1 ||
               y == 0 || y == NUM_ROWS - 2){
                //map[x][y] = tiles.wall.val//TILE_WALL;
                map[x][y] = getItemValInArrayByName(tiles, "wall");
            }
            else{
                //map[x][y] = tiles.ground.val;//TILE_GROUND;
                map[x][y] = getItemValInArrayByName(tiles, "ground");
            }
        }
    }

    //map[5][5] = getItemValInArrayByName(tiles, "player");//tiles.player.val//TILE_PLAYER;
    map[8][8] = getItemValInArrayByName(tiles, "enemy");//TILE_ENEMY;
    map[2][12] =  getItemValInArrayByName(tiles, "enemy");//TILE_ENEMY;
    map[0][6] =  getItemValInArrayByName(tiles, "door");//TILE_DOOR;
    map[12][6] =  getItemValInArrayByName(tiles, "key");//TILE_KEY;
    map[8][3] =  getItemValInArrayByName(tiles, "key");//TILE_KEY;
}

function initEnemies(){
    var numEnemies = Math.floor(Math.random() * 8) + 1;

    for(var i = 0; i < numEnemies; i++){

    }
}