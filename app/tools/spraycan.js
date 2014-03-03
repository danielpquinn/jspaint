define([
  'tools/tool'
], function (Tool) {
  'use strict';

  function Spraycan(app) {
    this.initialize(app);
  }

  Spraycan.prototype = new Tool();

  Spraycan.prototype.Tool_initialize = Spraycan.prototype.initialize;

  Spraycan.prototype.initialize = function (app) {
    this.Tool_initialize(app);
  };

  Spraycan.prototype.onStageMouseMove = function (e) {
    var i = 0;

    for(i; i < 10; i += 1) {
      this.artboard.background.graphics.beginFill(this.color).drawCircle(e.stageX + (Math.floor(Math.random() * 30) - 15), e.stageY + (Math.floor(Math.random() * 30) - 15), 2);
    }

    this.artboard.background.updateCache('source-overlay');
    this.artboard.background.graphics.clear();
    this.stage.update();
  };

  return Spraycan;

});