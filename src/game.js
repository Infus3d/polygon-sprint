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
        this.gravity = 4;

        this.columns = 30;
        this.rows = 20;

        this.tile_set = new Game.World.TileSet(32);
        this.player = new Game.World.Player(100, 100);

        // this.map = [48,17,17,17,49,48,18,19,16,17,35,36,
        //     10,39,39,39,16,18,39,31,31,31,39, 7,
        //     10,31,39,31,31,31,39,12, 5, 5,28, 1,
        //     35, 6,39,39,31,39,39,19,39,39, 8, 9,
        //      2,31,31,47,39,47,39,31,31, 4,36,25,
        //     10,39,39,31,39,39,39,31,31,31,39,37,
        //     10,39,31, 4,14, 6,39,39, 3,39, 0,42,
        //     49, 2,31,31,11,39,39,31,11, 0,42, 9,
        //      8,40,27,13,37,27,13, 3,22,34, 9,24];

        this.map = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 104,
            104, 104, 104, 104, 105, 0, 0, 129, 116, 104, 105, 0, 0, 69, 57, 57, 57, 57, 57, 45, 0, 0, 0, 0, 0, 0, 0, 0, 0, 153, 153, 153, 153, 153, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
            0, 0, 0, 0, 0, 0, 0, 153, 153, 153, 153, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 133, 133, 0, 0, 0, 0, 0, 0, 0, 117, 104, 104, 104, 0, 0, 153, 153, 153, 0, 0, 0, 0, 0, 0, 81, 0, 0, 0, 0, 0, 133, 
            133, 133, 0, 0, 0, 0, 0, 0, 0, 153, 153, 153, 0, 65, 153, 153, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 116, 104, 104, 104, 104, 92, 0, 0, 0, 0, 0, 153, 153, 153, 104, 104, 0, 0, 0, 0, 0, 0, 0, 
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 81, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 69, 45, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 69, 57, 57, 45, 0, 0, 0, 0, 0, 0, 81, 0, 0, 0, 0, 0, 0, 0, 0, 
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 104, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 153, 104, 104, 104, 104, 104, 104, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 117, 104, 104, 104, 93, 0, 0, 0, 0, 0, 129, 104, 153, 153, 153, 153, 153, 153, 
            153, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 153, 153, 153, 0, 0, 0, 0, 0, 0, 0, 0, 153, 153, 153, 153, 153, 153, 153, 104, 104, 104, 105, 0, 0, 69, 57, 45, 0, 0, 0, 153, 153, 153, 0, 0, 0, 129, 
            104, 104, 104, 104, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 0, 0, 0, 0, 0, 0, 0, 0, 0, 153, 153, 153, 0, 0, 0, 0, 0, 0, 0, 0, 0, 153, 153, 153, 153, 153, 153, 153, 153, 153, 115, 
            115, 115, 115, 115, 115, 115, 115, 115, 153, 153, 153, 115, 115, 115, 115, 115, 115, 115, 115, 115, 153, 153, 153, 153, 153, 153, 153, 153, 153, 44, 44, 44, 44, 44, 44, 44, 44, 44, 153, 153, 
            153, 44, 44, 44, 44, 44, 44, 44, 44, 44];

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
        if(obj.getBottom() > this.height) { obj.setBotom(this.height); obj.velocity_y = 0; obj.jumping = false; }
    }
}

//Any object in this world is treated like a rectangle
//with [x, y] top-left coordinates and [width, height] sizes
Game.World.Object = class {
    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    getBottom(){ return this.y + this.height; }
    getLeft() { return this.x; }
    getTop() { return this.y; }
    getRight() { return this.x + this.width; }

    setBotom(y) { this.y = y - this.height; }
    setLeft(x) { this.x = x; }
    setTop(y) { this.y = y; }
    setRight(x) { this.x = x - this.width; }
}

Game.World.Player = class extends Game.World.Object{
    constructor(x, y){
        super(x, y, 20, 20);
        this.jumping = true;
        this.velocity_x = 0;
        this.velocity_y = 0;
        this.color = "#000000";
    }
    
    jump(){
        if(this.jumping == false){
            this.jumping = true;
            this.velocity_y -= 40;
        } 
    }

    moveLeft(){
        this.velocity_x -= 2.0;
    }

    moveRight(){
        this.velocity_x += 2.0;
    }

    update(gravity, friction){
        this.velocity_y += gravity;
        this.velocity_x *= friction;

        this.x += this.velocity_x;
        this.y += this.velocity_y;
    }
}

Game.World.TileSet = class {
    constructor(tile_size){
        this.tile_size = tile_size;
    }
}