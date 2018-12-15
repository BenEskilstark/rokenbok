'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _require = require('../settings'),
    VIEW_WIDTH = _require.VIEW_WIDTH,
    VIEW_HEIGHT = _require.VIEW_HEIGHT;

var _require2 = require('./makeEntity'),
    make = _require2.make;

var getInitialState = function getInitialState() {
  return {
    running: true,
    entities: [].concat(_toConsumableArray(seedBoks()), [make('truck', 50, 50), make('miner', 75, 75), make('factory', 400, 400)]),
    view: {
      width: VIEW_WIDTH,
      height: VIEW_HEIGHT,
      x: 0,
      y: 0,
      dragging: false,
      dragStartX: 0,
      dragStartY: 0
    }
  };
};

var seedBoks = function seedBoks() {
  var boks = [];
  for (var x = -1000; x < 1000; x += 5) {
    for (var y = -1000; y < 1000; y += 5) {
      if (Math.sqrt(x * x + y * y) >= 200) {
        boks.push(make('bok', x, y));
      }
    }
  }
  return boks;
};

module.exports = {
  getInitialState: getInitialState
};