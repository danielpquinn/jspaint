define([
  'underscore',
  'easeljs',
  'keyboard/keyboard',
  'ui/swatches',
  'artboard/artboard',
  'tools/pencil'
], function (_, createjs, Keyboard, Swatches, Artboard, Pencil) {
  'use strict';

  function App() {}

  App.prototype = new createjs.EventDispatcher();

  App.prototype.EventDispatcher_initialize = App.prototype.initialize;

  App.prototype.initialize = function (element) {
    this.EventDispatcher_initialize();
    this.layers = [];
    this.tool = undefined;

    this.keyboard = new Keyboard();
    this.stage = new createjs.Stage(element);
    this.artboard = new Artboard(this);
    this.swatches = new Swatches(this.stage);
    this.pencil = new Pencil(this);
    
    this.stage.addChild(this.artboard);
    this.stage.addChild(this.swatches);
    
    this.stage.update();
  };

  return App;
});