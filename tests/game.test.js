const { test, expect } = require('@jest/globals');
const req = require('./../src/game');
let Game = req.Game;

let gameInstance = undefined;

function init(){
  gameInstance = new Game();
}

beforeEach(() => {
  init();
});

test('testing getLeft, must be 20', () => {
  console.log('getLeft is ' + gameInstance.world.player.getLeft());
  expect(gameInstance.world.player.getLeft()).toBe(20);
});

test('testing getTop, must be 300', () => {
  console.log('getTop is ' + gameInstance.world.player.getTop());
  expect(gameInstance.world.player.getTop()).toBe(300);
});

test('testing moveLeft() then getLeft, must be 20 - (1.5 * friction)', () => {
  gameInstance.world.player.moveLeft();
  gameInstance.update();
  expect(gameInstance.world.player.getLeft()).toBe(20 - (1.5 * gameInstance.world.friction));
});

test('testing moveRight() then getLeft(), must be 20 + (1.5 * friction)', () => {
  gameInstance.world.player.moveRight();
  gameInstance.update();
  expect(gameInstance.world.player.getLeft()).toBe(20 + (1.5 * gameInstance.world.friction));
});

test('testing jump() then getTop() to confirm, must be 300 - (30 - gravity)', () => {
  gameInstance.world.player.jumping = false;
  gameInstance.world.player.jump();
  gameInstance.update();
  // expect(gameInstance.world.player.velocity_y).toBe(-27);
  expect(gameInstance.world.player.getTop()).toBe(300 - (30 - gameInstance.world.gravity));
});

