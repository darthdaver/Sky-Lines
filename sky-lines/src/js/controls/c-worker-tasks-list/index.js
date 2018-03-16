/*jslint node: true, nomen: true */
"use strict";

var ko = require('knockout'),
    Promise = require('bluebird');

function ViewModel(params) {
    var self = this;
    self._repository = params.context.repositories['worker_tasks'];
    self.context = params.context;
    self.status = ko.observable('');
    self.selected = ko.observable(undefined);
    self.items_sel = ko.observableArray([]);
    self.items_ann = ko.observableArray([]);

    self.select = function() {
        self.selected(this.id);
        self.output = this;
        self.trigger.call(this, 'worker-selected-task');
    };

    self.trigger = function (id) {
        self.context.events[id](self.context, this);
    };
}

ViewModel.prototype.id = 'worker-tasks-list';

ViewModel.prototype.fields = {
    id: 1
    ,'task_url': 1
    ,'name': 1
};

ViewModel.prototype.waitForStatusChange = function () {
    return this._computing ||
           this._initializing ||
           Promise.resolve();
};

ViewModel.prototype._compute = function() {
    if (this._computing) {
        this._computing.cancel();
    }
    var self = this;

    var items_sel_ext;

    this._computing = this._repository.t_g_find('selection').then(function (items_sel) {

        console.log('items_sel',items_sel);

        items_sel_ext = items_sel;

        self.selected(undefined);
        self.items_sel(items_sel);
        if (items_sel.length) {
            self.selected(items_sel[0].id);
            self.output = items_sel[0];

            var obj = {

              'id' : 'task_0_selection'
            }

            selected_sel_ann(obj);
        }
    });

    self._repository.t_g_find('annotation').then(function (items_ann) {

        console.log('items_ann',items_ann);

        self.selected(undefined);
        self.items_ann(items_ann);
        if (items_ann.length) {
            //self.selected(items_ann[0].id);
            //self.output = items_ann[0];

            if (!items_sel_ext.length){
              var obj = {

                'id' : 'task_0_annotation'
              }

              selected_sel_ann(obj);
            }
        }
    });


    self.status('computed');
    self._computing = undefined;
};


ViewModel.prototype.init = function (options) {
    options = options || {};
    this.output = undefined;
    this.filters = options.input || {};
    this.status('ready');
    var self = this;
    this._initializing = new Promise(function (resolve) {
        setTimeout(function () {
            self._compute();
            resolve();
            self._initializing = undefined;
        }, 1);
    });
};

exports.register = function () {
    ko.components.register('c-worker-tasks-list', {
        viewModel: {
            createViewModel: function (params, componentInfo) {
                var vm = new ViewModel(params);
                params.context.vms[vm.id] = vm;
                ko.utils.domNodeDisposal.addDisposeCallback(componentInfo.element, function () { delete params.context.vms[vm.id]; });
                return vm;
            }
        },
        template: require('./index.html'),
        synchronous: true
    });
};
