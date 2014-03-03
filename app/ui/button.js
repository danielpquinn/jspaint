define([
  'underscore',
  'easeljs'
], function (_, createjs) {
  'use strict';

  function Button(options) {
    this.initialize(options);
  }

  Button.prototype = new createjs.Container();

  Button.prototype.Container_initialize = Button.prototype.initialize;

  Button.prototype.initialize = function (options) {
    this.Container_initialize();
    var defaults = {
      text: '',
      width: 100,
      height: 20
    };
    this.options = _.extend(defaults, options);

    this.background = new createjs.Shape();
    this.background.graphics.beginFill('#ccc').drawRect(0, 0, this.options.width, this.options.height);

    this.text = new createjs.Text(options.text, 'regular 14px Arial', '#333');
    this.text.textAlign = 'center';
    this.text.lineHeight = 
    this.text.x = this.options.width / 2;
    this.text.y = 4;

    this.addChild(this.background);
    this.addChild(this.text);
  };

  return Button;
});