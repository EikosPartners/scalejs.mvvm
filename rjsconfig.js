'use strict';
/*jshint ignore:start*/
var require = {
  scalejs: {
    extensions: [
      '<%=ext_name%>'
    ]
  },
  map: {
    '*': {
      'scalejs.core': 'empty:'
    }
  },
  paths: {
    requirejs: '../bower_components/requirejs/require',
    scalejs: '../bower_components/scalejs/dist/scalejs',
    'scalejs.functional': '../bower_components/scalejs.functional/dist/scalejs.functional.min',
    text: '../bower_components/text/text',
    knockout: '../bower_components/knockout/dist/knockout',
    'knockout.mapping': '../bower_components/knockout.mapping/knockout.mapping',
    'scalejs.application': '../bower_components/scalejs/src/scalejs.application',
    'scalejs.core': '../bower_components/scalejs/src/scalejs.core',
    'scalejs.sandbox': '../bower_components/scalejs/src/scalejs.sandbox'
  },
  packages: [

  ],
  shim: {

  }
};
/*jshint ignore:end*/

