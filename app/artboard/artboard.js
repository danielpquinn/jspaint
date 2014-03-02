define([
  'underscore',
  'easeljs'
], function (_, createjs) {
  'use strict';

  function Artboard(app, settings) {
    this.initialize(app, settings);
  }

  Artboard.prototype = new createjs.Container();

  Artboard.prototype.Container_initialize = Artboard.prototype.initialize;

  Artboard.prototype.initialize = function (app, settings) {
    var defaults = {
      width: 1200,
      height: 800
    };
    this.Container_initialize();
    this.app = app;
    this.settings = _.extend(defaults, settings);

    this.background = new createjs.Shape();
    this.background.graphics.beginFill('#ffffff').drawRect(0, 0, this.settings.width, this.settings.height);
    this.background.cache(0, 0, this.settings.width, this.settings.height);

    this.addChild(this.background);

    this.history = [];
    this.historyPosition = -1;
    this.updateHistory();

    this.onKeyPressed = this.onKeyPressed.bind(this);
    this.app.keyboard.addEventListener('key pressed', this.onKeyPressed);
  };

  Artboard.prototype.onKeyPressed = function (e) {
    var pk = e.target.pressedKeys;
    if (_.contains(pk, 'command') && _.contains(pk, 'shift') && _.contains(pk, 'z')) {
      e.target.originalEvent.preventDefault();
      this.redo();
    } else if (_.contains(pk, 'command') && _.contains(pk, 'z')) {
      e.target.originalEvent.preventDefault();
      this.undo();
    }
  };

  Artboard.prototype.undo = function () {
    this.historyPosition -= 1;
    this.drawBackground();
  };

  Artboard.prototype.redo = function () {
    this.historyPosition += 1;
    this.drawBackground();
  };

  Artboard.prototype.drawBackground = function () {
    this.historyPosition = this.historyPosition < 0 ? 0 : this.historyPosition;
    this.historyPosition = this.historyPosition > this.history.length - 1 ? this.history.length - 1 : this.historyPosition;

    this.background.cacheCanvas = this.history[this.historyPosition];
    this.app.stage.update();
  };

  Artboard.prototype.updateHistory = function () {
    var canvas = document.createElement('canvas'),
      ctx = canvas.getContext('2d');

    canvas.width = this.settings.width;
    canvas.height = this.settings.height;
    ctx.drawImage(this.background.cacheCanvas, 0, 0);

    this.history[this.historyPosition] = canvas;
    if (this.history.length - 1 > this.historyPosition) {
      this.history = this.history.splice(0, this.historyPosition + 1);
    }
    if (this.historyPosition > 20) {
      this.history.shift();
    } else {
      this.historyPosition += 1;
    }
  };

  Artboard.removeEventListeners = function () {
    this.app.keyboard.removeEventListener('key pressed', this.onKeyPressed);
  };

  return Artboard;

});