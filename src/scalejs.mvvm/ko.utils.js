/*global define*/
import core from 'scalejs.core';
import ko from 'knockout';
    

    function cloneNodes(nodesArray, shouldCleanNodes) {
        return core.array.toArray(nodesArray).map(function (node) {
            var clonedNode = node.cloneNode(true);
            return shouldCleanNodes ? ko.cleanNode(clonedNode) : clonedNode;
        });
    }

    export default {
        cloneNodes: cloneNodes
    };

