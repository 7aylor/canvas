function isMovePosValid(newX, newY){
    return map[newX][newY] != getItemValInArrayByName(tiles, "wall");
}

function clearMapPos(x,y,tileType){
    map[x][y] = tileType;
}

//gets the item value in a given array (value determines what draws on the map)
function getItemValInArrayByName(arr, name){
    for(var i = 0; i < arr.length; i++){
        if(arr[i].name === name){
            return arr[i].val;
        }
    }
    return -1; //-1 indicates not found
}

function getIndexOfItemInArray(arr, name){
    for(var i = 0; i < arr.length; i++){
        if(arr[i].name === name){
            return i;
        }
    }
    return -1; //-1 indicates not found
}

function getImageByName(name){
   for(var i = 0; i < images.length; i++){
       if(images[i].name === name){
           return images[i];
       }
   }

   return -1; //didn't find image
}