define([
  'easeljs'
], function (createjs) {
  'use strict';

  function Button() {
    this.initialize();
  }

  Button.prototype = new createjs.Container();

  Button.prototype.Container_initialize = Button.prototype.initialize;

  Button.prototype.initialize = function () {
    this.Container_initialize();

    this.background = new createjs.Shape();
    this.background.graphics.beginFill('#ccc').drawRect(0, 0, 20, 20);

    this.addChild(this.background);
  };

  return Button;
});