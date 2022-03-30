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

        this.player = new Game.World.Player();

        this.width = 1000;
        this.height = 800;
    }

    update(){
        this.player.velocity_y += this.gravity;
        this.player.update();

        this.player.velocity_x *= this.friction;
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
        super(100, 100, 50, 50);
        this.jumping = true;
        this.velocity_x = 0;
        this.velocity_y = 0;
        this.color = "#FFA500";
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

    update(){
        this.x += this.velocity_x;
        this.y += this.velocity_y;
    }
}
