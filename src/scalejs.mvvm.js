/*global define*/
import core from 'scalejs.core';
import ko from 'knockout';
import mvvm from './mvvm';
import changeBinding from './scalejs.bindings/change';
import renderBinding from './scalejs.bindings/render';
    

    ko.bindingHandlers.change = changeBinding;
    ko.bindingHandlers.render = renderBinding;

    ko.virtualElements.allowedBindings.change = true;
    ko.virtualElements.allowedBindings.render = true;

    core.registerExtension(mvvm);

    // base 
    let { init } = mvvm;

    // rendering helpers
    let { root, template, dataClass, dataBinding } = mvvm.core.mvvm;

    // registry
    let { registerTemplates, registerBindings, getRegisteredTemplates } = mvvm.core.mvvm;

    // knockout
    let { observable, observableArray, computed } = mvvm.sandbox.mvvm;

    // viewmodel helpers
    let { toJson, toObject, toViewModel } = mvvm.sandbox.mvvm;

    export {
        init,
        root,
        template,
        dataClass,
        dataBinding,
        registerTemplates,
        registerBindings,
        getRegisteredTemplates,
        observable,
        observableArray,
        computed,
        toJson,
        toObject,
        toViewModel
    }

    export default mvvm


