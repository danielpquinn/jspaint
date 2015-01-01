define([
  'underscore',
  'easeljs',
  'ui/panel'
], function (_, createjs, Panel) {
  'use strict';

  function Swatches(app) {
    this.initialize(app);
  }

  Swatches.prototype = new Panel();

  Swatches.prototype.Panel_initialize = Swatches.prototype.initialize;

  Swatches.prototype.initialize = function (app) {
    var self = this;
    
    this.rows = [
      [ '#333333', '#424242', '#5A5A5A', '#7B7B7B', '#919191', '#ACACAC', '#C0C0C0', '#CBCBCB', '#D8D8D8', '#E1E0E0' ],
      [ '#376269', '#3E8A83', '#45B29D', '#8DBC7B', '#D0C55B', '#ECB449', '#E69543', '#E27740', '#E16B44', '#E06047' ],
      [ '#BAC6B1', '#E2E1C2', '#FDF3CD', '#F0E4C1', '#DED1B0', '#D0C0A0', '#C0AB8C', '#AE9779', '#998268', '#89715B' ],
      [ '#092E35', '#184140', '#28544B', '#668567', '#A0B381', '#BDC28B', '#E7CF99', '#FFC594', '#FF8A6B', '#FF4138' ],
      [ '#324245', '#174550', '#024E5D', '#026473', '#037785', '#32949C', '#8ABEB9', '#EAEBDA', '#F2AC91', '#F26E4D' ],
      [ '#4E3345', '#B24547', '#FB5E55', '#E9837D', '#D1B7B6', '#A7CBCA', '#64CCCA', '#1ECDCA', '#2DB0D3', '#4B85DF' ]
    ];
    this.swatchSize = 20;
    this.swatchPadding = 5;

    this.Panel_initialize(app, this.rows[0].length * (this.swatchSize + this.swatchPadding) + 5, this.rows.length * (this.swatchSize + this.swatchPadding) + 5);

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