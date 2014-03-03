define([
  'easeljs'
], function (createjs) {
  'use strict';

  function Panel() {
  }

  Panel.prototype = new createjs.Container();

  Panel.prototype.Container_initialize = Panel.prototype.initialize;

  Panel.prototype.initialize = function (app, width, height) {
    this.Container_initialize();
    this.app = app;
    this.width = width || 80;
    this.height = height || 200;
    this.setBounds(0, 0, width, height);
    this.offset = [0, 0];

    this.handle = new createjs.Shape();
    this.handle.graphics.beginFill('#ccc').drawRect(0, 0, this.width, 20);

    this.bodyBackground = new createjs.Shape();
    this.bodyBackground.graphics.beginFill('#ddd').drawRect(0, 0, this.width, this.height);
    this.body = new createjs.Container();
    this.body.y = 20;
    this.body.addChild(this.bodyBackground);

    this.addChild(this.handle);
    this.addChild(this.body);

    this.onHandleMouseDown = this.onHandleMouseDown.bind(this);
    this.onStageMouseMove = this.onStageMouseMove.bind(this);
    this.onStageMouseUp = this.onStageMouseUp.bind(this);

    this.handle.addEventListener('mousedown', this.onHandleMouseDown);
  };

  Panel.prototype.addChildToBody = function (displayObject) {
    this.body.addChild(displayObject);
  };

  Panel.prototype.onHandleMouseDown = function (e) {
    this.app.stage.addChild(this);
    this.offset = [e.stageX - this.x, e.stageY - this.y];
    this.app.stage.addEventListener('stagemousemove', this.onStageMouseMove);
    this.app.stage.addEventListener('stagemouseup', this.onStageMouseUp);
    this.app.stage.update();
  };

  Panel.prototype.onStageMouseMove = function (e) {
    this.x = e.stageX - this.offset[0];
    this.y = e.stageY - this.offset[1];
    this.app.stage.update();
  };

  Panel.prototype.onStageMouseUp = function (e) {
    this.app.stage.removeEventListener('stagemousemove', this.onStageMouseMove);
    this.app.stage.removeEventListener('stagemouseup', this.onStageMouseUp);
  };

  Panel.prototype.unBindEvents = function () {
    this.handle.removeEventListener('mousedown', this.onHandleMouseDown);
  };

  return Panel;
});