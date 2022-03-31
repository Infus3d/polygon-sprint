window.addEventListener("load", function(event){
    "use strict";

    class StuffManager {
        constructor(){
            this.tileSheetImage = undefined;
            this.tileSheet_tile_size = undefined;
            this.tileSheet_columns = undefined;
            this.tileSheet_spacing = 2;

            this.backgroundImage = undefined;
        }

        requestImage(url, callbackFunction){
            let img = new Image();
            img.src = url;
            img.addEventListener("load", function(event){
                callbackFunction(img);
            });
        }
    }

    let render = function(){
        // display.clearCanvas();
        display.drawBackground(stuffManager.backgroundImage);
        display.drawMap(stuffManager.tileSheetImage, stuffManager.tileSheet_columns, stuffManager.tileSheet_tile_size, stuffManager.tileSheet_spacing,
             game.world.map, game.world.columns, game.world.tile_set.tile_size);
        display.drawPlayer(game.world.player, game.world.player.color);
        display.render();
    };

    let update = function(){
        if(controller.left.active == true) game.world.player.moveLeft();
        if(controller.right.active == true) game.world.player.moveRight();
        if(controller.up.active == true) game.world.player.jump();
        game.update();
    };

    let keyDownUp = function(event){
        controller.keyDownUp(event.type, event.keyCode);
    };

    let stuffManager    = new StuffManager();
    let controller      = new Controller();
    let display         = new Display(document.getElementById("gameCanvas"));
    let game            = new Game();
    let runner          = new Runner(1000 / 60, update, render);

    display.resize(game.world.width, game.world.height);
    stuffManager.requestImage("img/tiles_spritesheet.png", (image) => {
        stuffManager.tileSheetImage = image;
        stuffManager.tileSheet_tile_size = 70;
        stuffManager.tileSheet_columns = 12;
        stuffManager.tileSheet_spacing = 2;

        stuffManager.requestImage("img/backgroundImage.png", (image) => {
            stuffManager.backgroundImage = image;
            runner.start();
        });
    });
    window.addEventListener("keydown", keyDownUp);
    window.addEventListener("keyup", keyDownUp);
});
