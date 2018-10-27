function drawAll(){
    drawTiles();
    player.draw();
    drawUI();
    drawInventory();
    console.log("drawAll called");
}

function drawUI(){
    drawPlayerHealth();
}

function drawPlayerHealth(){
    ctx.fillStyle = "#00ff00";
    ctx.fillRect(player.x * TILE_WIDTH, player.y * TILE_HEIGHT - 3, 40, 2);
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(player.x * TILE_WIDTH + playerHealth, player.y * TILE_HEIGHT - 3, TILE_WIDTH - playerHealth, 2);
}

function drawInventory(){
    ctx.fillStyle = "#a11a2c";
    ctx.fillRect(0, (NUM_ROWS - 1) * TILE_WIDTH, canvas.width, TILE_HEIGHT);

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
                player.x = x;
                player.y = y;
            }
            ctx.drawImage(images[map[x][y]], x * 40, y * 40);
        }
    }
}