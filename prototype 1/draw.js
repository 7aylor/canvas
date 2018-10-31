function drawAll(){
    drawTiles();
    player.draw();
}

function drawTiles(){
    for(var x = 0; x < NUM_COLS; x++){
        for(var y = 0; y < NUM_ROWS - 1; y++){
            //ground
            if(map[x][y] != getItemValInArrayByName(tiles, "wall") && map[x][y] != getItemValInArrayByName(tiles, "door")){
                ctx.drawImage(images[getItemValInArrayByName(tiles, "ground")], x * 40, y * 40);
            }
            ctx.drawImage(images[map[x][y]], x * 40, y * 40);
        }
    }
}