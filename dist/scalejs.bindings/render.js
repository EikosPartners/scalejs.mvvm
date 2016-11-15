'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _scalejs = require('scalejs.core');

var _scalejs2 = _interopRequireDefault(_scalejs);

var _knockout = require('knockout');

var _knockout2 = _interopRequireDefault(_knockout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/// <param name="ko" value="window.ko" />


/*global define,setTimeout,window*/
/// <reference path="../Scripts/_references.js" />
var is = _scalejs2.default.type.is,
    has = _scalejs2.default.object.has,
    unwrap = _knockout2.default.utils.unwrapObservable;

function init() {
    return { 'controlsDescendantBindings': true };
}

/*jslint unparam: true*/
function update(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
    var value = unwrap(valueAccessor()),
        bindingAccessor,
        binding,
        context,
        render;

    function applyBindings() {
        if (binding) {
            _knockout2.default.applyBindingsToNode(element, binding, viewModel);
        } else {
            _knockout2.default.virtualElements.emptyNode(element);
        }
    }

    if (value) {
        if (is(value.dataClass, 'string')) {
            // if dataClass is specified then get the binding from the bindingRouter
            bindingAccessor = _knockout2.default.bindingProvider.instance.bindingRouter(value.dataClass, _knockout2.default.bindingProvider.instance.bindings);
            if (!bindingAccessor) {
                throw new Error('Don\'t know how to render binding "' + value.dataClass + '" - no such binding registered. ' + 'Either register the bindng or correct its name.');
            }

            if (bindingAccessor) {
                binding = is(bindingAccessor, 'function') ? bindingAccessor.call(value.viewmodel || viewModel, bindingContext) : bindingAccessor;
            }
        } else {
            // otherwise whole object is the binding
            binding = is(value, 'function') ? value.call(viewModel, bindingContext) : value;
        }
    }

    render = applyBindings;

    context = {
        getElement: function getElement() {
            return element;
        }
    };

    render.call(context);

    _knockout2.default.utils.domData.set(element, 'binding', binding);
}
/*jslint unparam: false*/

exports.default = {
    init: init,
    update: update
};
//# sourceMappingURL=render.js.map