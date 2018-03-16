/*jslint node: true, nomen: true */
"use strict";

var ko = require('knockout');

function ViewModel(params) {
    var self = this;
    self.context = params.context;

    self.init = function (options) {
        options = options || {};
        self.children.forEach(function (child){
            if (child === options.mask) {
                return;
            }
            self.context.vms[child].init(options);
        });
    };

    self.trigger = function (id) {
        self.context.events[id](self.context);
    };
}

ViewModel.prototype.id = 'task-control-container';
ViewModel.prototype.children = [
    'information-or-image-container' // window
    ,'worker-task-command-container' // Commands
];

exports.register = function () {
    ko.components.register('c-task-control-container', {
        viewModel: {
            createViewModel: function (params, componentInfo) {
                var vm = new ViewModel(params);
                params.context.vms[vm.id] = vm;
                params.context.runningActionsByContainer[vm.id] = [];
                ko.utils.domNodeDisposal.addDisposeCallback(componentInfo.element, function () {
                    params.context.runningActionsByContainer[vm.id].forEach(function (promise) {
                        promise.cancel();
                    })
                    delete params.context.runningActionsByContainer[vm.id];
                    delete params.context.vms[vm.id];
                });
                return vm;
            }
        },
        template: require('./index.html'),
        synchronous: true
    });
};
