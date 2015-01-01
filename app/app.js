define([
  'underscore',
  'easeljs',
  'keyboard/keyboard',
  'ui/panel-weights',
  'ui/panel-swatches',
  'ui/panel-tools',
  'artboard/artboard'
], function (_, createjs, Keyboard, Weights, Swatches, Tools, Artboard) {
  'use strict';


  function App() {}

  App.prototype.initialize = function (element) {
    var el = document.getElementById(element);
    el.width = window.innerWidth * 2;
    el.height = window.innerHeight * 2;
    el.style.width = window.innerWidth + 'px';
    el.style.height = window.innerHeight + 'px';
    this.layers = [];
    this.tool = undefined;

    this.keyboard = new Keyboard();
    this.stage = new createjs.Stage(el);
    this.artboard = new Artboard(this);
    this.Weights = new Weights(this);
    this.swatches = new Swatches(this);
    this.tools = new Tools(this);

    this.stage.canvas.getContext('2d').scale(2, 2);

    this.tools.x = 5;
    this.tools.y = 5;

    this.swatches.x = this.tools.width + 10;
    this.swatches.y = 5;

    this.Weights.x = this.tools.width + this.swatches.width + 15;
    this.Weights.y = 5;
    
    this.stage.addChild(this.artboard);
    this.stage.addChild(this.Weights);
    this.stage.addChild(this.swatches);
    this.stage.addChild(this.tools);
    
    this.stage.update();
  };

  return App;
});
