function update(){
    tick++;
    drawTiles();
    drawUI();
    drawInventory();
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
        if(map[player.x + deltaX][player.y + deltaY] == getItemValInArrayByName(tiles, "enemy")){
            playerHealth -= 5;
        }
        else if (map[player.x + deltaX][player.y + deltaY] == getItemValInArrayByName(tiles, "door")){
            if(numKeys == 0){
                console.log("no keys");
                return;
            }
            else{
                var index = getIndexOfItemInArray(inventory, "key");
                if(index == inventory.length - 1){
                    inventory.pop();
                }
                else{
                    inventory.splice(index, index + 1);
                }
                numKeys--;
            }
        }
        else if(map[player.x + deltaX][player.y + deltaY] == getItemValInArrayByName(tiles, "key")){
            inventory.push(tiles[getItemValInArrayByName(tiles, "key")]);
            numKeys++;
        }
        clearMapPos(player.x, player.y, getItemValInArrayByName(tiles, "ground"));
        player.x += deltaX;
        player.y += deltaY;
        map[player.x][player.y] = getItemValInArrayByName(tiles, "player");
        /*console.clear();
        console.log("PlayerX: " + player.x);
        console.log("PlayerY: " + player.y);
        */
    }
}