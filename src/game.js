class Game {
    constructor() {
        this.world = new Game.World();
        this.update = function () {
            this.world.update();
        };
    }
}

Game.World = class {
    constructor(){
        this.friction = 0.8;
        this.gravity = 3;

        this.columns = 30;
        this.rows = 20;

        this.tile_set = new Game.World.TileSet(32);
        this.player = new Game.World.Player(20, 300);
        this.collider = new Game.Collider();

        // this.map = [48,17,17,17,49,48,18,19,16,17,35,36,
        //     10,39,39,39,16,18,39,31,31,31,39, 7,
        //     10,31,39,31,31,31,39,12, 5, 5,28, 1,
        //     35, 6,39,39,31,39,39,19,39,39, 8, 9,
        //      2,31,31,47,39,47,39,31,31, 4,36,25,
        //     10,39,39,31,39,39,39,31,31,31,39,37,
        //     10,39,31, 4,14, 6,39,39, 3,39, 0,42,
        //     49, 2,31,31,11,39,39,31,11, 0,42, 9,
        //      8,40,27,13,37,27,13, 3,22,34, 9,24];

        this.map = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            104, 104, 104, 104, 104, 105, 0, 0, 0, 0, 0, 0, 0, 0, 69, 57, 57, 57, 57, 57, 45, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            153, 153, 153, 153, 153, 0, 0, 0, 129, 104, 104, 105, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            153, 153, 153, 153, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 133, 133, 0, 0, 0, 0, 0, 0, 0, 117, 104, 104, 104, 0, 0,
            153, 153, 153, 0, 0, 0, 81, 0, 0, 0, 0, 0, 0, 0, 0, 133, 133, 133, 0, 0, 0, 0, 0, 0, 0, 153, 153, 153, 0, 65,
            153, 153, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 116, 104, 104, 104, 104, 92, 0, 0, 0, 0, 0, 153, 153, 153, 104, 104,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 81, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 69, 45, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 69, 57, 57, 45, 0, 0, 0,
            0, 0, 0, 81, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 104,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 153,
            104, 104, 104, 104, 104, 104, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 117, 104, 104, 104, 93, 0, 0, 0, 0, 0, 129, 104, 153,
            153, 153, 153, 153, 153, 153, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 153, 153, 153, 0, 0, 0, 0, 0, 0, 0, 0, 153,
            153, 153, 153, 153, 153, 153, 104, 104, 104, 105, 0, 0, 69, 57, 45, 0, 0, 0, 153, 153, 153, 0, 0, 0, 129, 104, 104, 104, 104, 153,
            153, 153, 153, 153, 153, 153, 153, 153, 153, 0, 0, 0, 0, 0, 0, 0, 0, 0, 153, 153, 153, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            153, 153, 153, 153, 153, 153, 153, 153, 153, 115, 115, 115, 115, 115, 115, 115, 115, 115, 153, 153, 153, 115, 115, 115, 115, 115, 115, 115, 115, 115,
            153, 153, 153, 153, 153, 153, 153, 153, 153, 44, 44, 44, 44, 44, 44, 44, 44, 44, 153, 153, 153, 44, 44, 44, 44, 44, 44, 44, 44, 44];
        
        this.collision_map = Game.Collider.getCollisionMap(this.map);

        this.width = this.tile_set.tile_size * this.columns;
        this.height = this.tile_set.tile_size * this.rows;
    }

    update(){
        this.player.update(this.gravity, this.friction);
        this.collideObject(this.player);
    }

    collideObject(obj){
        //Making sure the object stays within this 'world'
        if(obj.getLeft() < 0) { obj.setLeft(0); obj.velocity_x = 0; }
        if(obj.getRight() > this.width) { obj.setRight(this.width); obj.velocity_x = 0; }
        if(obj.getTop() < 0) { obj.setTop(0); obj.velocity_y = 0; }
        if(obj.getBottom() > this.height) { obj.setBottom(this.height); obj.velocity_y = 0; obj.jumping = false; }


        /**
            The side values refer to the tile grid
            row and column spaces that the object is occupying on each of its sides. For
            instance bottom refers to the row in the collision map that the bottom of the
            object occupies. Right refers to the column in the collision map occupied by
            the right side of the object. Collision_value refers to the value of a collision tile in
            the map under the specified row and column occupied by the object.
         */
        let collision_value, top, right, bottom, left;
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
        this.collider.routeCollision(collision_value, obj, left * this.tile_set.tile_size, top * this.tile_set.tile_size, this.tile_set.tile_size);


        top = Math.floor(obj.getTop() / this.tile_set.tile_size);
        right = Math.floor(obj.getRight() / this.tile_set.tile_size);
        collision_value = this.collision_map[top * this.columns + right];
        this.collider.routeCollision(collision_value, obj, right * this.tile_set.tile_size, top * this.tile_set.tile_size, this.tile_set.tile_size);

        bottom = Math.floor(obj.getBottom() / this.tile_set.tile_size);
        left = Math.floor(obj.getLeft() / this.tile_set.tile_size);
        collision_value = this.collision_map[bottom * this.columns + left];
        this.collider.routeCollision(collision_value, obj, left * this.tile_set.tile_size, bottom * this.tile_set.tile_size, this.tile_set.tile_size);

        bottom = Math.floor(obj.getBottom() / this.tile_set.tile_size);
        right = Math.floor(obj.getRight() / this.tile_set.tile_size);
        collision_value = this.collision_map[bottom * this.columns + right];
        this.collider.routeCollision(collision_value, obj, right * this.tile_set.tile_size, bottom * this.tile_set.tile_size, this.tile_set.tile_size);
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
            document.getElementById("ppp").innerHTML = "" + object.getBottom() + " " + object.getOldBottom() + " " + tile_top;
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
                case 45 : col_map.push(1); break;
                case 57 : col_map.push(1); break;
                case 69 : col_map.push(1); break;
                case 81 : col_map.push(1); break;
                case 92 : col_map.push(15); break;
                case 93 : col_map.push(15); break;
                case 104 : col_map.push(15); break;
                case 105 : col_map.push(15); break;
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
}

//Any object in this world is treated like a rectangle
//with [x, y] top-left coordinates and [width, height] sizes
Game.World.Object = class {
    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.old_x = x;
        this.old_y = y;
        this.width = width;
        this.height = height;
    }

    getBottom(){ return this.y + this.height; }
    getLeft() { return this.x; }
    getTop() { return this.y; }
    getRight() { return this.x + this.width; }

    getOldBottom() { return this.old_y + this.height; }
    getOldLeft() { return this.old_x; }
    getOldTop() { return this.old_y; }
    getOldRight() { return this.old_x + this.width; }

    setBottom(y) { this.y = y - this.height; }
    setLeft(x) { this.x = x; }
    setTop(y) { this.y = y; }
    setRight(x) { this.x = x - this.width; }
}

// Simple Player class, the variables and method names should be slef-explanatory
// update functin is called every time the canvas screen is updated
Game.World.Player = class extends Game.World.Object{
    constructor(x, y){
        super(x, y, 25, 25);
        this.jumping = true;
        this.velocity_x = 0;
        this.velocity_y = 0;
        this.velocity_max = 31;
        this.color = "#000000";
    }
    
    jump(){
        if(this.jumping == false){
            this.jumping = true;
            this.velocity_y -= 30;
            this.velocity_y = this.velocity_check(this.velocity_y);
        }
    }

    moveLeft(){
        this.velocity_x -= 1.5;
        this.velocity_x = this.velocity_check(this.velocity_x);
    }

    moveRight(){
        this.velocity_x += 1.5;
        this.velocity_x = this.velocity_check(this.velocity_x);
    }

    velocity_check(velocity){
        if(Math.abs(velocity) > this.velocity_max)
            velocity = this.velocity_max * Math.sign(velocity);
        return velocity;
    }

    update(gravity, friction){
        this.old_x = this.x;
        this.old_y = this.y;

        this.velocity_y += gravity;
        this.velocity_x *= friction;

        this.velocity_x = this.velocity_check(this.velocity_x);
        this.velocity_y = this.velocity_check(this.velocity_y);

        this.x += this.velocity_x;
        this.y += this.velocity_y;
    }
}

Game.World.TileSet = class {
    constructor(tile_size){
        this.tile_size = tile_size;
    }
}