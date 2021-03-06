'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = selectableArray;

var _knockout = require('knockout');

var _knockout2 = _interopRequireDefault(_knockout);

var _scalejs = require('scalejs.core');

var _scalejs2 = _interopRequireDefault(_scalejs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/// <param name="ko" value="window.ko"/>


/*global define,document,setTimeout*/
/*jslint nomen: true*/
/// <reference path="../Scripts/knockout-2.2.1.debug.js" />
var isObservable = _knockout2.default.isObservable,
    unwrap = _knockout2.default.utils.unwrapObservable,
    observable = _knockout2.default.observable,
    computed = _knockout2.default.computed,
    has = _scalejs2.default.object.has,
    array = _scalejs2.default.array;

function selectableArray(items, opts) {
    /*selectable(items, {
        selectedItem: selectedTile,
        selectionPolicy: 'single',
        isSelectedPath: 'isSelected'
    });*/
    opts = opts || {};

    var selectedItem = opts.selectedItem || observable(),
        selectionPolicy = opts.selectionPolicy || 'single',
        result;

    function ensureIsSelectedExists(item) {
        // if item has isSelected property which is observable and selectedPath is not set
        // then nothing to do
        if (isObservable(item.isSelected) && (!has(opts.isSelectedPath) || opts.isSelectedPath === 'isSelected')) {
            return;
        }

        if (isObservable(item.isSelected)) {
            throw new Error('item has observable `isSelected` property but `isSelectedPath` specified as "' + opts.isSelectedPath + '". `selectable` uses `isSelected` property of an item ' + 'to determine whether it\'s selected. Either don\'t specify `isSelectedPath` or ' + 'rename `isSelected` property to something else.');
        }

        if (item.hasOwnProperty('isSelected')) {
            throw new Error('item has non-observable `isSelected` property. `selectable` uses `isSelected` ' + 'property of an item to determine whether it\'s selected. Either make `isSelected` ' + 'observable or rename it.');
        }

        item.isSelected = observable();

        // subscribe isSelectedPath property to isSelected
        if (has(opts.isSelectedPath) && opts.isSelectedPath !== 'isSelected' && !isObservable(item[opts.isSelectedPath])) {
            throw new Error('item\'s property "' + opts.isSelectedPath + '" specified by `isSelectedPath` ' + ' isn\'t observable. Either make it observable or specify different property in ' + ' `isSelectedPath`');
        }

        if (has(opts.isSelectedPath)) {
            item.isSelected = item[opts.isSelectedPath];
        }

        item.isSelected.subscribe(function (newValue) {
            if (newValue) {
                selectedItem(item);
            } else {
                if (selectedItem() === item) {
                    selectedItem(undefined);
                }
            }
        });
    }

    // subscribe to isSelected property of every item if isSelectedPath is specified
    if (isObservable(items)) {
        result = computed(function () {
            var unwrapped = unwrap(items);
            unwrapped.forEach(ensureIsSelectedExists);
            return array.copy(unwrapped);
        });
    } else {
        items.forEach(ensureIsSelectedExists);
        result = array.copy(items);
    }

    selectedItem.subscribe(function (newItem) {
        unwrap(result).forEach(function (item) {
            item.isSelected(item === newItem);
        });

        if (selectionPolicy === 'deselect' && newItem) {
            setTimeout(function () {
                selectedItem(undefined);
            }, 0);
        }
    });

    result.selectedItem = selectedItem;

    return result;
};
//# sourceMappingURL=selectableArray.js.map