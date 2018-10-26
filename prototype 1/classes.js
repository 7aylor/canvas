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

function PlayerClass(x, y, health, attack, numKeys, img, sprite, animSpeed){
    this.x = x * TILE_WIDTH;
    this.y = y * TILE_HEIGHT;
    this.health = health;
    this.attack = attack;
    this.numKeys = numKeys;
    this.img = img;
    this.spriteIndex = sprite;
    this.animationSpeed = animSpeed;
    this.numSprites = img.width / TILE_WIDTH;
    //this.inventory = inventory;

    this.move = function(newX, newY){
        this.x = newX * TILE_WIDTH;
        this.x = newY * TILE_HEIGHT;
    }

    this.draw = function(){
        ctx.drawImage(img, spriteIndex * TILE_WIDTH, 0, TILE_WIDTH, TILE_HEIGHT, 0, 0, TILE_WIDTH, TILE_HEIGHT);
    }

    this.updateSprite = function(){
        if(tick % animSpeed == 0){
            if(spriteIndex == numSprites){
                spriteIndex = 0;
            }
            else{
                spriteIndex++;
            }
        }
    }
}