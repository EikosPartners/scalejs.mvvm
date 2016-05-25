/*global define*/
define([
    'scalejs.core',
    'knockout',
    'scalejs.mvvm/mvvm',
    './scalejs.bindings/change',
    './scalejs.bindings/render',
    'module'
], function (
    core,
    ko,
    mvvm,
    changeBinding,
    renderBinding,
    module
) {
    'use strict';

    ko.bindingHandlers.change = changeBinding;
    ko.bindingHandlers.render = renderBinding;

    ko.virtualElements.allowedBindings.change = true;
    ko.virtualElements.allowedBindings.render = true;

    if(module.config && core.type.is(module.config, 'function')) {
        mvvm.init(module.config());
    } else {
        mvvm.init({});
    }

    core.registerExtension(mvvm);
});

