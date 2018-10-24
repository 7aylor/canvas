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
        if(map[playerPos.x + deltaX][playerPos.y + deltaY] == tiles.enemy.val){
            playerHealth -= 5;
        }
        else if (map[playerPos.x + deltaX][playerPos.y + deltaY] == tiles.door.val){
            if(numKeys == 0){
                console.log("no keys");
                return;
            }
            else{
                var index = getIndexOfItemInInventory(tiles.key);
                if(index == inventory.length){
                    inventory.pop();
                }
                else{
                    inventory.splice(index, index + 1);
                }
                numKeys--;
            }
        }
        else if(map[playerPos.x + deltaX][playerPos.y + deltaY] == tiles.key.val){
            inventory.push(tiles.key);
            numKeys++;
        }
        clearMapPos(playerPos.x, playerPos.y, tiles.ground.val);
        playerPos.x += deltaX;
        playerPos.y += deltaY;
        map[playerPos.x][playerPos.y] = tiles.player.val;
        /*console.clear();
        console.log("PlayerX: " + playerPos.x);
        console.log("PlayerY: " + playerPos.y);
        */
    }
}