'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _scalejs = require('scalejs.core');

var _scalejs2 = _interopRequireDefault(_scalejs);

var _knockout = require('knockout');

var _knockout2 = _interopRequireDefault(_knockout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*global define*/
function cloneNodes(nodesArray, shouldCleanNodes) {
    return _scalejs2.default.array.toArray(nodesArray).map(function (node) {
        var clonedNode = node.cloneNode(true);
        return shouldCleanNodes ? _knockout2.default.cleanNode(clonedNode) : clonedNode;
    });
}

exports.default = {
    cloneNodes: cloneNodes
};
//# sourceMappingURL=ko.utils.js.map