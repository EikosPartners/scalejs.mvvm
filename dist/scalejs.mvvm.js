'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.toViewModel = exports.toObject = exports.toJson = exports.computed = exports.observableArray = exports.observable = exports.getRegisteredTemplates = exports.registerBindings = exports.registerTemplates = exports.dataBinding = exports.dataClass = exports.template = exports.root = exports.init = undefined;

var _scalejs = require('scalejs.core');

var _scalejs2 = _interopRequireDefault(_scalejs);

var _knockout = require('knockout');

var _knockout2 = _interopRequireDefault(_knockout);

var _mvvm = require('./mvvm');

var _mvvm2 = _interopRequireDefault(_mvvm);

var _change = require('./scalejs.bindings/change');

var _change2 = _interopRequireDefault(_change);

var _render = require('./scalejs.bindings/render');

var _render2 = _interopRequireDefault(_render);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_knockout2.default.bindingHandlers.change = _change2.default; /*global define*/

_knockout2.default.bindingHandlers.render = _render2.default;

_knockout2.default.virtualElements.allowedBindings.change = true;
_knockout2.default.virtualElements.allowedBindings.render = true;

_scalejs2.default.registerExtension(_mvvm2.default);

// base
var init = _mvvm2.default.init;

// rendering helpers

var _mvvm$core$mvvm = _mvvm2.default.core.mvvm;
var root = _mvvm$core$mvvm.root;
var template = _mvvm$core$mvvm.template;
var dataClass = _mvvm$core$mvvm.dataClass;
var dataBinding = _mvvm$core$mvvm.dataBinding;

// registry

var _mvvm$core$mvvm2 = _mvvm2.default.core.mvvm;
var registerTemplates = _mvvm$core$mvvm2.registerTemplates;
var registerBindings = _mvvm$core$mvvm2.registerBindings;
var getRegisteredTemplates = _mvvm$core$mvvm2.getRegisteredTemplates;

// knockout

var _mvvm$sandbox$mvvm = _mvvm2.default.sandbox.mvvm;
var observable = _mvvm$sandbox$mvvm.observable;
var observableArray = _mvvm$sandbox$mvvm.observableArray;
var computed = _mvvm$sandbox$mvvm.computed;

// viewmodel helpers

var _mvvm$sandbox$mvvm2 = _mvvm2.default.sandbox.mvvm;
var toJson = _mvvm$sandbox$mvvm2.toJson;
var toObject = _mvvm$sandbox$mvvm2.toObject;
var toViewModel = _mvvm$sandbox$mvvm2.toViewModel;
exports.init = init;
exports.root = root;
exports.template = template;
exports.dataClass = dataClass;
exports.dataBinding = dataBinding;
exports.registerTemplates = registerTemplates;
exports.registerBindings = registerBindings;
exports.getRegisteredTemplates = getRegisteredTemplates;
exports.observable = observable;
exports.observableArray = observableArray;
exports.computed = computed;
exports.toJson = toJson;
exports.toObject = toObject;
exports.toViewModel = toViewModel;
exports.default = _mvvm2.default;
//# sourceMappingURL=scalejs.mvvm.js.map