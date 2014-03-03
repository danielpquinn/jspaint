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

    this.tool = undefined;
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

    this.onButtonMouseDown = this.onButtonMouseDown.bind(this);

    _.each(this.tools, function (tool, i) {
      var button = new Button({
        text: tool.name,
        width: self.buttonWidth
      });
      self.buttonContainer.addChild(button);
      button.y = 25 * i;
      button.addEventListener('mousedown', self.onButtonMouseDown);
    });

    this.addChildToBody(this.buttonContainer);
  };

  Tools.prototype.onButtonMouseDown = function (e) {
    var index = this.buttonContainer.children.indexOf(e.currentTarget);

    if (this.tool) { this.tool.removeEventListeners(); }

    this.tool = new this.tools[index].tool(this.app);
    console.log(this.tool);
  };

  Tools.prototype.unBindEvents = function () {
    button.removeEventListener('mousedown', self.onButtonMouseDown);
  };

  return Tools;
});