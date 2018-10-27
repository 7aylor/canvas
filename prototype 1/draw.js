function drawAll(){
    drawTiles();
    player.draw();
    drawUI();
    drawInventory();
    console.log("drawAll called");
}

function drawUI(){
    drawPlayerStatBar(player.y * TILE_HEIGHT - 4, "#00ff00","#ff0000", player.health);
    drawPlayerStatBar(player.y * TILE_HEIGHT - 2, "#0000ff","#ff0000", player.mana);
}

function drawPlayerStatBar(y, colorFilled, colorDepleted, type){
    ctx.fillStyle = colorFilled;//"#00ff00";
    ctx.fillRect(player.x * TILE_WIDTH, y, 40, 2);
    ctx.fillStyle = colorDepleted;//"#ff0000";
    ctx.fillRect(player.x * TILE_WIDTH + type, y, TILE_WIDTH - type, 2);
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