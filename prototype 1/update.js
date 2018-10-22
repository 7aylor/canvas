function update(){
    drawTiles();
    drawUI();
}

function setPlayerInput(){
    document.addEventListener("keydown", movePlayer);
}

function movePlayer(evt){
    if(evt.keyCode == 87){ //w
        updatePlayerLocationIfKeyPressed(0, -1);
    }
    if(evt.keyCode == 65){ //a
        updatePlayerLocationIfKeyPressed(-1, 0);
    }
    if(evt.keyCode == 83){ //s
        updatePlayerLocationIfKeyPressed(0, 1);
    }
    if(evt.keyCode == 68){ //d
        updatePlayerLocationIfKeyPressed(1, 0);
    }
}

function clearMapPos(x,y,tileType){
    map[x][y] = tileType;
}

function updatePlayerLocationIfKeyPressed(deltaX, deltaY){
    if(movePosValid(playerPos.x + deltaX, playerPos.y + deltaY)){
        if(map[playerPos.x + deltaX][playerPos.y + deltaY] == TILE_ENEMY){
            playerHealth -= 5;
        }
        clearMapPos(playerPos.x, playerPos.y, TILE_GROUND);
        playerPos.x += deltaX;
        playerPos.y += deltaY;
        map[playerPos.x][playerPos.y] = TILE_PLAYER;
        console.clear();
        console.log("PlayerX: " + playerPos.x);
        console.log("PlayerY: " + playerPos.y);
    }
}

function movePosValid(newX, newY){
    if(map[newX][newY] == TILE_DOOR){
        initTiles();
        return;
    }
    return map[newX][newY] != TILE_WALL;
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