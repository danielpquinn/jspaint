define([
  'tools/tool'
], function (Tool) {
  'use strict';

  function Pencil(app) {
    this.initialize(app);
  }

  Pencil.prototype = new Tool();

  Pencil.prototype.Tool_initialize = Pencil.prototype.initialize;

  Pencil.prototype.initialize = function (app) {
    this.Tool_initialize();

    this.stage = app.stage;
    this.artboard = app.artboard;
    this.color = '#000';
    
    this.onArtboardMouseDown = this.onArtboardMouseDown.bind(this);
    this.onStageMouseMove = this.onStageMouseMove.bind(this);
    this.onStageMouseUp = this.onStageMouseUp.bind(this);
    this.onColorSelected = this.onColorSelected.bind(this);

    this.artboard.addEventListener('mousedown', this.onArtboardMouseDown);
    this.stage.addEventListener('color selected', this.onColorSelected);
  };

  Pencil.prototype.onStageMouseUp = function (e) {
    this.stage.removeEventListener('stagemousemove', this.onStageMouseMove);
    this.stage.removeEventListener('stagemouseup', this.onStageMouseUp);
  };

  Pencil.prototype.onStageMouseMove = function (e) {
    this.midPoint = [this.oldPoint[0] + e.stageX>>1, this.oldPoint[1] + e.stageY>>1];
    this.artboard.background.graphics.setStrokeStyle(1)
      .beginStroke(this.color)
      .moveTo(this.midPoint[0], this.midPoint[1])
      .curveTo(this.oldPoint[0], this.oldPoint[1], this.oldMidPoint[0], this.oldMidPoint[1]);

    this.oldPoint = [e.stageX, e.stageY];
    this.oldMidPoint = this.midPoint;

    this.artboard.background.updateCache('source-overlay');
    this.artboard.background.graphics.clear();
    this.stage.update();
  };

  Pencil.prototype.onArtboardMouseDown = function (e) {
    this.oldPoint = [e.stageX, e.stageY];
    this.oldMidPoint = this.oldPoint;
    this.stage.addEventListener('stagemousemove', this.onStageMouseMove);
    this.stage.addEventListener('stagemouseup', this.onStageMouseUp);
    this.artboard.updateHistory();
  };

  Pencil.prototype.unBindEvents = function () {
    this.artboard.removeEventListener('mousedown', this.onArtboardMouseDown);
  };

  Pencil.prototype.onColorSelected = function (e) {
    this.color = e.target.color;
  };

  return Pencil;

});