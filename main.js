window.addEventListener("load", function(event){
    "use strict";

    let render = function(){
        display.clearCanvas();
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

    let controller  = new Controller();
    let display     = new Display(document.getElementById("gameCanvas"));
    let game        = new Game();
    let runner      = new Runner(1000 / 60, update, render);

    display.resize(game.world.width, game.world.height);
    runner.start();
    window.addEventListener("keydown", keyDownUp);
    window.addEventListener("keyup", keyDownUp);
});
