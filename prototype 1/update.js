function update(){
    drawTiles();
    drawUI();
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

function clearMapPos(x,y,tileType){
    map[x][y] = tileType;
}

function updatePlayerLocationIfKeyPressed(deltaX, deltaY){
    if(movePosValid(playerPos.x + deltaX, playerPos.y + deltaY)){
        if(map[playerPos.x + deltaX][playerPos.y + deltaY] == tiles.enemy.val){
            playerHealth -= 5;
        }
        else if (map[playerPos.x + deltaX][playerPos.y + deltaY] == tiles.door.val){
            if(numKeys == 0){
                console.log("no keys");
                return;
            }
            else{
                numKeys--;
            }
        }
        else if(map[playerPos.x + deltaX][playerPos.y + deltaY] == tiles.key.val){
            numKeys++;
        }
        clearMapPos(playerPos.x, playerPos.y, tiles.ground.val);
        playerPos.x += deltaX;
        playerPos.y += deltaY;
        map[playerPos.x][playerPos.y] = tiles.player.val;
        console.clear();
        console.log("PlayerX: " + playerPos.x);
        console.log("PlayerY: " + playerPos.y);
    }
}

function movePosValid(newX, newY){
    return map[newX][newY] != tiles.wall.val;
}

function drawUI(){
    drawPlayerHealth();
}

function drawPlayerHealth(){
    //playerHealth = 30;
    ctx.fillStyle = "#00ff00";
    ctx.fillRect(playerPos.x * 40, playerPos.y * 40 - 3, 40, 2);
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(playerPos.x * 40 + playerHealth, playerPos.y * 40 - 3, 40 - playerHealth, 2);
}