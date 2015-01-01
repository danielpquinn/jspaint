define([
  'underscore',
  'easeljs',
  'ui/button',
  'ui/panel'
], function (_, createjs, Button, Panel) {
  'use strict';

  function Weights(app) {
    this.initialize(app);
  }

  Weights.prototype = new Panel();

  Weights.prototype.Panel_initialize = Weights.prototype.initialize;

  Weights.prototype.initialize = function (app) {
    var self = this;

    this.buttonSize = 20;
    this.buttonPadding = 5;
    this.weights = [1, 2, 4, 8, 16];
    this.buttonContainer = new createjs.Container();

    this.Panel_initialize(app, ((this.buttonSize + this.buttonPadding) * this.weights.length) + 5, 30);

    this.buttonContainer.x = 5;
    this.buttonContainer.y = 5;
    this.onButtonMouseDown = this.onButtonMouseDown.bind(this);

    _.each(this.weights, function (weight, i) {
      var button = new Button({ text: weight, width: self.buttonSize });
      button.x = (self.buttonSize + self.buttonPadding) * i;
      button.weight = weight;
      button.addEventListener('mousedown', self.onButtonMouseDown);
      self.buttonContainer.addChild(button);
    });

    this.weightSelectedEvent = new createjs.Event('weight selected', true);

    this.addChildToBody(this.buttonContainer);
  };

  Weights.prototype.onButtonMouseDown = function (e) {
    e.currentTarget.dispatchEvent(this.weightSelectedEvent);
  };

  return Weights;

});