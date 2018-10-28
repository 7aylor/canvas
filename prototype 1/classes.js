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

function PlayerClass(x, y, health, attack, numKeys, img, bground, sprite, animSpeed){
    this.x = x;
    this.y = y;
    this.health = health;
    this.mana = health;
    this.attack = attack;
    this.numKeys = numKeys;
    this.img = img;
    this.backgroundImage = bground;
    this.spriteIndex = sprite;
    this.animationSpeed = animSpeed;
    this.numSprites = img.width / TILE_WIDTH;
    //this.inventory = inventory;

    this.move = function(newX, newY){
        this.x = newX * TILE_WIDTH;
        this.x = newY * TILE_HEIGHT;
    }

    //draws background, then player, then stat bars. Called each sprite change
    this.draw = function(){
        this.drawBackground(this.x, this.y);
        ctx.drawImage(this.img, this.spriteIndex * TILE_WIDTH, 0, TILE_WIDTH, TILE_HEIGHT, this.x * 40, this.y * 40, TILE_WIDTH, TILE_HEIGHT);
        this.drawStatBar(this.y * TILE_HEIGHT, "#00ff00","#ff0000", this.health);
        this.drawStatBar(this.y * TILE_HEIGHT + 2, "#0000ff","#ff0000", this.mana);
    }

    //draws player background
    this.drawBackground = function (newX, newY){
        ctx.drawImage(this.backgroundImage, newX * TILE_WIDTH, newY * TILE_HEIGHT, TILE_WIDTH, TILE_HEIGHT);
    }

    //updates the player sprite at the animation speed. Called via update()
    this.updateSprite = function(){
        if(tick % animSpeed == 0){
            this.draw();
            if(this.spriteIndex == this.numSprites - 1){
                this.spriteIndex = 0;
            }
            else{
                this.spriteIndex++;
            }
        }
    }

    //clears the previous tile, used when button is pressed to move player
    this.clearPreviousTile = function(oldX, oldY){
        this.drawBackground(oldX, oldY);
    }

    //draws stat bar
    this.drawStatBar = function(y, colorFilled, colorDepleted, type){
        ctx.fillStyle = colorFilled;
        ctx.fillRect(this.x * TILE_WIDTH, y, 40, 2);
        ctx.fillStyle = colorDepleted;
        ctx.fillRect(this.x * TILE_WIDTH + type, y, TILE_WIDTH - type, 2);
    }
}