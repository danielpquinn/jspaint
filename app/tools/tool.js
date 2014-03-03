define([
  'underscore'
], function (_) {
  'use strict';

  function Tool(app) {}

  Tool.prototype.initialize = function (app) {
    this.stage = app.stage;
    this.artboard = app.artboard;
    
    this.onArtboardMouseDown = this.onArtboardMouseDown.bind(this);
    this.onStageMouseMove = this.onStageMouseMove.bind(this);
    this.onStageMouseUp = this.onStageMouseUp.bind(this);
    this.onColorSelected = this.onColorSelected.bind(this);

    this.artboard.addEventListener('mousedown', this.onArtboardMouseDown);
    this.stage.addEventListener('color selected', this.onColorSelected);
  };

  Tool.prototype.onStageMouseUp = function (e) {
    this.stage.removeEventListener('stagemousemove', this.onStageMouseMove);
    this.stage.removeEventListener('stagemouseup', this.onStageMouseUp);
  };

  Tool.prototype.onStageMouseMove = function (e) {
  };

  Tool.prototype.onArtboardMouseDown = function (e) {
    this.oldPoint = [e.stageX, e.stageY];
    this.oldMidPoint = this.oldPoint;
    this.stage.addEventListener('stagemousemove', this.onStageMouseMove);
    this.stage.addEventListener('stagemouseup', this.onStageMouseUp);
    this.artboard.updateHistory();
  };

  Tool.prototype.removeEventListeners = function () {
    this.artboard.removeEventListener('mousedown', this.onArtboardMouseDown);
    this.stage.removeEventListener('color selected', this.onColorSelected);
  };

  Tool.prototype.onColorSelected = function (e) {
    this.options.color = e.target.color;
  };

  return Tool;

});