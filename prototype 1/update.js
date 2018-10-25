function update(){
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
    if(isMovePosValid(playerPos.x + deltaX, playerPos.y + deltaY)){
        if(map[playerPos.x + deltaX][playerPos.y + deltaY] == getItemValInArrayByName(tiles, "enemy")){
            playerHealth -= 5;
        }
        else if (map[playerPos.x + deltaX][playerPos.y + deltaY] == getItemValInArrayByName(tiles, "door")){
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
        else if(map[playerPos.x + deltaX][playerPos.y + deltaY] == getItemValInArrayByName(tiles, "key")){
            inventory.push(tiles[getItemValInArrayByName(tiles, "key")]);
            numKeys++;
        }
        clearMapPos(playerPos.x, playerPos.y, getItemValInArrayByName(tiles, "ground"));
        playerPos.x += deltaX;
        playerPos.y += deltaY;
        map[playerPos.x][playerPos.y] = getItemValInArrayByName(tiles, "player");
        /*console.clear();
        console.log("PlayerX: " + playerPos.x);
        console.log("PlayerY: " + playerPos.y);
        */
    }
}