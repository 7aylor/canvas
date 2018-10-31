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

function updatePlayerLocationIfKeyPressed(deltaX, deltaY){

    if(isMovePosValid(player.x + deltaX, player.y + deltaY)){
        if(map[player.x + deltaX][player.y + deltaY] == getItemValInArrayByName(tiles, "enemy_red")){
            player.health -= 5;
        }
        if(map[player.x + deltaX][player.y + deltaY] == getItemValInArrayByName(tiles, "enemy_blue")){
            player.mana -= 5;
        }
        else if (map[player.x + deltaX][player.y + deltaY] == getItemValInArrayByName(tiles, "door")){
            if(player.checkInventoryIncludes("key") == -1){
                console.log("no keys");
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