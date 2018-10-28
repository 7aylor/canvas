function TileClass(val, name, imgName){
    this.val = val;
    this.name = name;
    this.imgLoc = IMG_PATH + imgName;
}

function ImageClass(path){
    this.image = new Image();
    this.isLoaded = false;
    this.image.onload = function () {
        checkImagesLoaded(this.image);
    }.bind(this);
    this.image.src = path;
}

function PlayerClass(x, y, health, attack, numKeys, img, sprite, animSpeed){
    this.x = x;
    this.y = y;
    this.health = health;
    this.mana = health;
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
        ctx.drawImage(img, this.spriteIndex * TILE_WIDTH, 0, TILE_WIDTH, TILE_HEIGHT, this.x * 40, this.y * 40, TILE_WIDTH, TILE_HEIGHT);
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