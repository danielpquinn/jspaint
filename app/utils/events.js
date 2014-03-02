define(function () {
  'use strict';

  return {
    events: [],
    trigger: function (event, data) {
      this.events[event].apply(this, data);
    },
    on: function (event, handler) {
      this.events[event] = this.events[event] || [];
      this.events[event].push(handler);
    },
    off: function (event, handler) {
      var index = this.events[event].indexOf(handler);
      this.events[event].splice(index, 1);
    }
  }

});