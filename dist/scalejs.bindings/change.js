'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _knockout = require('knockout');

var _knockout2 = _interopRequireDefault(_knockout);

var _scalejs = require('scalejs.core');

var _scalejs2 = _interopRequireDefault(_scalejs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*global define*/


var is = _scalejs2.default.type.is,
    has = _scalejs2.default.object.has;

/*jslint unparam: true*/
function init(element, valueAccessor, allBindingsAccessor, viewModel) {
    if (!has(viewModel)) {
        return;
    }

    var unwrap = _knockout2.default.utils.unwrapObservable,
        value = valueAccessor(),
        properties = unwrap(value),
        property,
        handler,

    //currentValue,
    changeHandler;

    function bindPropertyChangeHandler(h, currentValue) {
        return function (newValue) {
            if (newValue !== currentValue) {
                currentValue = newValue;
                h.call(viewModel, newValue, element);
            }
        };
    }

    function subscribeChangeHandler(property, changeHandler) {
        _knockout2.default.computed({
            read: function read() {
                var val = unwrap(viewModel[property]);
                changeHandler(val);
            },
            disposeWhenNodeIsRemoved: element
        });
    }

    for (property in properties) {
        if (properties.hasOwnProperty(property)) {
            handler = properties[property];
            if (is(handler.initial, 'function')) {
                handler.initial.apply(viewModel, [unwrap(viewModel[property]), element]);
            }
            if (is(handler.update, 'function')) {
                changeHandler = bindPropertyChangeHandler(handler.update, unwrap(viewModel[property]));
            }
            if (is(handler, 'function')) {
                changeHandler = bindPropertyChangeHandler(handler, unwrap(viewModel[property]));
            }
            if (changeHandler) {
                subscribeChangeHandler(property, changeHandler);
            }
        }
    }
}
/*jslint unparam: false*/

exports.default = {
    init: init
};
//# sourceMappingURL=change.js.map