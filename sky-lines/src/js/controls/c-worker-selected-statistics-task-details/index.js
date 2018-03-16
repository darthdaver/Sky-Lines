/*jslint node: true, nomen: true */
"use strict";

var ko = require('knockout'),
    Promise = require('bluebird');

function ViewModel(params) {
    var self = this;
    self._repository = params.context.repositories['worker_tasks'];
    self.context = params.context;
    self.status = ko.observable('');
    self.item = ko.observable(undefined);

    self.info = ko.observable(undefined);

    self.statistics = {};

    self.trigger = function (id) {

        var parameters = {

            'session' : self.info()['session'],
            'type' : self.info()['type'],
            'accepted' : self.statistics['accepted'],
            'annotated' : self.statistics['annotated'],
            'available' : self.statistics['available'],
            'rejected' : self.statistics['rejected'],
            'statistics_url' : self.info()['statistics']
        }

        self.context.events[id](self.context, parameters);
    };
}

ViewModel.prototype.id = 'worker-selected-statistics-task-details';

ViewModel.prototype.fields = {
    id: 1
    ,'accepted': 1
    ,'annotated': 1
    ,'available': 1
    ,'rejected': 1
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

  if(this.filters.statistics_url != undefined){

    if(self.filters.refresh == 'refresh command'){

      var pack = {

        'refresh' : self.filters.refresh
      }

      self.context.events['set-commands'](self.context, pack);
    }

    this._repository.t_d_findByStatistics(this.filters.statistics_url).then(function (item) {

      var info = {

        'id' : item.id,
        'type' : item.type,
        'campaign' : item.campaign,
        'session' : item.session,
        'statistics' : item.statistics
      }

      self.info(info);
    });

    this._computing = this._repository.t_s_findById(this.filters.statistics_url).then(function (item) {

      var details = {}

      if(item.accepted != undefined){

        details['accepted'] = item.accepted;
      }
      else {

        details['accepted'] = "-";
      }

      if(item.annotated != undefined){

        details['annotated'] = item.annotated;
      }
      else {

        details['annotated'] = "-";
      }

      if(item.available != undefined){

        details['available'] = item.available;
      }
      else {

        details['available'] = "-";
      }

      if(item.accepted != undefined){

        details['rejected'] = item.rejected;
      }
      else {

        details['rejected'] = "-";
      }

      self.statistics = details;

      self.output = details;
      self.item(details);
    });
  }

  else if(self.filters.session_url != undefined){

    var details = {}

    if(self.filters.accepted != undefined){

      details['accepted'] = self.filters.accepted;
    }
    else {

      details['accepted'] = "-";
    }

    if(self.filters.annotated != undefined){

      details['annotated'] = item.annotated;
    }
    else {

      details['annotated'] = "-";
    }

    if(self.filters.available != undefined){

      details['available'] = item.available;
    }
    else {

      details['available'] = "-";
    }

    if(self.filters.accepted != undefined){

      details['rejected'] = item.rejected;
    }
    else {

      details['rejected'] = "-";
    }

    self.statistics = details;

    self.output = details;
    self.item(details);
  }

  else{

    this._computing = this._repository.t_g_find('selection').then(function (items) {

      if(items.length > 0){

        self.context.events['worker-selected-task'](self.context, items[0]);
      }

      else{

        self._repository.t_g_find('annotation').then(function (items) {

          if(items.length > 0){

            self.context.events['worker-selected-task'](self.context, items[0]);
          }
        });
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
};

exports.register = function () {
    ko.components.register('c-worker-selected-statistics-task-details', {
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
