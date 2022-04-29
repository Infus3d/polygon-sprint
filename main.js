window.addEventListener("load", function(event){
    "use strict";

    let difficulty = sessionStorage.getItem('difficulty');
    if(difficulty == undefined) difficulty = "easy";
    let curLevel = levels[difficulty];

    let bgImageName = curLevel.backgroundImage;

    class StuffManager {
        constructor(){
            this.tileSheetImage = undefined;
            this.tileSheet_tile_size = undefined;
            this.tileSheet_columns = undefined;
            this.tileSheet_spacing = 2;

            this.backgroundImage = undefined;
            this.winImage = undefined;
            this.playerImages = [];
            this.coinImages = [];
            this.flyImages = [];
            this.slimeImages = [];
            this.keyImages = [];
            this.exitDoorImages = [];
            this.heartImages = [];

            this.numberImages = [];
            this.hudKeyImages = [];
        }
        
        //current count of loaded images
        static totalLoadCount = 0;
        
        //the threshold the counts need to reach before initiating the game with runner.start()
        //1 background, 1 tilesheet, 12 player_right, 12 player_left, 8 coin images, 4 fly images, 4 slime images, 11 numbers, 4, keys, 8 hud keys,
        //4 exit Door images, 1 'you win' image, 2 heart images
        static loadThreshold = 2 + 12 + 12 + 8 + 4 + 4 + 11 + 4 + 8 + 4 + 1 + 2;

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
            this.sortImageSet(this.numberImages);
            this.sortImageSet(this.keyImages);
            this.sortImageSet(this.hudKeyImages);
            this.sortImageSet(this.exitDoorImages);
            this.sortImageSet(this.heartImages);
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
        // display.drawScoreboard("black", 0, 0);
        // display.drawPlayer(game.world.player, game.world.player.color);

        if(game.world.exitDoor.visible){
            let d = game.world.exitDoor;
            display.drawObject(stuffManager.exitDoorImages[0 + 2*d.open], -1, -1, -1, -1, d.x, d.topHalfy, d.width, d.height / 2);
            display.drawObject(stuffManager.exitDoorImages[1 + 2*d.open], -1, -1, -1, -1, d.x, d.botHalfy, d.width, d.height / 2);
        }
        
        for(let i = game.world.keys.length-1; i >= 0; i--){
            let key = game.world.keys[i];
            display.drawObject(stuffManager.keyImages[key.keyNumber], -1, -1, -1, -1, key.x, key.y, key.width, key.height);
        }

        for(let i = game.world.coins.length-1; i >= 0; i--){
            let coin = game.world.coins[i];
            display.drawObject(stuffManager.coinImages[coin.frame_value], -1, -1, -1, -1, coin.x, coin.y, coin.width, coin.height);
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

        /** Drawing Scoreboard begin ***/
        display.drawScoreboard("Gainsboro");

        let s = scoreBoard;
        display.drawObject(stuffManager.coinImages[0], -1, -1, -1, -1, s.coin.x, s.coin.y, s.coin.width, s.coin.height);
        display.drawObject(stuffManager.numberImages[10], -1, -1, -1, -1, s.times.x, s.times.y, s.times.width, s.times.height);
        display.drawObject(stuffManager.numberImages[Math.floor(game.world.coinCount/10)], -1, -1, -1, -1, s.firstDigit.x, s.firstDigit.y, s.firstDigit.width, s.firstDigit.height);
        display.drawObject(stuffManager.numberImages[game.world.coinCount % 10], -1, -1, -1, -1, s.seconDigit.x, s.seconDigit.y, s.seconDigit.width, s.seconDigit.height);

        for(let i=0; i<game.world.player.totalLives; i++){
            display.drawObject(stuffManager.heartImages[(i < game.world.player.currentLives) ? 0 : 1], -1, -1, -1, -1, 
                s.hearts[i].x, s.hearts[i].y, s.hearts[i].width, s.hearts[i].height);
        }

        for(let i=0; i<game.world.totalKeys; i++){
            let curKeyStatus = game.world.keyStatus[i];
            display.drawObject(stuffManager.hudKeyImages[i + 4*curKeyStatus], -1, -1, -1, -1, 
                s.keys[i].x, s.keys[i].y, s.keys[i].width, s.keys[i].height);
        }
        /** Drawing Scoreboard end ***/

        if(game.world.gameWon == true)
            display.drawObject(stuffManager.winImage, -1, -1, -1, -1, 280, 120, 400, 400);

        display.render();
    };

    var audio = new Audio('sounds/music/backgroundMusic.mp3');

    let update = function(){
        if(!audio.paused){
            audio.play();
        }
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

        // Game winning state, not sure what to do with it yet
        // I just put up 'You Win!' image for now, can be changed
        // to a page with 'buttons' for next action
        if(game.world.gameWon == true){
            runner.stop();
            return;
        }

        //checks if the player touches wate a.k.a loses
        // let tileVal = game.world.getTileValue();
        if(/**tileVal == 44 || tileVal == 115 || tileVal == 103 ||**/ game.world.gameOver == true){
            runner.stop();
            window.location.href = 'GameOver.html';
            return;
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
    display.resize(game.world.width, game.world.height, game.world.score_rows, game.world.tile_set.tile_size);

    /********************* Loading images start **********************/
    stuffManager.requestImage("img/tiles_spritesheet.png", (image) => {
        stuffManager.tileSheetImage = image;
        stuffManager.tileSheet_tile_size = 70;
        stuffManager.tileSheet_columns = 12;
        stuffManager.tileSheet_spacing = 2;
    });
    stuffManager.requestImage("img/" + bgImageName, (image) => {
        stuffManager.backgroundImage = image;
    });
    stuffManager.requestImage("img/youwin.png", (image) => {
        stuffManager.winImage = image;
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
        stuffManager.requestImage("img/enemies/slime/green_slime0" + i + ".png", (image) => {
            stuffManager.slimeImages.push(image);
        });
    }

    for(let i=0; i<=10; i++){
        stuffManager.requestImage("img/hud/num_hud/hud_" + ((i < 10) ? "0" : "") + i + ".png", (image) => {
            stuffManager.numberImages.push(image);
        });
    }

    for(let i=0; i<4; i++){
        stuffManager.requestImage("img/keys/key0" + i + ".png", (image) => {
            stuffManager.keyImages.push(image);
        });
    }

    for(let i=0; i<8; i++){
        stuffManager.requestImage("img/hud/key_hud/hud_key0" + i + ".png", (image) => {
            stuffManager.hudKeyImages.push(image);
        });
    }

    for(let i=0; i<4; i++){
        stuffManager.requestImage("img/exit/exit0" + i + ".png", (image) => {
            stuffManager.exitDoorImages.push(image);
        });
    }
    
    for(let i=0; i<2; i++){
        stuffManager.requestImage("img/hud/heart_hud/hud_heart0" + i + ".png", (image) => {
            stuffManager.heartImages.push(image);
        });
    }
    /*********************** Loading images end *********************/

    window.addEventListener("keydown", keyDownUp);
    window.addEventListener("keyup", keyDownUp);

    //Uncomment for testing
    //module.exports.StuffManager = StuffManager;

    var audio = new Audio('sounds/music/backgroundMusic.mp3');
    audio.play();


});