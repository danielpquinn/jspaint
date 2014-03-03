define([
  'underscore',
  'tools/tool'
], function (_, Tool) {
  'use strict';

  function Spraycan(app, options) {
    this.initialize(app, options);
  }

  Spraycan.prototype = new Tool();

  Spraycan.prototype.Tool_initialize = Spraycan.prototype.initialize;

  Spraycan.prototype.initialize = function (app, options) {
    var defaults = {
      spread: 30,
      color: '#000'
    };

    this.Tool_initialize(app);
    this.options = _.extend(defaults, options);
  };

  Spraycan.prototype.onStageMouseMove = function (e) {
    var i = 0;

    for(i; i < 10; i += 1) {
      var xoffset = Math.floor(Math.random() * this.options.spread) - (this.options.spread / 2);
      var yoffset = Math.floor(Math.random() * this.options.spread) - (this.options.spread / 2);
      this.artboard.background.graphics.beginFill(this.options.color).drawCircle(e.stageX + xoffset, e.stageY + yoffset, 1);
    }

    this.artboard.background.updateCache('source-overlay');
    this.artboard.background.graphics.clear();
    this.stage.update();
  };

  return Spraycan;

});