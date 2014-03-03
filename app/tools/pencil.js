define([
  'underscore',
  'tools/tool'
], function (_, Tool) {
  'use strict';

  function Pencil(app, options) {
    this.initialize(app, options);
  }

  Pencil.prototype = new Tool();

  Pencil.prototype.Tool_initialize = Pencil.prototype.initialize;

  Pencil.prototype.initialize = function (app, options) {
    var defaults = {
      spread: 30,
      color: '#000'
    };
    this.Tool_initialize(app);
    this.options = _.extend(defaults, options);
  };

  Pencil.prototype.onStageMouseMove = function (e) {
    this.midPoint = [this.oldPoint[0] + e.stageX>>1, this.oldPoint[1] + e.stageY>>1];
    this.artboard.background.graphics.setStrokeStyle(1)
      .beginStroke(this.options.color)
      .moveTo(this.midPoint[0], this.midPoint[1])
      .curveTo(this.oldPoint[0], this.oldPoint[1], this.oldMidPoint[0], this.oldMidPoint[1]);

    this.oldPoint = [e.stageX, e.stageY];
    this.oldMidPoint = this.midPoint;

    this.artboard.background.updateCache('source-overlay');
    this.artboard.background.graphics.clear();
    this.stage.update();
  };

  return Pencil;

});