const { test, expect } = require('@jest/globals');
const req = require('./../src/controller');
let Controller = req.Controller;

let conInstance = undefined;

function init(){
  conInstance = new Controller();
}

beforeAll(() => {
  init();
});

test('testing keyDown on left key (37)', () => {
  conInstance.keyDownUp("keydown", 37);
  expect(conInstance.left.down).toBeTruthy();
});

test('testing keyUp on left key (37)', () => {
  conInstance.keyDownUp("keyup", 37);
  expect(conInstance.left.down).toBeFalsy();
});

test('testing keyDown on right key (39)', () => {
  conInstance.keyDownUp("keydown", 39);
  expect(conInstance.right.down).toBeTruthy();
});

test('testing keyUp on right key (39)', () => {
  conInstance.keyDownUp("keyup", 39);
  expect(conInstance.right.down).toBeFalsy();
});

test('testing keyDown on up key (38)', () => {
  conInstance.keyDownUp("keydown", 38);
  expect(conInstance.up.down).toBeTruthy();
});

test('testing keyUp on up key (38)', () => {
  conInstance.keyDownUp("keyup", 38);
  expect(conInstance.up.down).toBeFalsy();
});

test('testing "only single jump allowed per press" functionality', () => {
  for(let i=0; i<10; i++){ //simulating press-and-hold up key
    conInstance.keyDownUp("keydown", 38);
    if(i == 0) conInstance.up.active = false; //once it jumps, we set to false to stop following jumps
  }
  expect(conInstance.up.active).toBeFalsy(); //again to prevent more than one jumps per press
});