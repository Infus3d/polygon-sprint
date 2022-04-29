class Controller {
    constructor() {
        this.left = new Controller.btnInput();
        this.right = new Controller.btnInput();
        this.up = new Controller.btnInput();
        this.pause = new Controller.btnInput();

        this.keyDownUp = function (eventtype, keycode) {
            let isDown = (eventtype == "keydown") ? true : false;

            switch (keycode) {
                case 37: this.left.upd(isDown); break;
                case 38: this.up.upd(isDown); break;
                case 39: this.right.upd(isDown); break;
                case 80: this.pause.upd(isDown);
            }

        };

    }
}

Controller.btnInput = class {
    constructor(){
        this.down = this.active = false;
    }
    upd(isDown){
        if(this.down != isDown) this.active = isDown;
        this.down = isDown;
    }
}

// Uncomment for testing
// module.exports.Controller = Controller;