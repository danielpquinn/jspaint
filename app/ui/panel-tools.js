define([
  'underscore',
  'ui/panel',
  'ui/button',
  'tools/pencil',
  'tools/spraycan'
], function (_, Panel, Button, Pencil, Spraycan) {
  'use strict';

  function Tools(app) {
    this.initialize(app);
  }

  Tools.prototype = new Panel();

  Tools.prototype.Panel_initialize = Tools.prototype.initialize;

  Tools.prototype.initialize = function (app) {
    var self = this;
    this.buttonWidth = 60;
    this.buttonHeight = 20;
    this.buttonPadding = 5;
    this.app = app;

    this.tool = new Pencil(app);
    this.tools = [{
      tool: Pencil,
      name: 'pencil'
    }, {
      tool: Spraycan,
      name: 'spraycan'
    }];

    this.Panel_initialize(app, this.buttonWidth + (this.buttonPadding * 2), (this.buttonHeight + this.buttonPadding) * this.tools.length + this.buttonPadding);

    this.buttonContainer = new createjs.Container();
    this.buttonContainer.x = 5;
    this.buttonContainer.y = 5;
    this.color = '#000';

    this.onButtonMouseDown = this.onButtonMouseDown.bind(this);
    this.onColorSelected = this.onColorSelected.bind(this);

    _.each(this.tools, function (tool, i) {
      var button = new Button({
        text: tool.name,
        width: self.buttonWidth
      });
      self.buttonContainer.addChild(button);
      button.y = 25 * i;
      button.addEventListener('mousedown', self.onButtonMouseDown);
    });

    this.app.stage.addEventListener('color selected', this.onColorSelected);

    this.addChildToBody(this.buttonContainer);
  };

  Tools.prototype.onButtonMouseDown = function (e) {
    var self = this,
      index = this.buttonContainer.children.indexOf(e.currentTarget);

    if (this.tool) { this.tool.removeEventListeners(); }

    this.tool = new this.tools[index].tool(this.app, {
      color: self.color
    });
  };

  Tools.prototype.onColorSelected = function (e) {
    this.color = e.target.color;
  };

  Tools.prototype.unBindEvents = function () {
    _.each(this.buttonContainer.children, function (button) {
      button.removeEventListener('mousedown', self.onButtonMouseDown);
    });
    this.app.stage.removeEventListener('color selected', this.onColorSelected);
  };

  return Tools;
});