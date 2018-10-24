function isMovePosValid(newX, newY){
    return map[newX][newY] != tiles.wall.val;
}

function clearMapPos(x,y,tileType){
    map[x][y] = tileType;
}

function getIndexOfItemInInventory(item){
    for(var i = 0; i < inventory.length; i++){
        if(inventory[i] == item){
            console.log("item found");
            return i;
        }
    }

    return -1; //item not found in inventory
}