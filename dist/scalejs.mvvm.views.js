'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/*global define*/
/*jslint unparam:true*/

exports.default = {
    load: function load(name, req, onLoad, config) {
        /*jslint regexp: true*/
        var names = name.match(/([^,]+)/g) || [];
        /*jslint regexp: false*/

        names = names.map(function (n) {
            if (n.indexOf('.html', n.length - 5) === -1) {
                n = n + '.html';
            }

            if (n.indexOf('/') === -1) {
                n = './views/' + n;
            }

            return 'text!' + n;
        });

        names.push('scalejs.mvvm', 'scalejs.core');

        req(names, function () {
            var core = arguments[arguments.length - 1],
                views = Array.prototype.slice.call(arguments, 0, arguments.length - 2);

            if (!config.isBuild) {
                core.mvvm.registerTemplates.apply(null, views);
            }

            onLoad(views);
        });
    }
};
//# sourceMappingURL=scalejs.mvvm.views.js.map