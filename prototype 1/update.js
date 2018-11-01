function update(){
    player.updateSprite();
    tick++;
}

function setPlayerInput(){
    document.addEventListener("keydown", movePlayer);
}

function movePlayer(evt){
    if(evt.keyCode == UP_ARROW){
        updatePlayerLocationIfKeyPressed(0, -1);
    }
    if(evt.keyCode == LEFT_ARROW){
        updatePlayerLocationIfKeyPressed(-1, 0);
    }
    if(evt.keyCode == DOWN_ARROW){
        updatePlayerLocationIfKeyPressed(0, 1);
    }
    if(evt.keyCode == RIGHT_ARROW){
        updatePlayerLocationIfKeyPressed(1, 0);
    }
}


//TODO: Refactor into player class and separate out tile collision types
function updatePlayerLocationIfKeyPressed(deltaX, deltaY){

    if(isMovePosValid(player.x + deltaX, player.y + deltaY)){
        if(map[player.x + deltaX][player.y + deltaY] == getItemValInArrayByName(tiles, "enemy_red")){
            player.health -= 5;
        }
        else if(map[player.x + deltaX][player.y + deltaY] == getItemValInArrayByName(tiles, "enemy_blue")){
            player.mana -= 5;
        }
        else if(map[player.x + deltaX][player.y + deltaY] == getItemValInArrayByName(tiles, "potion_health")){
            if(player.fullHealth - player.health <= 5){
                player.health = player.fullHealth;
            }
            else{
                player.health += 5;
            }
        }
        else if(map[player.x + deltaX][player.y + deltaY] == getItemValInArrayByName(tiles, "potion_mana")){
            if(player.fullMana - player.mana <= 5){
                player.mana = player.fullMana;
            }
            else{
                player.mana += 5;
            }
        }
        else if (map[player.x + deltaX][player.y + deltaY] == getItemValInArrayByName(tiles, "door")){
            //no keys, so draw lock
            if(player.checkInventoryIncludes("key") == -1){ 
                let x = (player.x + deltaX) * TILE_WIDTH;
                let y = (player.y + deltaY) * TILE_HEIGHT;

                ctx.drawImage(getImageByName("lock"), x, y);

                /*
                let alpha = 0;
                setInterval(function(){
                    alpha += 0.1;
                    ctx.save();
                    ctx.globalAlpha = alpha;
                    ctx.drawImage(getImageByName("lock"), x, y);
                    ctx.restore();

                    if(alpha >= 1){
                        clearTimeout();
                    }
                }, FRAME_RATE);

                setTimeout(setInterval(function(){
                    alpha -= 0.1;
                    ctx.save();
                    ctx.globalAlpha = alpha;
                    ctx.drawImage(getImageByName("lock"), x, y);
                    ctx.restore();

                    if(alpha <= 0){
                        ctx.drawImage(getImageByName("door"), x, y);
                        clearTimeout();
                    }
                    
                }, FRAME_RATE), 1000);
                */

                setTimeout(function(){
                    ctx.drawImage(getImageByName("door"), x, y);
                }, 1000);
                return;
            }
            else{
                player.removeItemFromInventory("key");
            }
        }
        else if(map[player.x + deltaX][player.y + deltaY] == getItemValInArrayByName(tiles, "key")){
            player.addItemToInventory({name: "key", count: 1});
        }
        player.clearPreviousTile(player.x, player.y);
        clearMapPos(player.x, player.y, getItemValInArrayByName(tiles, "ground"));
        player.x += deltaX;
        player.y += deltaY;
        map[player.x][player.y] = getItemValInArrayByName(tiles, "player");

        player.draw();
        player.drawInventory();
    }
}