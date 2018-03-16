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

    self.campaign_url = undefined;

    self.trigger = function (id) {

        console.log(self.campaign_url);
        console.log('campaign_url',self.campaign_url['url']);

        var packet = {

          'form' : self.output,
          'campaign_url' : self.campaign_url['url']
        }

        self.context.events[id](self.context, packet);
    };
}

ViewModel.prototype.id = 'edit-campaign-form';

ViewModel.prototype.waitForStatusChange = function () {
    return this._initializing ||
           Promise.resolve();
};

ViewModel.prototype._compute = function () {
    this.output = {
        'annotation_replica': this.input['annotation_replica'],
        'annotation_size': this.input['annotation_size'],
        'name': this.input['name'],
        'selection_replica': this.input['selection_replica'],
        'threshold': this.input['threshold'],
    }
    var self = this,
        fields = {
            'annotation_replica': ko.observable(this.input['annotation_replica']),
            'annotation_size': ko.observable(this.input['annotation_size']),
            'name': ko.observable(this.input['name']),
            'selection_replica': ko.observable(this.input['selection_replica']),
            'threshold': ko.observable(this.input['threshold']),
        },
        errors = {
            'annotation_replica': ko.observable(this.input['annotation_replica-error']),
            'annotation_size': ko.observable(this.input['annotation_size-error']),
            'name': ko.observable(this.input['name-error']),
            'selection_replica': ko.observable(this.input['selection_replica-error']),
            'threshold': ko.observable(this.input['threshold-error']),
        };
    fields['annotation_replica'].subscribe(function (value) {
        self.output['annotation_replica'] = value;
        self.errors()['annotation_replica'](undefined);
    });
    fields['annotation_size'].subscribe(function (value) {
        self.output['annotation_size'] = value;
        self.errors()['annotation_size'](undefined);
    });
    fields['name'].subscribe(function (value) {
        self.output['name'] = value;
        self.errors()['name'](undefined);
    });
    fields['selection_replica'].subscribe(function (value) {
        self.output['selection_replica'] = value;
        self.errors()['selection_replica'](undefined);
    });
    fields['threshold'].subscribe(function (value) {
        self.output['threshold'] = value;
        self.errors()['threshold'](undefined);
    });
    this.fields(fields);
    this.errors(errors);

    var ids = {};

    ids['annotation_replica'] = "edit-campaign-form_field_0_error";
    ids['annotation_size'] = "edit-campaign-form_field_1_error";
    ids['name'] = "edit-campaign-form_field_2_error";
    ids['selection_replica'] = "edit-campaign-form_field_3_error";
    ids['threshold'] = "edit-campaign-form_field_4_error";

    var placeholders = {}

    placeholders['annotation_replica'] = "Annotation Replica";
    placeholders['annotation_size'] = "Annotation Size";
    placeholders['name'] = "Name";
    placeholders['selection_replica'] = "Selection Replica";
    placeholders['threshold'] = "Threshold";

    edit_campaign_set_placeholder_red(ids,placeholders);

    this.status('computed');
};


ViewModel.prototype.init = function (options) {
    options = options || {};
    this.output = undefined;

    var self = this;

    if(options['filters'] != undefined){

      self.campaign_url = { 'url' : options['filters']['campaign_url'] };
    }

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
    ko.components.register('c-edit-campaign-form', {
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
