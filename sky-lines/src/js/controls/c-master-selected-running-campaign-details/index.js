/*jslint node: true, nomen: true */
"use strict";

var ko = require('knockout'),
    Promise = require('bluebird');

function ViewModel(params) {
    var self = this;
    self._repository = params.context.repositories['master_campaigns'];
    self.context = params.context;
    self.status = ko.observable('');
    self.item = ko.observable(undefined);

    self.trigger = function (id) {
        self.context.events[id](self.context, self.item());
    };
}

ViewModel.prototype.id = 'master-selected-running-campaign-details';

ViewModel.prototype.fields = {
    id: 1
    ,'annotation_replica': 1
    ,'annotation_size': 1
    ,'execution': 1
    ,'id': 1
    ,'images': 1
    ,'name': 1
    ,'selection_replica': 1
    ,'statistics': 1
    ,'status': 1
    ,'threshold': 1
    ,'workers': 1
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

    if(this.filters.campaign_url != undefined){

      this._computing = this._repository.c_d_findById(this.filters.campaign_url).then(function (item) {

        var details = {

          'name' : item.name,
          'status' : item.status,
          'selection_replica' : item.selection_replica,
          'threshold' : item.threshold,
          'annotation_replica' : item.annotation_replica,
          'annotation_size' : item.annotation_size,
          'execution' : item.execution,
          'id' : item.id,
          'images' : item.image,
          'statistics' : item.statistics,
          'workers' : item.worker
        }

        self.output = details;
        self.item(details);
      });
    }

    else{

      this._computing = this._repository.c_g_find('started').then(function (items) {

        if(items.length > 0){

          self.context.events['master-selected-running-campaign'](self.context, items[0]);
        }
      });
    }

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

    self.item(undefined);
};

exports.register = function () {
    ko.components.register('c-master-selected-running-campaign-details', {
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
