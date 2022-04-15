window.addEventListener("load", function(event){
    "use strict";

    let difficulty = sessionStorage.getItem('difficulty');
    if(difficulty == undefined) difficulty = "easy";

    class StuffManager {
        constructor(){
            this.tileSheetImage = undefined;
            this.tileSheet_tile_size = undefined;
            this.tileSheet_columns = undefined;
            this.tileSheet_spacing = 2;

            this.backgroundImage = undefined;
            this.playerImages = [];
        }
        
        //current count of loaded images
        static totalLoadCount = 0;
        //the threshold the counts need to reach before initiating the game with runner.start()
        static loadThreshold = 2 + 12 + 12; //1 background, 1 tilesheet, 12 player_right, 12 player_left

        /**
         * Used to load an image.
         */
        requestImage(url, callbackFunction){
            let img = new Image();
            img.src = url;
            img.addEventListener("load", function(event){
                StuffManager.totalLoadCount++;
                callbackFunction(img);
                if(StuffManager.totalLoadCount == StuffManager.loadThreshold){
                    stuffManager.sortPlayerImages();
                    runner.start();
                }
            }, {once:true});
        }
        
        /**
         * This method is useful for re-ordering the images in the order you intended. Some images (a) take more
         * time to load than others(b), even though the requests to load (a) comes before (b) in the code.
         * 
         * Uses insertion-sort to sort the images by their name, which are simply the numbers representing their
         * order in 'img/player' directory.
         */
        sortPlayerImages(){
            for(let i=1; i<this.playerImages.length; i++){
                let cur = i;
                while(cur > 0){
                    let curLen = this.playerImages[cur].currentSrc.length;
                    let prevLen = this.playerImages[cur-1].currentSrc.length;

                    let curInt = parseInt(this.playerImages[cur].currentSrc.substring(curLen-6, curLen-4));
                    let prevInt = parseInt(this.playerImages[cur-1].currentSrc.substring(prevLen-6, prevLen-4));
                    if(curInt >= prevInt) break;
                    
                    let temp = this.playerImages[cur];
                    this.playerImages[cur] = this.playerImages[cur-1];
                    this.playerImages[cur-1] = temp;
                    cur--;
                }
            }
        }
    }

    let renderSpawn = function(){
        // display.clearCanvas();
        display.drawBackground(stuffManager.backgroundImage);
        display.drawMap(stuffManager.tileSheetImage, stuffManager.tileSheet_columns, stuffManager.tileSheet_tile_size, stuffManager.tileSheet_spacing,
             game.world.map, game.world.columns, game.world.tile_set.tile_size);
        // display.drawPlayer(game.world.player, game.world.player.color);
        display.drawObject(stuffManager.playerImages[game.world.player.frame_value], -1, -1, -1, -1, game.world.player.x, game.world.player.y, 40, 54);
        display.render();
    };

    //TODO add a function that adds a new map/tilesheet. for now i just used the same tilemap
    // let renderUpdate = function () {
    //     display.clearCanvas();
    //     display.drawBackground(stuffManager.backgroundImage);
    //     display.drawMap(stuffManager.tileSheetImage, stuffManager.tileSheet_columns, stuffManager.tileSheet_tile_size, stuffManager.tileSheet_spacing,
    //         game.world.map, game.world.columns, game.world.tile_set.tile_size);
    //     //display.drawPlayer(game.world.player, game.world.player.color);
    //     display.drawObject(stuffManager.playerImages[game.world.player.frame_value], -1, -1, -1, -1, game.world.player.x, game.world.player.y, 40, 54);
    //     display.render();
    // };

    let update = function(){
        if (controller.left.active == true) {
            game.world.player.moveLeft();
        }
        if (controller.right.active == true) {
            game.world.player.moveRight();
        }
        if (controller.up.active == true) {
            game.world.player.jump();
            controller.up.active = false;
        }

        //game.world.getPlayerTileNumber();
        console.log("canvas height: " + display.buffer.canvas.height + "\nwidth: " + display.buffer.canvas.width);
        // This is handled in the Game.World class
        // if (game.world.player.getRight() >= display.getDisplayWidth()) {
        //     game.world.player.x = 1;
        //     // renderUpdate(); //will be worked on
        // }
        // else if (game.world.player.getLeft() <= 0) {
        //     game.world.player.x = display.getDisplayWidth() - (game.world.player.width+1);
        //     //renderUpdate(); //will be worked on
        // }
        game.update();
        if(game.world.triggeredDoor != undefined){
            runner.stop();
            game.world.setup(levels[difficulty][game.world.triggeredDoor.destination_room]);
            runner.start();
        }
    };

    let keyDownUp = function(event){
        controller.keyDownUp(event.type, event.keyCode);
    };

    let stuffManager    = new StuffManager();
    let controller      = new Controller();
    let display         = new Display(document.getElementById("gameCanvas"));
    let game = new Game();
    let runner = new Runner(1000 / 45, update, renderSpawn);

    game.world.setup(levels[difficulty]["01"]);

    display.resize(game.world.width, game.world.height);
    stuffManager.requestImage("img/tiles_spritesheet.png", (image) => {
        stuffManager.tileSheetImage = image;
        stuffManager.tileSheet_tile_size = 70;
        stuffManager.tileSheet_columns = 12;
        stuffManager.tileSheet_spacing = 2;
    });
    stuffManager.requestImage("img/backgroundImage.png", (image) => {
        stuffManager.backgroundImage = image;
    });

    for(let i=1; i<=24; i++){
        stuffManager.requestImage("img/player/" + (i < 10 ? "0" : "") + i + ".png", (image) => {
            stuffManager.playerImages.push(image);
        });
    }

    window.addEventListener("keydown", keyDownUp);
    window.addEventListener("keyup", keyDownUp);
});

