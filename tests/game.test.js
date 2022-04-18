const { test, expect } = require('@jest/globals');
const reqGame = require('./../src/game');
const reqMain = require('./../main');

let Game = reqGame.Game;
let StuffManager = reqMain.StuffManager;

let gameInstance = undefined;

function init(){
  gameInstance = new Game();
}

beforeEach(() => {
  init();
});

test('testing getLeft, must be 40', () => {
  console.log('getLeft is ' + gameInstance.world.player.getLeft());
  expect(gameInstance.world.player.getLeft()).toBe(40);
});

test('testing getTop, must be 300', () => {
  console.log('getTop is ' + gameInstance.world.player.getTop());
  expect(gameInstance.world.player.getTop()).toBe(300);
});

test('testing moveLeft() then getLeft, must be 40 - (1.5 * friction)', () => {
  gameInstance.world.player.moveLeft();
  gameInstance.update();
  expect(gameInstance.world.player.getLeft()).toBe(40 - (1.5 * gameInstance.world.friction));
});

test('testing moveRight() then getLeft(), must be 40 + (1.5 * friction)', () => {
  gameInstance.world.player.moveRight();
  gameInstance.update();
  expect(gameInstance.world.player.getLeft()).toBe(40 + (1.5 * gameInstance.world.friction));
});

test('testing jump() then getTop() to confirm, must be 300 - (30 - gravity)', () => {
  gameInstance.world.player.jumping = false;
  gameInstance.world.player.jump();
  gameInstance.update();
  // expect(gameInstance.world.player.velocity_y).toBe(-27);
  expect(gameInstance.world.player.getTop()).toBe(300 - (30 - gameInstance.world.gravity));
});

test('testing proper animation update after moving to the Right', () => {
  gameInstance.world.player.moveRight();
  gameInstance.update();
  expect(gameInstance.world.player.frame_set).toBe(Game.World.Player.frame_sets['move-right']);
});

test('testing proper animation update fater moving to the Left', () => {
  gameInstance.world.player.moveLeft();
  gameInstance.update();
  expect(gameInstance.world.player.frame_set).toBe(Game.World.Player.frame_sets['move-left']);
});

test('testing proper animation update after jumping to the right', () => {
  gameInstance.world.player.jumping = false;
  gameInstance.world.player.moveRight();
  gameInstance.world.player.jump();
  gameInstance.update();
  expect(gameInstance.world.player.frame_set).toBe(Game.World.Player.frame_sets['jump-right']);
});

test('testing proper animation update after jumping to the left', () => {
  gameInstance.world.player.jumping = false;
  gameInstance.world.player.moveLeft();
  gameInstance.world.player.jump();
  gameInstance.update();
  expect(gameInstance.world.player.frame_set).toBe(Game.World.Player.frame_sets['jump-left']);
});

test('testing idle left animation update after standing still for a while', () => {
  gameInstance.world.player.moveLeft();
  for(let i=0; i<50; i++) gameInstance.update();
  expect(gameInstance.world.player.frame_set).toBe(Game.World.Player.frame_sets['idle-left']);
});

test('testing idle right animation update after standing still for a while', () => {
  gameInstance.world.player.moveRight();
  for(let i=0; i<50; i++) gameInstance.update();
  expect(gameInstance.world.player.frame_set).toBe(Game.World.Player.frame_sets['idle-right']);
});

test('testing player image load order for proper animation functionality (some images take longer to load than others, thus disrupt the order they were called in the code', () => {
  let stuffManager = new StuffManager();
  for(let i=1; i<=24; i++){
    stuffManager.requestImage("img/player/" + (i < 10 ? "0" : "") + i + ".png", (image) => {
        stuffManager.playerImages.push(image);
    });
  }

  let reality = true;
  for(let cur = 1; cur < stuffManager.playerImages.length; cur++){
    let curLen = this.playerImages[cur].currentSrc.length;
    let prevLen = this.playerImages[cur-1].currentSrc.length;
    let curInt = parseInt(this.playerImages[cur].currentSrc.substring(curLen-6, curLen-4));
    let prevInt = parseInt(this.playerImages[cur-1].currentSrc.substring(prevLen-6, prevLen-4));

    if(curInt < prevInt) reality = false;
  }

  expect(reality).toBeTruthy();
});

test('testing coin image load order for proper animation functionality (some images take longer to load than others, thus disrupt the order they were called in the code', () => {
  let stuffManager = new StuffManager();
  for(let i=1; i<=8; i++){
      stuffManager.requestImage("img/coins/coin_0" + i + ".png", (image) => {
          stuffManager.coinImages.push(image);
      });
  }

  let reality = true;
  for(let cur = 1; cur < stuffManager.coinImages.length; cur++){
    let curLen = this.coinImages[cur].currentSrc.length;
    let prevLen = this.coinImages[cur-1].currentSrc.length;
    let curInt = parseInt(this.coinImages[cur].currentSrc.substring(curLen-6, curLen-4));
    let prevInt = parseInt(this.coinImages[cur-1].currentSrc.substring(prevLen-6, prevLen-4));

    if(curInt < prevInt) reality = false;
  }

  expect(reality).toBeTruthy();
});