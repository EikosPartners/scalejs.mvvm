'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _knockout = require('knockout');

var _knockout2 = _interopRequireDefault(_knockout);

var _scalejs = require('scalejs.core');

var _scalejs2 = _interopRequireDefault(_scalejs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*global define,document,WinJS*/
var toArray = _scalejs2.default.array.toArray,
    has = _scalejs2.default.object.has,
    templateEngine = new _knockout2.default.nativeTemplateEngine(),
    templates = {
    data: {}
};

function registerTemplates(templatesHtml) {
    // iterate through all templates (e.g. children of root in templatesHtml)
    // for every child get its templateId and templateHtml
    // and add it to 'templates'
    var div = document.createElement('div');

    if (typeof WinJS !== 'undefined') {
        WinJS.Utilities.setInnerHTMLUnsafe(div, templatesHtml);
    } else {
        div.innerHTML = templatesHtml;
    }

    toArray(div.childNodes).forEach(function (childNode) {
        if (childNode.nodeType === 1 && has(childNode, 'id')) {
            templates[childNode.id] = childNode.innerHTML;
        }
    });
}

function getRegisteredTemplates() {
    return templates;
}

function makeTemplateSource(template) {

    if (template instanceof Element) {
        return {
            nodes: _knockout2.default.templateSources.domElement.prototype.nodes.bind({ domElement: template })
        };
    }

    return {
        data: function data(key, value) {
            if (!has(templates.data, template)) {
                templates.data[template] = {};
            }

            // if called with only key then return the associated value
            if (arguments.length === 1) {
                return templates.data[template][key];
            }

            // if called with key and value then store the value
            templates.data[template][key] = value;
        },
        text: function text(value) {
            // if no value return the template content
            // since that's what KO wants
            if (arguments.length === 0) {
                return templates[template];
            }

            throw new Error('An attempt to override template "' + template + '" with content "' + value + '" ' + 'Template overriding is not supported.');
        }
    };
}

templateEngine.makeTemplateSource = makeTemplateSource;

_knockout2.default.setTemplateEngine(templateEngine);

exports.default = {
    registerTemplates: registerTemplates,
    getRegisteredTemplates: getRegisteredTemplates
};
//# sourceMappingURL=htmlTemplateSource.js.map