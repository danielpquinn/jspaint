require.config({
  paths: {
    'easeljs': 'bower_components/easeljs/lib/easeljs-NEXT.min',
    'underscore': 'bower_components/underscore/underscore'
  },
  shim: {
    'easeljs': {
      exports: 'createjs'
    },
    'underscore': {
      exports: '_'
    }
  }
});

require([
  'app'
], function (App) {
  'use strict';

  window.JSPaint = App;
  window.dispatchEvent(new Event('jspaint:ready'));

});