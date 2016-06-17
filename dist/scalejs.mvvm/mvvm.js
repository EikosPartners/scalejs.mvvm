'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _knockout = require('knockout');

var _knockout2 = _interopRequireDefault(_knockout);

var _knockout3 = require('knockout.mapping');

var _knockout4 = _interopRequireDefault(_knockout3);

var _scalejs = require('scalejs.core');

var _scalejs2 = _interopRequireDefault(_scalejs);

var _classBindingProvider = require('scalejs.mvvm/classBindingProvider');

var _classBindingProvider2 = _interopRequireDefault(_classBindingProvider);

var _htmlTemplateSource = require('./htmlTemplateSource');

var _htmlTemplateSource2 = _interopRequireDefault(_htmlTemplateSource);

var _selectableArray = require('./selectableArray');

var _selectableArray2 = _interopRequireDefault(_selectableArray);

var _ko = require('./ko.utils');

var _ko2 = _interopRequireDefault(_ko);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var merge = _scalejs2.default.object.merge,
    toArray = _scalejs2.default.array.toArray,
    classBindingProvider = new _classBindingProvider2.default({}, {
    log: _scalejs2.default.log.warn,
    fallback: true
}),
    root = _knockout2.default.observable(); /*global define,document*/
/*jslint nomen: true*/


_knockout2.default.bindingProvider.instance = classBindingProvider;

function observable(initialValue) {
    return _knockout2.default.observable(initialValue);
}

function observableArray(initialValue) {
    return _knockout2.default.observableArray(initialValue);
}

function computed(func) {
    return _knockout2.default.computed(func);
}

function toJson(viewModel) {
    // Extracts underlying value from observables
    return _knockout4.default.toJSON(viewModel);
}

function toObject(viewModel) {
    return JSON.parse(toJson(viewModel));
}

function registerBindings() {
    toArray(arguments).forEach(classBindingProvider.registerBindings.bind(classBindingProvider));
}

function toViewModel(data, viewModel, mappings) {
    var knockoutStyleMappings = Object.keys(mappings).reduce(function (o, k) {
        return merge(o, {
            k: k,
            create: function create(options) {
                return mappings[k](options.data);
            }
        });
    }, {});

    return _knockout4.default.fromJS(data, knockoutStyleMappings, viewModel);
}

function registerTemplates() {
    toArray(arguments).forEach(_htmlTemplateSource2.default.registerTemplates);
}

function dataBinding(name, data) {
    var binding = {};

    binding[name] = data;

    return binding;
}

function template(name, data) {
    return dataBinding('template', {
        name: name,
        data: data
    });
}

function dataClass(name, data) {
    return {
        dataClass: name,
        viewmodel: data
    };
}

function getElement(name) {
    return document.getElementsByTagName(name)[0];
}

function init(config) {
    var body,
        opening_comment = document.createComment(' ko class: scalejs-shell '),
        closing_comment = document.createComment(' /ko ');

    // Set the node to the parent element of the currently running script
    body = document.getElementsByTagName('script');
    body = body[body.length - 1].parentElement;
    Array.prototype.slice.call(document.getElementsByTagName("script")).forEach(function (el) {
        if ((el.getAttribute('data-main') || '').indexOf("app/app") != -1) {
            body = el.parentElement;
        }
    });

    if (body === getElement('html') || body === getElement('head')) {
        body = getElement('body');
    }

    if (body && !config.doNotRender) {
        body.appendChild(opening_comment);
        body.appendChild(closing_comment);

        registerBindings({
            'scalejs-shell': function scalejsShell(context) {
                return {
                    render: context.$data.root
                };
            }
        });

        _knockout2.default.applyBindings({ root: root }, body);
    }
}

exports.default = {
    core: {
        mvvm: {
            root: root,
            toJson: toJson,
            registerBindings: registerBindings,
            registerTemplates: registerTemplates,
            dataClass: dataClass,
            template: template,
            dataBinding: dataBinding,
            selectableArray: _selectableArray2.default,
            getRegisteredTemplates: _htmlTemplateSource2.default.getRegisteredTemplates,
            ko: {
                utils: _ko2.default
            }
        }
    },
    sandbox: {
        mvvm: {
            observable: observable,
            observableArray: observableArray,
            computed: computed,
            registerBindings: registerBindings,
            registerTemplates: registerTemplates,
            toJson: toJson,
            toViewModel: toViewModel,
            toObject: toObject,
            dataClass: dataClass,
            template: template,
            dataBinding: dataBinding,
            selectableArray: _selectableArray2.default,
            getRegisteredTemplates: _htmlTemplateSource2.default.getRegisteredTemplates,
            root: root
        }
    },
    init: init
};
//# sourceMappingURL=mvvm.js.map