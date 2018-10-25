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

function drawInventory(){
    ctx.fillStyle = "#a11a2c";
    ctx.fillRect(0, (NUM_ROWS - 1) * 40, canvas.width, 40);

    
    ctx.drawImage(images[getItemValInArrayByName(tiles, "bag")], 0, (NUM_ROWS - 1) * 40);
    drawSeparatorLineInInventory(41);

    for(var x = 0; x < inventory.length; x++){
        ctx.drawImage(images[inventory[x].val], (x + 1) * 40, (NUM_ROWS - 1) * 40);
        drawSeparatorLineInInventory((x + 2) * 40);
    }
}

function drawSeparatorLineInInventory(x){
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.moveTo(x, (NUM_ROWS - 1) * 40);
    ctx.lineTo(x, (NUM_ROWS) * 40);
    ctx.stroke();
}

function drawTiles(){
    for(var x = 0; x < NUM_COLS; x++){
        for(var y = 0; y < NUM_ROWS - 1; y++){
            //ground
            if(map[x][y] != getItemValInArrayByName(tiles, "wall") && map[x][y] != getItemValInArrayByName(tiles, "door")){
                ctx.drawImage(images[getItemValInArrayByName(tiles, "ground")], x * 40, y * 40);
            }
            //player
            if(map[x][y] == getItemValInArrayByName(tiles, "player")){
                playerPos.x = x;
                playerPos.y = y;
            }
            ctx.drawImage(images[map[x][y]], x * 40, y * 40);
        }
    }
}