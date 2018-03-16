/*jslint node: true, nomen: true */
"use strict";

var ko = require('knockout'),
    Promise = require('bluebird');

function ViewModel(params) {
    var self = this;
    self.context = params.context;
    self.status = ko.observable('');
    self.fields = ko.observable({});
    self.errors = ko.observable({});

    self.trigger = function (id) {
        self.context.events[id](self.context, self.output);
    };
}

ViewModel.prototype.id = 'worker-account-form';

ViewModel.prototype.waitForStatusChange = function () {
    return this._initializing ||
           Promise.resolve();
};

ViewModel.prototype._compute = function () {
    this.output = {
        'fullname': this.input['fullname'],
        'password': this.input['password'],
    }
    var self = this,
        fields = {
            'fullname': ko.observable(this.input['fullname']),
            'password': ko.observable(this.input['password']),
        },
        errors = {
            'fullname': ko.observable(this.input['fullname-error']),
            'password': ko.observable(this.input['password-error']),
        };
    fields['fullname'].subscribe(function (value) {
        self.output['fullname'] = value;
        self.errors()['fullname'](undefined);
    });
    fields['password'].subscribe(function (value) {
        self.output['password'] = value;
        self.errors()['password'](undefined);
    });
    this.fields(fields);
    this.errors(errors);
    this.status('computed');

    var ids = {};

    ids['fullname'] = "worker-account-form_field_0_error";
    ids['password'] = "worker-account-form_field_1_error";

    var placeholders = {}

    placeholders['fullname'] = "Fullname";
    placeholders['password'] = "Password";

    edit_account_set_placeholder_red(ids,placeholders);
};


ViewModel.prototype.init = function (options) {
    options = options || {};
    this.output = undefined;
    this.fields({});
    this.errors({});
    this.input = options.input || {};
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
    ko.components.register('c-worker-account-form', {
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
