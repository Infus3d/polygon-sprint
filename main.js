window.addEventListener("load", function(event){
    "use strict";

    let difficulty = sessionStorage.getItem('difficulty');
    if(difficulty == undefined) difficulty = "easy";
    let curLevel = levels[difficulty];

    class StuffManager {
        constructor(){
            this.tileSheetImage = undefined;
            this.tileSheet_tile_size = undefined;
            this.tileSheet_columns = undefined;
            this.tileSheet_spacing = 2;

            this.backgroundImage = undefined;
            this.playerImages = [];
            this.coinImages = [];
            this.flyImages = [];
            this.slimeImages = [];
        }
        
        //current count of loaded images
        static totalLoadCount = 0;
        
        //the threshold the counts need to reach before initiating the game with runner.start()
        //1 background, 1 tilesheet, 12 player_right, 12 player_left, 8 coin images, 4 fly images, 4 slime images
        static loadThreshold = 2 + 12 + 12 + 8 + 4 + 4;

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
                    stuffManager.sortAllImages();
                    runner.start();
                }
            }, {once:true});
        }
        
        /**
         * This method is useful for re-ordering the images in the order you intended. Some images (a) take more
         * time to load than others(b), even though the requests to load (a) comes before (b) in the code.
         * 
         * Uses insertion-sort to sort the images by their name, which are simply the numbers representing their
         * order in ex. 'img/player' directory.
         */
        sortAllImages(){
            this.sortImageSet(this.playerImages);
            this.sortImageSet(this.coinImages);
            this.sortImageSet(this.flyImages);
            this.sortImageSet(this.slimeImages);
            // for(let i=1; i<this.playerImages.length; i++){
            //     let cur = i;
            //     while(cur > 0){
            //         let curLen = this.playerImages[cur].currentSrc.length;
            //         let prevLen = this.playerImages[cur-1].currentSrc.length;

            //         let curInt = parseInt(this.playerImages[cur].currentSrc.substring(curLen-6, curLen-4));
            //         let prevInt = parseInt(this.playerImages[cur-1].currentSrc.substring(prevLen-6, prevLen-4));
            //         if(curInt >= prevInt) break;
                    
            //         let temp = this.playerImages[cur];
            //         this.playerImages[cur] = this.playerImages[cur-1];
            //         this.playerImages[cur-1] = temp;
            //         cur--;
            //     }
            // }

            // for(let i=1; i<this.coinImages.length; i++){
            //     let cur = i;
            //     while(cur > 0){
            //         let curLen = this.coinImages[cur].currentSrc.length;
            //         let prevLen = this.coinImages[cur-1].currentSrc.length;

            //         let curInt = parseInt(this.coinImages[cur].currentSrc.substring(curLen-6, curLen-4));
            //         let prevInt = parseInt(this.coinImages[cur-1].currentSrc.substring(prevLen-6, prevLen-4));
            //         if(curInt >= prevInt) break;
                    
            //         let temp = this.coinImages[cur];
            //         this.coinImages[cur] = this.coinImages[cur-1];
            //         this.coinImages[cur-1] = temp;
            //         cur--;
            //     }
            // }
        }
        
        sortImageSet(images){
            for(let i=1; i<images.length; i++){
                let cur = i;
                while(cur > 0){
                    let curLen = images[cur].currentSrc.length;
                    let prevLen = images[cur-1].currentSrc.length;

                    let curInt = parseInt(images[cur].currentSrc.substring(curLen-6, curLen-4));
                    let prevInt = parseInt(images[cur-1].currentSrc.substring(prevLen-6, prevLen-4));
                    if(curInt >= prevInt) break;
                    
                    let temp = images[cur];
                    images[cur] = images[cur-1];
                    images[cur-1] = temp;
                    cur--;
                }
            }
        }
    }

    let render = function(){
        // display.clearCanvas();
        display.drawBackground(stuffManager.backgroundImage);
        display.drawMap(stuffManager.tileSheetImage, stuffManager.tileSheet_columns, stuffManager.tileSheet_tile_size, stuffManager.tileSheet_spacing,
             game.world.map, game.world.columns, game.world.tile_set.tile_size);
        // display.drawPlayer(game.world.player, game.world.player.color);

        for(let i = game.world.coins.length-1; i >= 0; i--){
            let coin = game.world.coins[i];
            display.drawObject(stuffManager.coinImages[coin.frame_value], -1, -1, -1, -1, coin.x, coin.y, 30, 32);
        }

        for(let i = game.world.flies.length-1; i >= 0; i--){
            let fly = game.world.flies[i];
            display.drawObject(stuffManager.flyImages[fly.frame_value], -1, -1, -1, -1, fly.x, fly.y, fly.width, fly.height);
        }

        for(let i = game.world.slimes.length-1; i >= 0; i--){
            let slime = game.world.slimes[i];
            display.drawObject(stuffManager.slimeImages[slime.frame_value], -1, -1, -1, -1, slime.x + slime.offset_x, slime.y + slime.offset_y, slime.width, slime.height);
        }

        display.drawObject(stuffManager.playerImages[game.world.player.frame_value], -1, -1, -1, -1, game.world.player.x, game.world.player.y, 40, 54);
        display.render();
    };

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
        game.update();

        //checks if the player touches wate a.k.a loses
        let tileVal = game.world.getTileValue();
        if(tileVal == 44 || tileVal == 115 || tileVal == 103){
            window.location.href = 'GameOver.html';
        }

        if(game.world.triggeredDoor != undefined){
            runner.stop();
            game.world.setup(curLevel[game.world.triggeredDoor.destination_room]);
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
    let runner = new Runner(1000 / 45, update, render);

    game.world.setDifficulty(difficulty, curLevel);
    game.world.setup(curLevel["01"]);
    display.resize(game.world.width, game.world.height);

    /********************* Loading images start **********************/
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

    for(let i=1; i<=8; i++){
        stuffManager.requestImage("img/coins/coin_0" + i + ".png", (image) => {
            stuffManager.coinImages.push(image);
        });
    }

    for(let i=1; i<=4; i++){
        stuffManager.requestImage("img/enemies/fly/fly0" + i + ".png", (image) => {
            stuffManager.flyImages.push(image);
        });
    }

    for(let i=1; i<=4; i++){
        stuffManager.requestImage("img/enemies/slime/slime0" + i + ".png", (image) => {
            stuffManager.slimeImages.push(image);
        });
    }
    /*********************** Loading images end *********************/

    window.addEventListener("keydown", keyDownUp);
    window.addEventListener("keyup", keyDownUp);

    //Uncomment for testing
    //module.exports.StuffManager = StuffManager;
});