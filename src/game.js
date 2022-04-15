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

        this.tile_set = new Game.World.TileSet(32);
        this.player = new Game.World.Player(40, 300);
        this.collider = new Game.Collider();

        this.room_id = "01";
        this.doors = [];
        this.triggeredDoor = undefined;
        
        this.map = [];
        this.collision_map = [];

        this.width = this.tile_set.tile_size * this.columns;
        this.height = this.tile_set.tile_size * this.rows;

        this.difficulty = null;
    }

    setDifficulty(difficulty) {
        this.difficulty = difficulty;
    }

    setup(room){
        this.doors = [];
        this.map = room.map;
        this.collision_map = Game.Collider.getCollisionMap(this.map);
        this.columns = room.columns;
        this.rows = room.rows;
        this.room_id = room.id;

        for(let i = room.doors.length-1; i >= 0; i--){
            let curDoor = room.doors[i];
            this.doors[i] = new Game.Door(curDoor, this.tile_set.tile_size);
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
        this.player.updatePosition(this.gravity, this.friction);
        this.collideObject(this.player);

        for(let i = this.doors.length-1; i >= 0; i--){
            let curDoor = this.doors[i];
            if(curDoor.collideObjectCenter(this.player))
                this.triggeredDoor = curDoor;
        }

        this.player.updateAnimation();
    }

    /**
     * this gives the tile value underneath the player a.k.a tile player is standing on. we can update it so that it checks all around the player
     */
    getTileValue(){
        //this gets the tile underneath the player
        let a = Math.round(this.player.getCenterX() / 32);
        let b = Math.round(this.player.getBottom() / 32);

        return this.map[b * 30 + a]; //30 represents the 30 columns
    }

    collideObject(obj){
        //Making sure the object stays within this 'world'
        // if(obj.getLeft() < 0) { obj.setLeft(0); obj.velocity_x = 0; }
        // if(obj.getRight() > this.width) { obj.setRight(this.width); obj.velocity_x = 0; }
        // if(obj.getTop() < 0) { obj.setTop(0); obj.velocity_y = 0; }
        if(obj.getBottom() > this.height) { obj.setBottom(this.height); obj.velocity_y = 0; obj.jumping = false; }


        /**
            The side values refer to the tile grid
            row and column spaces that the object is occupying on each of its sides. For
            instance bottom refers to the row in the collision map that the bottom of the
            object occupies. Right refers to the column in the collision map occupied by
            the right side of the object. Collision_value refers to the value of a collision tile in
            the map under the specified row and column occupied by the object.
         */
        let collision_value, top, right, bottom, left, horMid, verMid;
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
        if(top >= 0 && left >= 0) this.collider.routeCollision(collision_value, obj, left * this.tile_set.tile_size, top * this.tile_set.tile_size, this.tile_set.tile_size);

        top = Math.floor(obj.getTop() / this.tile_set.tile_size);
        right = Math.floor(obj.getRight() / this.tile_set.tile_size);
        collision_value = this.collision_map[top * this.columns + right];
        if(top >= 0 && right < this.columns) this.collider.routeCollision(collision_value, obj, right * this.tile_set.tile_size, top * this.tile_set.tile_size, this.tile_set.tile_size);

        bottom = Math.floor(obj.getBottom() / this.tile_set.tile_size);
        left = Math.floor(obj.getLeft() / this.tile_set.tile_size);
        collision_value = this.collision_map[bottom * this.columns + left];
        if(bottom < this.rows && left >= 0) this.collider.routeCollision(collision_value, obj, left * this.tile_set.tile_size, bottom * this.tile_set.tile_size, this.tile_set.tile_size);

        bottom = Math.floor(obj.getBottom() / this.tile_set.tile_size);
        right = Math.floor(obj.getRight() / this.tile_set.tile_size);
        collision_value = this.collision_map[bottom * this.columns + right];
        if(right < this.columns && bottom < this.rows) this.collider.routeCollision(collision_value, obj, right * this.tile_set.tile_size, bottom * this.tile_set.tile_size, this.tile_set.tile_size);


        top = Math.floor(obj.getTop() / this.tile_set.tile_size);
        horMid = Math.floor((obj.getLeft() + obj.width * 0.5) / this.tile_set.tile_size);
        collision_value = this.collision_map[top * this.columns + horMid];
        if(top >= 0) this.collider.routeCollision(collision_value, obj, horMid * this.tile_set.tile_size, top * this.tile_set.tile_size, this.tile_set.tile_size);

        bottom = Math.floor(obj.getBottom() / this.tile_set.tile_size);
        horMid = Math.floor((obj.getLeft() + obj.width * 0.5) / this.tile_set.tile_size);
        collision_value = this.collision_map[bottom * this.columns + horMid];
        if(bottom < this.rows) this.collider.routeCollision(collision_value, obj, horMid * this.tile_set.tile_size, bottom * this.tile_set.tile_size, this.tile_set.tile_size);

        verMid = Math.floor((obj.getTop() + obj.height * 0.5) / this.tile_set.tile_size);
        left = Math.floor(obj.getLeft() / this.tile_set.tile_size);
        collision_value = this.collision_map[verMid * this.columns + left];
        if(left >= 0) this.collider.routeCollision(collision_value, obj, left * this.tile_set.tile_size, verMid * this.tile_set.tile_size, this.tile_set.tile_size);

        verMid = Math.floor((obj.getTop() + obj.height * 0.5) / this.tile_set.tile_size);
        right = Math.floor(obj.getRight() / this.tile_set.tile_size);
        collision_value = this.collision_map[verMid * this.columns + right];
        if(right < this.columns) this.collider.routeCollision(collision_value, obj, right * this.tile_set.tile_size, verMid * this.tile_set.tile_size, this.tile_set.tile_size);
    }
}

Game.Collider = class {
    constructor(){
        this.routeCollision = function(value, object, tile_x, tile_y, tile_size){
            
            switch(value) { // which value does our tile have?

                /*  All 15 tile types can be described with only 4 collision methods. These
                    methods are mixed and matched for each unique tile.
                    Since the tiles are squares in our game, it can have 4 different sides to collide with.
                    You can imagine a binary number [0000] where each bit represents the one side of the square.
                    If there is a wall on that side, the bit is set 1, if not 0.
                */
        
                case  1: this.collidePlatformTop      (object, tile_y            ); break;
                case  2: this.collidePlatformRight    (object, tile_x + tile_size); break;
                case  3: if (this.collidePlatformTop  (object, tile_y            )) return; // If there's a collision, we don't need to check for anything else.
                        this.collidePlatformRight    (object, tile_x + tile_size); break;
                case  4: this.collidePlatformBottom   (object, tile_y + tile_size); break;
                case  5: if (this.collidePlatformTop  (object, tile_y            )) return;
                        this.collidePlatformBottom   (object, tile_y + tile_size); break;
                case  6: if (this.collidePlatformRight(object, tile_x + tile_size)) return;
                        this.collidePlatformBottom   (object, tile_y + tile_size); break;
                case  7: if (this.collidePlatformTop  (object, tile_y            )) return;
                        if (this.collidePlatformRight(object, tile_x + tile_size)) return;
                        this.collidePlatformBottom   (object, tile_y + tile_size); break;
                case  8: this.collidePlatformLeft     (object, tile_x            ); break;
                case  9: if (this.collidePlatformTop  (object, tile_y            )) return;
                        this.collidePlatformLeft     (object, tile_x            ); break;
                case 10: if (this.collidePlatformLeft (object, tile_x            )) return;
                        this.collidePlatformRight    (object, tile_x + tile_size); break;
                case 11: if (this.collidePlatformTop  (object, tile_y            )) return;
                        if (this.collidePlatformLeft (object, tile_x            )) return;
                        this.collidePlatformRight    (object, tile_x + tile_size); break;
                case 12: if (this.collidePlatformLeft (object, tile_x            )) return;
                        this.collidePlatformBottom   (object, tile_y + tile_size); break;
                case 13: if (this.collidePlatformTop  (object, tile_y            )) return;
                        if (this.collidePlatformLeft (object, tile_x            )) return;
                        this.collidePlatformBottom   (object, tile_y + tile_size); break;
                case 14: if (this.collidePlatformLeft (object, tile_x            )) return;
                        if (this.collidePlatformRight(object, tile_x            )) return;
                        this.collidePlatformBottom   (object, tile_y + tile_size); break;
                case 15: if (this.collidePlatformTop  (object, tile_y            )) return;
                        if (this.collidePlatformLeft (object, tile_x            )) return;
                        if (this.collidePlatformRight(object, tile_x + tile_size)) return;
                        this.collidePlatformBottom   (object, tile_y + tile_size); break;
        
            }
        };
    }
    
    collidePlatformTop(object, tile_top) {
        if (object.getBottom() > tile_top && object.getOldBottom() <= tile_top) {
            object.setBottom(tile_top - 1);
            object.velocity_y = 0;
            object.jumping    = false;
            return true;
        } 
        return false;
    }

    collidePlatformRight(object, tile_right) {
    
        if (object.getLeft() < tile_right && object.getOldLeft() >= tile_right) {
    
          object.setLeft(tile_right);
          object.velocity_x = 0;
          return true;
    
        } return false;
    
    }
    
    collidePlatformBottom(object, tile_bottom) {

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

    collidePlatformLeft(object, tile_left) {

        if (object.getRight() > tile_left && object.getOldRight() <= tile_left) {
            document.getElementById("ppp").innerHTML = "collidePlatformLeft " + object.getRight() + " | " + tile_left + " | " + object.getOldRight(); 
          object.setRight(tile_left - 1); // -0.01 is to fix a small problem with rounding, I think -1 also works, and is a lot more convenient but need to test
          object.velocity_x = 0;
          return true;
    
        } return false;
    
    }

    // Need to find a better way to find the collision map, atm doing it manually :(
    static getCollisionMap(map){
        let col_map = [];
        for(let i = 0; i < map.length; i++){
            switch(map[i]){
                case 44 : col_map.push(0); break;
                //case 44:  window.location.href = 'GameOver.html';
                case 45 : col_map.push(1); break;
                case 57 : col_map.push(1); break;
                case 69 : col_map.push(1); break;
                case 81 : col_map.push(1); break;
                case 92 : col_map.push(15); break;
                case 93 : col_map.push(15); break;
                case 104 : col_map.push(15); break;
                case 105 : col_map.push(15); break;
                case 103 : col_map.push(0); break;
                case 115 : col_map.push(0); break;
                case 116 : col_map.push(15); break;
                case 117 : col_map.push(15); break;
                case 129 : col_map.push(15); break;
                case 133 : col_map.push(0); break; //this is the box, set to 15 if you want it to be solid
                case 153 : col_map.push(15); break; //this is the 'borderless' sand/rock tile. Set to 0 if you want to pass through
                default : col_map.push(0);
            }
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
    constructor(x = 0, y = 0, width = 0, height = 0, velocity_max = 31){
        this.x = x;
        this.y = y;
        this.old_x = x;
        this.old_y = y;
        this.width = width;
        this.height = height;

        this.jumping = false;
        this.velocity_max = this.velocity_max;
        this.velocity_x = 0;
        this.velocity_y = 0;
        
    }

    collideObject(object){
        if(this.getRight() < object.getLeft() ||
            this.getBottom() < object.getTop() ||
            this.getLeft() > object.getRight() ||
            this.getTop() > object.getBottom()) return false;
        
        return true;
    }

    collideObjectCenter(object){
        if(object.getCenterX() < this.getLeft() || object.getCenterX() > this.getRight()
            || object.getCenterY() < this.getTop() || object.getCenterY() > this.getBottom()) return false;
        
        return true;
    }

    getBottom(){ return this.y + this.height; }
    getLeft() { return this.x; }
    getTop() { return this.y; }
    getRight() { return this.x + this.width; }
    getCenterX() { return this.x + this.width * 0.5; }
    getCenterY() { return this.y + this.height * 0.5; }

    getOldBottom() { return this.old_y + this.height; }
    getOldLeft() { return this.old_x; }
    getOldTop() { return this.old_y; }
    getOldRight() { return this.old_x + this.width; }
    getOldCenterX() { return this.old_x + this.width * 0.5; }
    getOldCenterY() { return this.old_y + this.height * 0.5; }

    setBottom(y) { this.y = y - this.height; }
    setLeft(x) { this.x = x; }
    setTop(y) { this.y = y; }
    setRight(x) { this.x = x - this.width; }
    setCenterX(x) { this.x = x - this.width * 0.5; }
    setCenterY(y) { this.y = y - this.height * 0.5; }

    setOldBottom(y) { this.old_y = y - this.height; }
    setOldLeft(x) { this.old_x = x; }
    setOldTop(y) { this.old_y = y; }
    setOldRight(x) { this.old_x = x - this.width; }
    setOldCenterX(x) { this.old_x = x - this.width * 0.5; }
    setOldCenterY(y) { this.old_y = y - this.height * 0.5; }
}

/**
 * Very simple class for door objects. Has [x, y] coordinates with width and height.
 * Also the destination coordinates and room id
 * -69 is a reserved number for a tile, it indicates that we should keep the position on that axis
 */
 Game.Door = class extends Game.World.Object {
    constructor(door, tile_size = 32){
        super(door.tile_x * tile_size, door.tile_y * tile_size, door.width, door.height);
        this.destination_x = (door.destination_tile_x == -69) ? -1 : (door.destination_tile_x * tile_size); //if it's a special case (-69) we mark it as -1
        this.destination_y = (door.destination_tile_y == -69) ? -1 : (door.destination_tile_y * tile_size); //as it's an impossible coordinate for a destination
        this.destination_room = door.destination_room;
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
    constructor(frame_set, delay, mode = "loop", x, y, width = 0, height = 0, velocity_max = 31){
        super(x, y, width, height, velocity_max);

        this.counter = 0;
        this.delay = (delay >= 1) ? delay : 1;
        this.frame_set = frame_set;
        this.frame_index = 0;
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
    constructor(x, y){
        super(Game.World.Player.frame_sets["idle-right"], 5, "loop", x, y, 35, 50, 31); //should be [width, height] = [40, 54] but setting it smaller makes it collide better
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

Game.World.TileSet = class {
    constructor(tile_size){
        this.tile_size = tile_size;
    }
}

// Uncomment for testing
// module.exports.Game = Game;