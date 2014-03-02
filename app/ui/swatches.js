define([
  'underscore',
  'ui/panel'
], function (_, Panel) {
  'use strict';

  function Swatches(stage) {
    this.initialize(stage);
  }

  Swatches.prototype = new Panel();

  Swatches.prototype.Panel_initialize = Swatches.prototype.initialize;

  Swatches.prototype.initialize = function (stage) {
    var self = this;
    
    this.rows = [
      ['#000', '#333', '#666', '#999', '#ccc', '#eee', '#fff'],
      ['#FF0000', '#FF9D00', '#FBFF00', '#00FF19', '#3300FF', '#0073FF', '#AA00FF']
    ];
    this.swatchSize = 20;
    this.swatchPadding = 5;

    this.Panel_initialize(stage, this.rows[0].length * (this.swatchSize + this.swatchPadding) + 5, this.rows.length * (this.swatchSize + this.swatchPadding) + 5);

    this.onButtonMouseDown = this.onButtonMouseDown.bind(this);

    this.buttonContainer = new createjs.Container();
    this.buttonContainer.x = 5;
    this.buttonContainer.y = 5;
    
    _.each(this.rows, function (row, i) {
      _.each(row, function (color, j) {
        var colorButton = new createjs.Shape();
        colorButton.graphics.beginFill(color).drawRect(0, 0, self.swatchSize, self.swatchSize);
        colorButton.x = (self.swatchSize + self.swatchPadding) * j;
        colorButton.y = (self.swatchSize + self.swatchPadding) * i;
        colorButton.color = color;
        colorButton.addEventListener('mousedown', self.onButtonMouseDown);
        self.buttonContainer.addChild(colorButton);
      });
    });

    this.colorSelectedEvent = new createjs.Event('color selected', true);

    this.addChildToBody(this.buttonContainer);
  };

  Swatches.prototype.onButtonMouseDown = function (e) {
    e.currentTarget.dispatchEvent(this.colorSelectedEvent);
  };

  return Swatches;
});