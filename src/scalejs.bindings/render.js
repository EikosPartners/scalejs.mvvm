/*global define,setTimeout,window*/
/// <reference path="../Scripts/_references.js" />
import core from 'scalejs.core';
import ko from 'knockout';
    /// <param name="ko" value="window.ko" />
    

    var is = core.type.is,
        has = core.object.has,
        unwrap = ko.utils.unwrapObservable;

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
                ko.applyBindingsToNode(element, binding, viewModel);
            } else {
                ko.virtualElements.emptyNode(element);
            }
        }

        if (value) {
            if (is(value.dataClass, 'string')) {
                // if dataClass is specified then get the binding from the bindingRouter
                bindingAccessor = ko.bindingProvider.instance.bindingRouter(value.dataClass, ko.bindingProvider.instance.bindings);
                if (!bindingAccessor) {
                    throw new Error('Don\'t know how to render binding "' + value.dataClass +
                                    '" - no such binding registered. ' +
                                    'Either register the bindng or correct its name.');
                }

                if (bindingAccessor) {
                    binding = is(bindingAccessor, 'function')
                            ? bindingAccessor.call(value.viewmodel || viewModel, bindingContext)
                            : bindingAccessor;
                }

            } else {
                // otherwise whole object is the binding
                binding = is(value, 'function') ? value.call(viewModel, bindingContext) : value;
            }
        }

        render = applyBindings;

        context = {
            getElement: function () {
                return element;
            }
        };

        render.call(context);

        ko.utils.domData.set(element, 'binding', binding);
    }
    /*jslint unparam: false*/

    export default {
        init: init,
        update: update
    };

