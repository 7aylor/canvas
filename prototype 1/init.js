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

var tiles = {
    ground: {val: 0 , imgLoc: IMG_PATH + "ground.png"},
    wall:   {val: 1 , imgLoc: IMG_PATH + "wall.png"},
    player: {val: 2 , imgLoc: IMG_PATH + "player.png"},
    enemy:  {val: 3 , imgLoc: IMG_PATH + "enemy.png"},
    door:   {val: 4 , imgLoc: IMG_PATH + "door.png"},
    key:    {val: 5 , imgLoc: IMG_PATH + "key.png"},
    bag:    {val: 6 , imgLoc: IMG_PATH + "bag.png"}
}

var inventory = [tiles.bag];

console.log(Object.keys(tiles));

var map = [];
var images = [];
var imagesLoaded;
var playerPos = {x: 0, y: 0};
var playerHealth = 40;
var numKeys = 0;

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
    drawInventory();
    setPlayerInput();
}

function loadImages(){

    imagesLoaded = Object.keys(tiles).length;//imagePaths.length - 1;

    for(var t in tiles){
        var obj = tiles[t];
        var img = new ImageClass(obj.imgLoc);
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
        for(var y = 0; y < NUM_ROWS - 1; y++){
            if(x == 0 || x == NUM_COLS - 1 ||
               y == 0 || y == NUM_ROWS - 2){
                map[x][y] = tiles.wall.val//TILE_WALL;
            }
            else{
                map[x][y] = tiles.ground.val;//TILE_GROUND;
            }
        }
    }

    map[5][5] = tiles.player.val//TILE_PLAYER;
    map[8][8] = tiles.enemy.val;//TILE_ENEMY;
    map[2][12] = tiles.enemy.val;//TILE_ENEMY;
    map[0][6] = tiles.door.val;//TILE_DOOR;
    map[12][6] = tiles.key.val;//TILE_KEY;
}

function drawInventory(){
    ctx.fillStyle = "red";
    ctx.fillRect(0, (NUM_ROWS - 1) * 40, canvas.width, 40);
    for(var x = 0; x < inventory.length; x++){
        console.log(images[inventory[x].val]);
        ctx.drawImage(images[inventory[x].val], 40, 40);
    }
}

function drawTiles(){
    for(var x = 0; x < NUM_COLS; x++){
        for(var y = 0; y < NUM_ROWS - 1; y++){
            if(map[x][y] != tiles.wall.val && map[x][y] != tiles.door.val){
                ctx.drawImage(images[tiles.ground.val], x * 40, y * 40);
            }
            if(map[x][y] == tiles.player.val){
                playerPos.x = x;
                playerPos.y = y;
            }
            ctx.drawImage(images[map[x][y]], x * 40, y * 40);
        }
    }
}

function ImageClass(path){
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