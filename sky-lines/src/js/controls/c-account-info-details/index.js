/*jslint node: true, nomen: true */
"use strict";

var ko = require('knockout'),
    Promise = require('bluebird');

function ViewModel(params) {
    var self = this;
    self._repository = params.context.repositories['general_account'];
    self.context = params.context;
    self.status = ko.observable('');
    self.item = ko.observable(undefined);

    self.trigger = function (id) {
        self.context.events[id](self.context, self.item());
    };
}

ViewModel.prototype.id = 'account-info-details';

ViewModel.prototype.fields = {
    id: 1
    ,'fullname': 1
    ,'username': 1
    ,'password': 1
    ,'type': 1
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
    this._computing = this._repository.i_a_findById(this.filters.username).then(function (item) {
        self.output = item;
        self.item(item);
        self.status('computed');
        self._computing = undefined;
    });
};


ViewModel.prototype.init = function (options) {
    options = options || {};
    this.output = undefined;
    this.filters = options.input || {'username' : localStorage.getItem('username')};
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
    ko.components.register('c-account-info-details', {
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
