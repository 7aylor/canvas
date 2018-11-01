//TODO: Item Class, Enemy Class

function TileClass(val, name, imgName){
    this.val = val;
    this.name = name;
    this.imgLoc = IMG_PATH + imgName;
}

function ImageClass(path, name){
    this.image = new Image();
    this.isLoaded = false;
    this.image.name = name;
    this.image.onload = function () {
        checkImagesLoaded(this.image);
    }.bind(this);
    this.image.src = path;
}

function PlayerClass(x, y, health, attack, numKeys, img, bground, sprite, animSpeed){
    this.x = x;
    this.y = y;
    this.health = health;
    this.fullHealth = health;
    this.mana = health;
    this.fullMana = this.mana;
    this.attack = attack;
    this.numKeys = numKeys;
    this.img = img;
    this.backgroundImage = bground;
    this.spriteIndex = sprite;
    this.animationSpeed = animSpeed;
    this.numSprites = img.width / TILE_WIDTH;
    this.inventory = []; //obj format: {name: string, count: int}

    this.move = function(newX, newY){
        this.x = newX * TILE_WIDTH;
        this.x = newY * TILE_HEIGHT;
    }

    //draws background, then player, then stat bars. Called each sprite change
    this.draw = function(){
        this.drawBackground(this.x, this.y);
        ctx.drawImage(this.img, this.spriteIndex * TILE_WIDTH, 0, TILE_WIDTH, TILE_HEIGHT, 
                      this.x * 40, this.y * 40, TILE_WIDTH, TILE_HEIGHT);
        //this.drawStatBar(this.y * TILE_HEIGHT, "#00ff00","#ff0000", this.health);
        //this.drawStatBar(this.y * TILE_HEIGHT + 2, "#0000ff","#ff0000", this.mana);
        this.drawHealthMana();
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

    //TODO: Experiment with not using a stat bar and using health and mana icons in inventory area
    //draws stat bar
    this.drawStatBar = function(y, colorFilled, colorDepleted, type){
        ctx.fillStyle = colorFilled;
        ctx.fillRect(this.x * TILE_WIDTH, y, 40, 2);
        ctx.fillStyle = colorDepleted;
        ctx.fillRect(this.x * TILE_WIDTH + type, y, TILE_WIDTH - type, 2);
    }

    this.drawHealthMana = function(){
        //health
        let healthX = (NUM_COLS - 2) * TILE_WIDTH;
        let manaX = (NUM_COLS - 1) * TILE_WIDTH;
        let statsY = (NUM_ROWS - 1) * TILE_HEIGHT;

        //red circle
        ctx.beginPath();
        ctx.fillStyle = "#a11a2c";
        ctx.arc(healthX + (TILE_WIDTH / 2), statsY + (TILE_HEIGHT / 2), (TILE_WIDTH / 2), 0, 2 * Math.PI);
        ctx.fill();

        //health damage
        ctx.fillStyle = "#276647";
        ctx.fillRect(healthX, statsY, TILE_WIDTH, this.fullHealth - this.health);

        //outline
        ctx.drawImage(getImageByName("health_mana"), healthX, statsY);

        //mana
        ctx.beginPath();
        ctx.fillStyle = "#2b3061";
        ctx.arc(manaX + (TILE_WIDTH / 2), statsY + (TILE_HEIGHT / 2), TILE_WIDTH / 2, 0, 2 * Math.PI);
        ctx.fill();

        //mana damage
        ctx.fillStyle = "#276647";
        ctx.fillRect(manaX, statsY, TILE_WIDTH, this.fullMana - this.mana);

        //outline
        ctx.drawImage(getImageByName("health_mana"), manaX, statsY);
    }

    //adds an item to the inventory. Must pass entire item object: name, count
    this.addItemToInventory = function(obj){
        //check if item is in invetory already
        var itemIndex = this.checkInventoryIncludes(obj.name);
        
        //if item is found, increase count of that item
        if(itemIndex != -1){
            this.inventory[itemIndex].count++;
        }
        //otherwise, push whole object into inventory
        else{
            this.inventory.push(obj);
        }

        this.drawInventory();
    }

    //checks if invetory has an item by name. Returns index or -1 if not found
    this.checkInventoryIncludes = function(name){
        for(var i = 0; i < this.inventory.length; i++){
            if(this.inventory[i].name === name){
                return i;
            }
        }

        return -1;
    }

    this.removeItemFromInventory = function(name){
        var index = this.checkInventoryIncludes(name);

        if(index != -1){
            if(this.inventory[index].count <= 1){
                if(index == this.inventory.length - 1){
                    this.inventory.pop();
                }
                else{
                    this.inventory.splice(index, 1);
                }
            }
            else{
                this.inventory[index].count--;
            }
        }
    }

    this.drawInventory = function(){
        ctx.fillStyle = "#276647";
        ctx.fillRect(0, (NUM_ROWS - 1) * TILE_WIDTH, canvas.width, TILE_HEIGHT);
    
        ctx.drawImage(images[getItemValInArrayByName(tiles, "bag")], 0, (NUM_ROWS - 1) * 40);
        this.drawSeparatorLineInInventory(41);
    
        for(var x = 0; x < this.inventory.length; x++){
            //check for multiple items? if so, draw image and count
            var img = getImageByName(this.inventory[x].name);
            if(img != -1){
                ctx.drawImage(img, (x + 1) * 40, (NUM_ROWS - 1) * 40);
                ctx.fillStyle = "white";
                ctx.font = "12px Arial";
                ctx.fontWeight = "bold";
                ctx.fillText("x" + this.inventory[x].count, ((x + 2) * 40) - 16, ((NUM_ROWS) * 40 - 2));
                this.drawSeparatorLineInInventory((x + 2) * 40);
            }
        }
    }
    
    this.drawSeparatorLineInInventory = function(x){
        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.moveTo(x, (NUM_ROWS - 1) * 40);
        ctx.lineTo(x, (NUM_ROWS) * 40);
        ctx.stroke();
    }
}

