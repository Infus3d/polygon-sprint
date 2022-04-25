class Game {
    constructor() {
        this.world = new Game.World();
        this.update = function () {
            this.world.update();
        };
    }
}

Game.World = class {
    constructor(friction = 0.8, gravity = 3){
        this.friction = friction;
        this.gravity = gravity;

        this.columns = 30;
        this.rows = 20;

        this.score_columns = 30;
        this.score_rows = 3;

        this.tile_set = new Game.World.TileSet(32);
        let colOffset = new Object();
        colOffset.left = 6, colOffset.right = 6, colOffset.top = 3, colOffset.bottom = 3;
        this.player = new Game.World.Player(40, 300, colOffset);
        this.collider = new Game.Collider();

        this.room_id = "01";
        this.doors = [];
        this.triggeredDoor = undefined;
        
        this.map = [];
        this.collision_map = [];

        this.coins = [];
        this.coinCount = 0;

        this.keys = [];
        this.keyStatus = [];
        this.totalKeys = 0;

        this.flies = [];
        this.slimes = [];

        this.width = this.tile_set.tile_size * this.columns;
        this.height = this.tile_set.tile_size * this.rows;

        this.difficulty = null;
        this.level = undefined;

        this.gameOver = false;
    }

    setDifficulty(difficulty, level) {
        this.difficulty = difficulty;
        this.level = level;

        this.totalKeys = level.keyCount;
        for(let i=0; i<this.totalKeys; i++)
            this.keyStatus[i] = 0;
    }

    setup(room){
        this.doors = [];
        this.coins = [];
        this.flies = [];
        this.slimes = [];
        this.keys = [];

        this.map = room.map;
        this.collision_map = Game.Collider.getCollisionMap(this.map);
        this.columns = room.columns;
        this.rows = room.rows;
        this.room_id = room.id;

        for(let i = room.doors.length-1; i >= 0; i--){
            let curDoor = room.doors[i];
            let colOffset = [];
            colOffset.left = 0, colOffset.right = 0, colOffset.top = 0, colOffset.bottom = 0;
            this.doors[i] = new Game.Door(curDoor, this.tile_set.tile_size, colOffset);
        }

        for(let i = room.keys.length-1; i >= 0; i--){
            let curKey = room.keys[i];
            let colOffset = [];
            colOffset.left = 1, colOffset.right = 1, colOffset.top = 2, colOffset.bottom = 2;
            this.keys.push(new Game.Key(curKey.x, curKey.y, curKey.keyNumber, colOffset));
        }

        for(let i = room.coins.length-1; i >= 0; i--){
            let curCoin = room.coins[i];
            let colOffset = [];
            colOffset.left = 0, colOffset.right = 0, colOffset.top = 0, colOffset.bottom = 0;
            this.coins.push(new Game.Coin(curCoin[0], curCoin[1], this.tile_set.tile_size, colOffset));
        }

        for(let i = room.flies.length-1; i >= 0; i--){
            let curFly = room.flies[i];
            let colOffset = [];
            colOffset.left = 15, colOffset.right = 15, colOffset.top = 4, colOffset.bottom = 2;
            this.flies.push(new Game.Fly(curFly.start_x, curFly.start_y, curFly.end_x, curFly.end_y, colOffset));
        }

        for(let i = room.slimes.length-1; i >= 0; i--){
            let curSlime = room.slimes[i];
            let colOffset = [];
            colOffset.left = 3, colOffset.right = 3, colOffset.top = 2, colOffset.bottom = 0;
            this.slimes.push(new Game.Slime(curSlime.start_x, curSlime.start_y, curSlime.end_x, curSlime.end_y, colOffset));
        }

        //-1 is the reserved number -> it indicates that we should keep the position in that axis
        if(this.triggeredDoor != undefined){
            if(this.triggeredDoor.destination_x != -1){
                this.player.setCenterX(this.triggeredDoor.destination_x);
                this.player.setOldCenterX(this.triggeredDoor.destination_x); //need to reset the previous positions
            }
            
            if(this.triggeredDoor.destination_y != -1){
                this.player.setCenterY(this.triggeredDoor.destination_y);
                this.player.setOldCenterY(this.triggeredDoor.destination_y); //again important to reset both
            }
            document.getElementById("ppp").innerHTML = "" + this.player.getTop() + " " + this.player.getLeft() + " | " + this.triggeredDoor.destination_x + " " + this.triggeredDoor.destination_y;

            this.triggeredDoor = undefined;
        }
    }

    update(){
        for(let i = this.doors.length-1; i >= 0; i--){
            let curDoor = this.doors[i];
            if(curDoor.collideObjectCenter(this.player))
                this.triggeredDoor = curDoor;
        }

        for(let i = this.keys.length-1; i >= 0; i--){
            let curKey = this.keys[i];
            if(curKey.collideObject(this.player)){
                for(let j = this.level[this.room_id]['keys'].length-1; j >= 0; j--){
                    let tempKey = this.level[this.room_id]['keys'][j];
                    if(tempKey.x == curKey.x && tempKey.y == curKey.y){
                        this.level[this.room_id]['keys'].splice(this.level[this.room_id]['keys'].indexOf(tempKey), 1);
                        break;
                    }
                }
                this.keys.splice(this.keys.indexOf(curKey), 1);
                this.keyStatus[curKey.keyNumber] ^= 1;
            }
        }

        for(let i = this.coins.length-1; i >= 0; i--){
            let curCoin = this.coins[i];
            curCoin.animate();

            if(curCoin.collideObject(this.player)){
                // Need to erase the coin from this level to make sure it doesn't reappear again
                for(let j = this.level[this.room_id]['coins'].length-1; j >= 0; j--){
                    let tempCoin = this.level[this.room_id]['coins'][j];
                    if(tempCoin[0] == curCoin.tile_x && tempCoin[1] == curCoin.tile_y){
                        this.level[this.room_id]['coins'].splice(this.level[this.room_id]['coins'].indexOf(tempCoin), 1);
                        break;
                    }
                }

                this.coins.splice(this.coins.indexOf(curCoin), 1);
                this.coinCount++; //This is the coin score, need to do something with it
            }
        }

        for(let i = this.flies.length-1; i >= 0; i--){
            let curFly = this.flies[i];
            if(curFly.collideObject(this.player)){
                this.gameOver = true;
                return;
            }
            curFly.updatePosition();
            curFly.animate();
        }

        for(let i = this.slimes.length-1; i >= 0; i--){
            let curSlime = this.slimes[i];
            if(curSlime.collideObject(this.player)){
                this.gameOver = true;
                return;
            }
            curSlime.updatePosition();
            curSlime.animate();
        }

        this.player.updatePosition(this.gravity, this.friction);
        this.collideObject(this.player);
        this.player.updateAnimation();
    }

    /**
     * this gives the tile value underneath the player a.k.a tile player is standing on. we can update it so that it checks all around the player
     */
    getTileValue(){
        //this gets the tile underneath the player
        let a = Math.floor(this.player.getCenterX() / 32);
        let b = Math.floor(this.player.getBottom() / 32);
        return this.map[b * this.columns + a]; //30 represents the 30 columns
    }

    collideObject(obj){
        //Making sure the object stays within this 'world'
        // if(obj.getLeft() < 0) { obj.setLeft(0); obj.velocity_x = 0; }
        // if(obj.getRight() > this.width) { obj.setRight(this.width); obj.velocity_x = 0; }
        // if(obj.getTop() < 0) { obj.setTop(0); obj.velocity_y = 0; }
        // if(obj.getBottom() > this.height) { obj.setBottom(this.height); obj.velocity_y = 0; obj.jumping = false; }


        /**
            The side values refer to the tile grid
            row and column spaces that the object is occupying on each of its sides. For
            instance bottom refers to the row in the collision map that the bottom of the
            object occupies. Right refers to the column in the collision map occupied by
            the right side of the object. Collision_value refers to the value of a collision tile in
            the map under the specified row and column occupied by the object.
         */
        let collision_value, top, right, bottom, left, horMid, verMid, tile_value;
        /**
            testing the top left corner of the object. We get the row and column
            the object occupies in the collision map, then we get the collision_type from the collision map
            at that row and column. In this case the row is top and the column is left. Then
            we hand the information to the collider's routeCollision function.

            We do this for all four corners of the object.
         */
        top = Math.floor(obj.getTop() / this.tile_set.tile_size);  //this are actually just the
        left = Math.floor(obj.getLeft() / this.tile_set.tile_size); // [x, y] coordinates of the tile
        collision_value = this.collision_map[top * this.columns + left];
        tile_value = this.map[top * this.columns + left];
        if(top >= 0 && left >= 0) this.collider.routeCollision(tile_value, collision_value, obj, left * this.tile_set.tile_size, top * this.tile_set.tile_size, this.tile_set.tile_size);

        top = Math.floor(obj.getTop() / this.tile_set.tile_size);
        right = Math.floor(obj.getRight() / this.tile_set.tile_size);
        collision_value = this.collision_map[top * this.columns + right];
        tile_value = this.map[top * this.columns + right];
        if(top >= 0 && right < this.columns) this.collider.routeCollision(tile_value, collision_value, obj, right * this.tile_set.tile_size, top * this.tile_set.tile_size, this.tile_set.tile_size);

        bottom = Math.floor(obj.getBottom() / this.tile_set.tile_size);
        left = Math.floor(obj.getLeft() / this.tile_set.tile_size);
        collision_value = this.collision_map[bottom * this.columns + left];
        tile_value = this.map[bottom * this.columns + left];
        if(bottom < this.rows && left >= 0) this.collider.routeCollision(tile_value, collision_value, obj, left * this.tile_set.tile_size, bottom * this.tile_set.tile_size, this.tile_set.tile_size);

        bottom = Math.floor(obj.getBottom() / this.tile_set.tile_size);
        right = Math.floor(obj.getRight() / this.tile_set.tile_size);
        collision_value = this.collision_map[bottom * this.columns + right];
        tile_value = this.map[bottom * this.columns + right];
        if(right < this.columns && bottom < this.rows) this.collider.routeCollision(tile_value, collision_value, obj, right * this.tile_set.tile_size, bottom * this.tile_set.tile_size, this.tile_set.tile_size);


        top = Math.floor(obj.getTop() / this.tile_set.tile_size);
        horMid = Math.floor((obj.getLeft() + obj.width * 0.5) / this.tile_set.tile_size);
        collision_value = this.collision_map[top * this.columns + horMid];
        tile_value = this.map[top * this.columns + horMid];
        if(top >= 0) this.collider.routeCollision(tile_value, collision_value, obj, horMid * this.tile_set.tile_size, top * this.tile_set.tile_size, this.tile_set.tile_size);

        bottom = Math.floor(obj.getBottom() / this.tile_set.tile_size);
        horMid = Math.floor((obj.getLeft() + obj.width * 0.5) / this.tile_set.tile_size);
        collision_value = this.collision_map[bottom * this.columns + horMid];
        tile_value = this.map[bottom * this.columns + horMid];
        if(bottom < this.rows) this.collider.routeCollision(tile_value, collision_value, obj, horMid * this.tile_set.tile_size, bottom * this.tile_set.tile_size, this.tile_set.tile_size);

        verMid = Math.floor((obj.getTop() + obj.height * 0.5) / this.tile_set.tile_size);
        left = Math.floor(obj.getLeft() / this.tile_set.tile_size);
        collision_value = this.collision_map[verMid * this.columns + left];
        tile_value = this.map[verMid * this.columns + left];
        if(left >= 0) this.collider.routeCollision(tile_value, collision_value, obj, left * this.tile_set.tile_size, verMid * this.tile_set.tile_size, this.tile_set.tile_size);

        verMid = Math.floor((obj.getTop() + obj.height * 0.5) / this.tile_set.tile_size);
        right = Math.floor(obj.getRight() / this.tile_set.tile_size);
        collision_value = this.collision_map[verMid * this.columns + right];
        tile_value = this.map[verMid * this.columns + right];
        if(right < this.columns) this.collider.routeCollision(tile_value, collision_value, obj, right * this.tile_set.tile_size, verMid * this.tile_set.tile_size, this.tile_set.tile_size);
    }
}

Game.Collider = class {
    constructor(){
        this.routeCollision = function(tile_value, value, object, tile_x, tile_y, tile_size){
            
            switch(value) { // which value does our tile have?

                /*  All 15 tile types can be described with only 4 collision methods. These
                    methods are mixed and matched for each unique tile.
                    Since the tiles are squares in our game, it can have 4 different sides to collide with.
                    You can imagine a binary number [0000] where each bit represents one side of the square.
                    If there is a wall on that side, the bit is set 1, and 0 if there is not a wall.
                */
        
                case  1: this.collidePlatformTop      (tile_value, object, tile_y, tile_size); break;
                case  2: this.collidePlatformRight    (tile_value, object, tile_x, tile_size); break;
                case  3: if (this.collidePlatformTop  (tile_value, object, tile_y, tile_size)) return; // If there's a collision, we don't need to check for anything else.
                        this.collidePlatformRight    (tile_value, object, tile_x, tile_size); break;
                case  4: this.collidePlatformBottom   (tile_value, object, tile_y, tile_size); break;
                case  5: if (this.collidePlatformTop  (tile_value, object, tile_y, tile_size)) return;
                        this.collidePlatformBottom   (tile_value, object, tile_y, tile_size); break;
                case  6: if (this.collidePlatformRight(tile_value, object, tile_x, tile_size)) return;
                        this.collidePlatformBottom   (tile_value, object, tile_y, tile_size); break;
                case  7: if (this.collidePlatformTop  (tile_value, object, tile_y, tile_size)) return;
                        if (this.collidePlatformRight(tile_value, object, tile_x, tile_size)) return;
                        this.collidePlatformBottom   (tile_value, object, tile_y, tile_size); break;
                case  8: this.collidePlatformLeft     (tile_value, object, tile_x, tile_size); break;
                case  9: if (this.collidePlatformTop  (tile_value, object, tile_y, tile_size)) return;
                        this.collidePlatformLeft     (tile_value, object, tile_x, tile_size); break;
                case 10: if (this.collidePlatformLeft (tile_value, object, tile_x, tile_size)) return;
                        this.collidePlatformRight    (tile_value, object, tile_x, tile_size); break;
                case 11: if (this.collidePlatformTop  (tile_value, object, tile_y, tile_size)) return;
                        if (this.collidePlatformLeft (tile_value, object, tile_x, tile_size)) return;
                        this.collidePlatformRight    (tile_value, object, tile_x, tile_size); break;
                case 12: if (this.collidePlatformLeft (tile_value, object, tile_x, tile_size)) return;
                        this.collidePlatformBottom   (tile_value, object, tile_y, tile_size); break;
                case 13: if (this.collidePlatformTop  (tile_value, object, tile_y, tile_size)) return;
                        if (this.collidePlatformLeft (tile_value, object, tile_x, tile_size)) return;
                        this.collidePlatformBottom   (tile_value, object, tile_y, tile_size); break;
                case 14: if (this.collidePlatformLeft (tile_value, object, tile_x, tile_size)) return;
                        if (this.collidePlatformRight(tile_value, object, tile_x, tile_size)) return;
                        this.collidePlatformBottom   (tile_value, object, tile_y, tile_size); break;
                case 15: if (this.collidePlatformTop  (tile_value, object, tile_y, tile_size)) return;
                        if (this.collidePlatformLeft (tile_value, object, tile_x, tile_size)) return;
                        if (this.collidePlatformRight(tile_value, object, tile_x, tile_size)) return;
                        this.collidePlatformBottom   (tile_value, object, tile_y, tile_size); break;
        
            }
        };
    }
    
    collidePlatformTop(tile_value, object, tile_y, tile_size) {
        let tile_top = tile_y;
        if(tile_value == 125) tile_top = tile_y + tile_size * 0.6;
        if (object.getBottom() > tile_top && object.getOldBottom() <= tile_top) {
            object.setBottom(tile_top - 1);
            object.velocity_y = 0;
            object.jumping    = false;
            return true;
        } 
        return false;
    }

    collidePlatformRight(tile_value, object, tile_x, tile_size) {
        let tile_right = tile_x + tile_size;
        if (object.getLeft() < tile_right && object.getOldLeft() >= tile_right) {
    
          object.setLeft(tile_right);
          object.velocity_x = 0;
          return true;
    
        } return false;
    
    }
    
    collidePlatformBottom(tile_value, object, tile_y, tile_size) {
        let tile_bottom = tile_y + tile_size;
        /* If the top of the object is above the bottom of the tile and on the previous
        frame the top of the object was below the bottom of the tile, we have entered into
        this tile. Pretty simple stuff. */
        if (object.getTop() < tile_bottom && object.getOldTop() >= tile_bottom) {
    
          object.setTop(tile_bottom);// Move the top of the object to the bottom of the tile.
          object.velocity_y = 0;     // Stop moving in that direction.
          object.jumping = false;
          return true;               // Return true because there was a collision.
    
        } return false;              // Return false if there was no collision.
    
    }

    collidePlatformLeft(tile_value, object, tile_x, tile_size) {
        let tile_left = tile_x;
        if (object.getRight() > tile_left && object.getOldRight() <= tile_left) {
            document.getElementById("ppp").innerHTML = "collidePlatformLeft " + object.getRight() + " | " + tile_left + " | " + object.getOldRight(); 
          object.setRight(tile_left - 1); // -0.01 is to fix a small problem with rounding, I think -1 also works, and is a lot more convenient but need to test
          object.velocity_x = 0;
          return true;
    
        } return false;
    
    }

    static spriteSheetCollisionValues = [0, 0, 1, 15, 15, 15, 0, 0, 15, 15, 15, 15,
                                         0, 0, 1, 0, 15, 15, 0, 0, 15, 0, 15, 15,
                                         0, 0, 1, 15, 15, 15, 15, 15, 0, 15, 0, 15, 15,
                                         0, 0, 15, 15, 0, 1, 15, 0, 1, 0, 1, 15,
                                         0, 15, 15, 15, 0, 1, 0, 15, 1, 0, 1, 15,
                                         0, 15, 15, 15, 0, 1, 0, 15, 1, 0, 1, 1,
                                         0, 15, 15, 1, 0, 1, 0, 15, 1, 0, 1, 15,
                                         0, 15, 15, 1, 15, 15, 0, 15, 15, 15, 15, 15,
                                         0, 0, 15, 1, 15, 15, 0, 15, 15, 15, 15, 15,
                                         0, 0, 15, 1, 15, 15, 0, 15, 15, 1, 15, 1,
                                         0, 15, 15, 15, 1, 15, 1, 15, 15, 15, 15, 0,
                                         15, 15, 15, 15, 15, 15, 0, 15, 15, 15, 15, 0,
                                         15, 1, 15, 15, 15, 0, 0, 15, 15, 15, 15, 0];

    // Need to find a better way to find the collision map, atm doing it manually :(
    static getCollisionMap(map){
        let col_map = [];
        for(let i = 0; i < map.length; i++){
            if(map[i] == 0) col_map.push(0);
            else col_map.push(Game.Collider.spriteSheetCollisionValues[map[i]]);
            // switch(map[i]){
            //     case 44 : col_map.push(0); break;
            //     //case 44:  window.location.href = 'GameOver.html';
            //     case 45 : col_map.push(1); break;
            //     case 57 : col_map.push(1); break;
            //     case 69 : col_map.push(1); break;
            //     case 81 : col_map.push(1); break;
            //     case 92 : col_map.push(15); break;
            //     case 93 : col_map.push(15); break;
            //     case 104 : col_map.push(15); break;
            //     case 105 : col_map.push(15); break;
            //     case 103 : col_map.push(0); break;
            //     case 115 : col_map.push(0); break;
            //     case 116 : col_map.push(15); break;
            //     case 117 : col_map.push(15); break;
            //     case 129 : col_map.push(15); break;
            //     case 133 : col_map.push(0); break; //this is the box, set to 15 if you want it to be solid
            //     case 153 : col_map.push(15); break; //this is the 'borderless' sand/rock tile. Set to 0 if you want to pass through
            //     default : col_map.push(0);
            // }
        }
        return col_map;
    }

    setMap(newMap) {
        //generate new map eventually
        this.map = newMap;
    }
}

//Any object in this world is treated like a rectangle
//with [x, y] top-left coordinates and [width, height] sizes
Game.World.Object = class {
    constructor(x = 0, y = 0, width = 0, height = 0, velocity_max = 31, collision_offset = undefined){
        this.x = x;
        this.y = y;
        this.old_x = x;
        this.old_y = y;
        this.width = width;
        this.height = height;
        this.collision_offset = collision_offset;

        this.jumping = false;
        this.velocity_max = this.velocity_max;
        this.velocity_x = 0;
        this.velocity_y = 0;
        
    }

    collideObject(object){
        if(this.getRight(1) < object.getLeft(1) ||
            this.getBottom(1) < object.getTop(1) ||
            this.getLeft(1) > object.getRight(1) ||
            this.getTop(1) > object.getBottom(1)) return false;
        
        return true;
    }

    collideObjectCenter(object){
        if(object.getCenterX() < this.getLeft() || object.getCenterX() > this.getRight()
            || object.getCenterY() < this.getTop() || object.getCenterY() > this.getBottom()) return false;
        
        return true;
    }

    getBottom(enable = 0){ return this.y + this.height - 1 - this.collision_offset.bottom * enable; }
    getLeft(enable = 0) { return this.x + this.collision_offset.left * enable; }
    getTop(enable = 0) { return this.y + this.collision_offset.top * enable ; }
    getRight(enable = 0) { return this.x + this.width - 1 - this.collision_offset.right * enable; }
    getCenterX() { return this.x + this.width * 0.5; }
    getCenterY() { return this.y + this.height * 0.5; }

    getOldBottom(enable = 0) { return this.old_y + this.height - 1 - this.collision_offset.bottom * enable; }
    getOldLeft(enable = 0) { return this.old_x + this.collision_offset.left * enable; }
    getOldTop(enable = 0) { return this.old_y + this.collision_offset.top * enable; }
    getOldRight(enable = 0) { return this.old_x + this.width - 1 - this.collision_offset.right * enable; }
    getOldCenterX() { return this.old_x + this.width * 0.5; }
    getOldCenterY() { return this.old_y + this.height * 0.5; }

    setBottom(y) { this.y = y - this.height + 1; }
    setLeft(x) { this.x = x; }
    setTop(y) { this.y = y; }
    setRight(x) { this.x = x - this.width + 1; }
    setCenterX(x) { this.x = x - this.width * 0.5; }
    setCenterY(y) { this.y = y - this.height * 0.5; }

    setOldBottom(y) { this.old_y = y - this.height + 1; }
    setOldLeft(x) { this.old_x = x; }
    setOldTop(y) { this.old_y = y; }
    setOldRight(x) { this.old_x = x - this.width + 1; }
    setOldCenterX(x) { this.old_x = x - this.width * 0.5; }
    setOldCenterY(y) { this.old_y = y - this.height * 0.5; }
}

/**
 * Very simple class for door objects. Has [x, y] coordinates with width and height.
 * Also the destination coordinates and room id
 * -69 is a reserved number for a tile, it indicates that we should keep the position on that axis :)
 */
 Game.Door = class extends Game.World.Object {
    constructor(door, tile_size = 32, collision_offset = undefined){
        super(door.tile_x * tile_size, door.tile_y * tile_size, door.width, door.height, 0, collision_offset);
        this.destination_x = (door.destination_tile_x == -69) ? -1 : (door.destination_tile_x * tile_size); //if it's a special case (-69) we mark it as -1 since
        this.destination_y = (door.destination_tile_y == -69) ? -1 : (door.destination_tile_y * tile_size); //it's an impossible coordinate for a destination
        this.destination_room = door.destination_room;
    }
}

Game.Key = class extends Game.World.Object {
    constructor(x, y, keyNumber, collision_offset = undefined){
        super(x, y, 50, 50, 0, collision_offset);
        this.keyNumber = keyNumber;
    }
}

/**
 * Class for Animated Objects.
 * The main and only purpose of the class is to store the 'frames' for animation (like many moving states of the player)
 * and switch from one frame to the next in every $delay$ number of updates of the game.
 * 
 * mode for now has two states 'loop' (for animated states like moving) and 'pause' (for not animated states like standing idle)
 */
Game.World.AnimatedObject = class extends Game.World.Object{
    constructor(frame_set, delay, mode = "loop", x, y, width = 0, height = 0, velocity_max = 31, collision_offset = undefined){
        super(x, y, width, height, velocity_max, collision_offset);

        this.counter = 0;
        this.delay = (delay >= 1) ? delay : 1;
        this.frame_set = frame_set;
        this.frame_index = Math.floor(Math.random() * frame_set.length);
        this.frame_value = frame_set[0];
        this.mode = mode;
        this.direction_x = 1;
    }

    animate(){
        //extendable for future 'modes' , if any
        switch(this.mode){
            case "loop" : this.loop(); break;
            case "pause" : break;
        }
    }

    loop(){
        this.counter++;
        while(this.counter >= this.delay){
            this.counter -= this.delay;
            this.frame_index = (this.frame_index + 1) % this.frame_set.length;
            this.frame_value = this.frame_set[this.frame_index];
        }
    }

    // This function is called to change from one frame_set (ex: moving-left) to another (ex: standing still)
    changeFrameSet(frame_set, mode, delay = 5, frame_index = 0){
        if(this.frame_set === frame_set) return;

        this.counter = 0;
        this.delay = delay;
        this.frame_set = frame_set;
        this.frame_index = frame_index;
        this.frame_value = frame_set[frame_index];
        this.mode = mode;
    }
}

// Simple Player class, the variables and method names should be slef-explanatory
// update functin is called every time the canvas screen is updated
Game.World.Player = class extends Game.World.AnimatedObject{
    constructor(x, y, collision_offset = undefined){
        super(Game.World.Player.frame_sets["idle-right"], 5, "loop", x, y, 35, 50, 31, collision_offset); //should be [width, height] = [40, 54] but setting it smaller makes it collide better
        this.jumping = true;
        this.color = "#000000";
        this.direction_x = 1;
    }

    static frame_sets = {
        "idle-left" : [12],
        "jump-left" : [23],
        "move-left" : [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
        "idle-right": [0],
        "jump-right": [11],
        "move-right": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }
    
    jump(){
        if(this.jumping == false){
            this.jumping = true;
            this.velocity_y -= 30;
            this.velocity_y = this.velocity_check(this.velocity_y);
        }
    }

    moveLeft(){
        this.direction_x = -1;
        this.velocity_x -= 1.5;
        this.velocity_x = this.velocity_check(this.velocity_x);
    }

    moveRight(){
        this.direction_x = 1;
        this.velocity_x += 1.5;
        this.velocity_x = this.velocity_check(this.velocity_x);
    }

    velocity_check(velocity){
        if(Math.abs(velocity) > this.v2elocity_max)
            velocity = this.velocity_max * Math.sign(velocity);
        return velocity;
    }

    updatePosition(gravity, friction){
        this.old_x = this.x;
        this.old_y = this.y;

        this.velocity_y += gravity;
        this.velocity_x *= friction;

        this.velocity_x = this.velocity_check(this.velocity_x);
        this.velocity_y = this.velocity_check(this.velocity_y);

        this.x += this.velocity_x;
        this.y += this.velocity_y;
    }

    updateAnimation(){
        if(this.velocity_y < 0){
            if(this.direction_x < 0) this.changeFrameSet(Game.World.Player.frame_sets["jump-left"], "pause");
            else this.changeFrameSet(Game.World.Player.frame_sets["jump-right"], "pause");
        }
        else if(this.direction_x < 0){
            if(this.velocity_x < -0.1) this.changeFrameSet(Game.World.Player.frame_sets["move-left"], "loop");
            else this.changeFrameSet(Game.World.Player.frame_sets["idle-left"], "pause");
        }
        else if(this.direction_x > 0){
            if(this.velocity_x > 0.1) this.changeFrameSet(Game.World.Player.frame_sets["move-right"], "loop");
            else this.changeFrameSet(Game.World.Player.frame_sets["idle-right"], "pause");
        }

        this.animate();
    }
}

Game.Coin = class extends Game.World.AnimatedObject{
    constructor(tile_x, tile_y, tile_size, collision_offset = undefined){
        super(Game.Coin.frame_sets["coin-twirl"], 5, "loop", tile_x * tile_size, tile_y * tile_size, 30, 32, 31, collision_offset); //30 width, 32 height coins
        this.tile_x = tile_x;
        this.tile_y = tile_y;
    }

    static frame_sets = {
        "coin-twirl" : [0, 1, 2, 3, 4, 5, 6, 7]
    }
}

Game.Fly = class extends Game.World.AnimatedObject{
    constructor(start_x, start_y, end_x, end_y, collision_offset = undefined){
        super(Game.Fly.frame_sets['fly-left'], 10, "loop", (start_x + end_x)/2, (start_y + end_y)/2, 62, 27, 31, collision_offset);
        this.start_x = start_x;
        this.start_y = start_y;
        this.end_x = end_x;
        this.end_y = end_y;

        this.dx = Math.abs(end_x - start_x) / 2;
        this.dy = Math.abs(end_y - start_y) / 2;

        this.base_x = (start_x + end_x) / 2;
        this.base_y = (start_y + end_y) / 2;

        this.position_x = Math.random() * Math.PI;
        this.position_y = Math.random() * Math.PI;

        this.direction_x = -1;
    }

    static frame_sets = {
        "fly-left" : [0, 1],
        "fly-right" : [2, 3]
    }

    updatePosition(){
        this.position_x += 0.03;
        this.position_y += 0.03;
        
        this.old_x = this.x;
        this.old_y = this.y;

        this.x = this.base_x + Math.cos(this.position_x) * this.dx;
        this.y = this.base_y + Math.cos(this.position_y) * this.dy;

        if(this.old_x < this.x && this.direction_x < 0){
            this.changeFrameSet(Game.Fly.frame_sets['fly-right'], "loop", 10);
            this.direction_x = 1;
        }
        else if(this.x < this.old_x && this.direction_x > 0){
            this.changeFrameSet(Game.Fly.frame_sets['fly-left'], "loop", 10);
            this.direction_x = -1;
        }
    }
}

Game.Slime = class extends Game.World.AnimatedObject{
    constructor(start_x, start_y, end_x, end_y, collision_offset = undefined){
        super(Game.Slime.frame_sets['slither-left'], 15, "loop", (start_x + end_x)/2, (start_y + end_y)/2, 51, 28, 31, collision_offset);
        this.start_x = start_x;
        this.start_y = start_y;
        this.end_x = end_x;
        this.end_y = end_y;
        this.offset_x = 0;
        this.offset_y = 5;

        this.dx = Math.abs(end_x - start_x) / 2;
        this.dy = Math.abs(end_y - start_y) / 2;

        this.base_x = (start_x + end_x) / 2;
        this.base_y = (start_y + end_y) / 2;

        this.position_x = Math.random() * Math.PI;
        this.position_y = Math.random() * Math.PI;

        this.direction_x = -1;
    }

    static frame_sets = {
        "slither-left" : [0, 1],
        "slither-right" : [2, 3]
    }

    updatePosition(){
        this.position_x += 0.02;
        this.position_y += 0.02;
        
        this.old_x = this.x;
        this.old_y = this.y;

        this.x = this.base_x + Math.cos(this.position_x) * this.dx;
        this.y = this.base_y + Math.cos(this.position_y) * this.dy;

        if(this.old_x < this.x && this.direction_x < 0){
            this.changeFrameSet(Game.Slime.frame_sets['slither-right'], "loop", 15);
            this.direction_x = 1;
        }
        else if(this.x < this.old_x && this.direction_x > 0){
            this.changeFrameSet(Game.Slime.frame_sets['slither-left'], "loop", 15);
            this.direction_x = -1;
        }
    }
}

Game.World.TileSet = class {
    constructor(tile_size){
        this.tile_size = tile_size;
    }
}

// Uncomment for testing
// module.exports.Game = Game;