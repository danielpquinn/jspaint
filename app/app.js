define([
  'underscore',
  'easeljs',
  'keyboard/keyboard',
  'ui/panel-swatches',
  'ui/panel-tools',
  'artboard/artboard'
], function (_, createjs, Keyboard, Swatches, Tools, Artboard) {
  'use strict';

  function App() {}

  App.prototype.initialize = function (element) {
    this.layers = [];
    this.tool = undefined;

    this.keyboard = new Keyboard();
    this.stage = new createjs.Stage(element);
    this.artboard = new Artboard(this);
    this.tools = new Tools(this);
    this.swatches = new Swatches(this);

    this.stage.canvas.getContext('2d').scale(2, 2);

    this.tools.x = 5;
    this.tools.y = 5;

    this.swatches.x = this.tools.width + 10;
    this.swatches.y = 5;
    
    this.stage.addChild(this.artboard);
    this.stage.addChild(this.swatches);
    this.stage.addChild(this.tools);
    
    this.stage.update();
  };

  return App;
});