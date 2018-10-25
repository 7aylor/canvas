function TileClass(val, name, imgName){
    this.val = val;
    this.name = name;
    this.imgLoc = IMG_PATH + imgName;
}

function ImageClass(path){
    this.image = new Image();
    this.image.src = path;
    images.push(this.image);
    
    this.image.onload = this.loadImage;

    this.loadImage = checkImagesLoaded();
}

function Player(x, y, health, attack, numKeys, img){
    this.x = x;
    this.y = y;
    this.health = health;
    this.attack = attack;
    this.numKeys = numKeys;
    this.img = img;
    //this.sprite = sprite;
    //this.inventory = inventory;
}