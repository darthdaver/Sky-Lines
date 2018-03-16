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

ViewModel.prototype.id = 'sign-up-form';

ViewModel.prototype.waitForStatusChange = function () {
    return this._initializing ||
           Promise.resolve();
};

ViewModel.prototype._compute = function () {
    this.output = {
        'Fullname': this.input['Fullname'],
        'Password': this.input['Password'],
        'Type of account': this.input['Type of account'],
        'Username': this.input['Username'],
    }
    var self = this,
        fields = {
            'Fullname': ko.observable(this.input['Fullname']),
            'Password': ko.observable(this.input['Password']),
            'Type of account': ko.observable(this.input['Type of account']),
            'Username': ko.observable(this.input['Username']),
        },
        errors = {
            'Fullname': ko.observable(this.input['Fullname-error']),
            'Password': ko.observable(this.input['Password-error']),
            'Type of account': ko.observable(this.input['Type of account-error']),
            'Username': ko.observable(this.input['Username-error']),
        };
    fields['Fullname'].subscribe(function (value) {
        self.output['Fullname'] = value;
        self.errors()['Fullname'](undefined);
    });
    fields['Password'].subscribe(function (value) {
        self.output['Password'] = value;
        self.errors()['Password'](undefined);
    });
    fields['Type of account'].subscribe(function (value) {
        self.output['Type of account'] = value;
        self.errors()['Type of account'](undefined);
    });
    fields['Username'].subscribe(function (value) {
        self.output['Username'] = value;
        self.errors()['Username'](undefined);
    });
    this.fields(fields);
    this.errors(errors);
    this.status('computed');

    var ids = {};

    ids['fullname'] = "sign-up-form_field_0_error";
    ids['password'] = "sign-up-form_field_2_error";
    ids['username'] = "sign-up-form_field_1_error";

    var placeholders = {}

    placeholders['fullname'] = "Fullname";
    placeholders['password'] = "Password";
    placeholders['username'] = "Username";

    set_placeholder("sign-up-form_field_2","Password","#020037");
    sign_up_set_placeholder_red(ids,placeholders);
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
    ko.components.register('c-sign-up-form', {
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
