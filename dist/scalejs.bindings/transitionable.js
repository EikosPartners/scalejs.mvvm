'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _scalejs = require('scalejs.core');

var _scalejs2 = _interopRequireDefault(_scalejs);

var _knockout = require('knockout');

var _knockout2 = _interopRequireDefault(_knockout);

var _ko = require('../scalejs.mvvm/ko.utils');

var _ko2 = _interopRequireDefault(_ko);

require('scalejs.statechart-scion');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/// <param name="ko" value="window.ko"/>

/// <reference path="../scripts/_references.js" />
/*global console,define,setTimeout*/
/*jslint unparam: true*/
var array = _scalejs2.default.array,
    merge = _scalejs2.default.object.merge,
    statechart = _scalejs2.default.state.builder.builder({ logStatesEnteredAndExited: false }),
    state = _scalejs2.default.state.builder.state,
    isObservable = _knockout2.default.isObservable,
    unwrap = _knockout2.default.utils.unwrapObservable,

//observable = ko.observable,
computed = _knockout2.default.computed,
    cloneNodes = _ko2.default.cloneNodes;

function transitionManager(element, viewModel, spec) {
    var transitionsStatechart,
        transitionableState = spec.transitionableState,
        savedNodes,
        model;

    function updatetransitionableState(newState) {
        // update visual state later (to make sure we are not in statechart step)
        if (isObservable(transitionableState)) {
            setTimeout(function () {
                transitionableState(newState);
            }, 0);
        }
    }

    function renderChild() {
        _knockout2.default.virtualElements.setDomNodeChildren(element, cloneNodes(savedNodes));
        _knockout2.default.applyBindingsToDescendants(viewModel, element);
    }

    function clearChild() {
        savedNodes = cloneNodes(_knockout2.default.virtualElements.childNodes(element), true);
        _knockout2.default.virtualElements.emptyNode(element);
    }

    function runTransition(transitions) {
        var transition = transitions.shift(),
            child = _knockout2.default.virtualElements.childNodes(element).filter(function (e) {
            return e.nodeType === 1;
        })[0];

        if (transition) {
            setTimeout(function () {
                var context = {
                    element: child,
                    viewModel: viewModel,
                    renderChild: renderChild
                };

                transition.call(context, function () {
                    transitionsStatechart.send('transition.finished', { transition: transition });
                });
            }, 0);
        }
    }

    function start() {
        clearChild();

        computed({
            read: function read() {
                var st = unwrap(transitionableState);
                if (st) {
                    setTimeout(function () {
                        transitionsStatechart.send(st);
                    }, 0);
                }
            },
            disposeWhenNodeIsRemoved: element
        });

        transitionsStatechart.start();
    }

    model = merge({
        inTransitions: [],
        outTransitions: []
    }, spec);

    /*jslint white: true*/
    transitionsStatechart = statechart(
    // Initial
    state('in.started').onEntry(function () {
        this.transitions = array.copy(model.inTransitions);
    }).on(function () {
        return this.transitions.length > 0;
    }).goto('in.transitioning').goto('in.finished'), state('in.transitioning').onEntry(function () {
        runTransition(this.transitions);
    }).on('transition.finished', function () {
        return this.transitions.length > 0;
    }).goto('in.transitioning').on('transition.finished').goto('in.finished'), state('in.finished').onEntry(function () {
        updatetransitionableState('in.finished');
    }).on('out.started').goto('out.started'), state('out.started').onEntry(function () {
        this.transitions = array.copy(model.outTransitions);
    }).on(function () {
        return this.transitions.length > 0;
    }).goto('out.transitioning').goto('out.finished'), state('out.transitioning').onEntry(function () {
        runTransition(this.transitions);
    }).on('transition.finished', function () {
        return this.transitions.length > 0;
    }).goto('out.transitioning').on('transition.finished').goto('out.finished'),

    // Finished transitioning
    state('out.finished').onEntry(function () {
        updatetransitionableState('out.finished');
    }).on('in.transitioning').goto('in.started'));
    /*jslint white: false*/

    return {
        start: start
    };
}

function init(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
    return { 'controlsDescendantBindings': true };
}

function update(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
    var options = valueAccessor(),
        tm = transitionManager(element, viewModel, options);

    tm.start();
}

exports.default = {
    init: init,
    update: update
};

/*jslint unparam: false*/
//# sourceMappingURL=transitionable.js.map