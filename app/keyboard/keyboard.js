define([
  'easeljs'
], function (createjs) {
  'use strict';

  function Keyboard() {
    this.initialize();
  }

  Keyboard.prototype = new createjs.EventDispatcher();

  Keyboard.prototype.EventDispatcher_initialize = Keyboard.prototype.initialize;

  Keyboard.prototype.initialize = function () {
    this.EventDispatcher_initialize();
    this.pressedKeys = [];
    this.originalEvent = undefined;

    this.keyMap = {
      91: 'command',
      16: 'shift',
      90: 'z'
    };

    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);

    this.keyPressedEvent = new createjs.Event('key pressed', true);
    this.keyReleasedEvent = new createjs.Event('key released', true);
  };

  Keyboard.prototype.onKeyDown = function (e) {
    var key = this.keyMap[e.keyCode];
    if (this.pressedKeys.indexOf(key) === -1 && key) {
      this.pressedKeys.push(key);
    }
    this.originalEvent = e;
    this.dispatchEvent(this.keyPressedEvent);
  };

  Keyboard.prototype.onKeyUp = function (e) {
    this.pressedKeys = [];
    this.originalEvent = e;
    this.dispatchEvent(this.keyReleasedEvent);
  };

  return Keyboard;
});