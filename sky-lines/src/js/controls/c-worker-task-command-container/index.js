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
    self.items = ko.observableArray([]);

    self.info = ko.observable({

      'type' : 'type',
      'status' : 'stop'
    });

    self.task = {};


    self.trigger = function (id) {

        var attached = {

          'session_url' : self.info()['session_url'],
        }

        if(this == 'true'){

          attached.api_string = true
        }

        if(this == 'false'){

          attached.api_string = false
        }

        if(this == 'send'){

          attached.api_string = 'send'
        }

        if(this == 'clear'){

          attached.api_string = 'clear'
        }

        attached.info = self.info();
        attached.statistics_url = self.task.statistics_url;

        self.context.events[id](self.context, attached);
    };
}

ViewModel.prototype.id = 'worker-task-command-container';

ViewModel.prototype.fields = {
    id: 1
    ,'canonical': 1
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

    if(this.filters.alert != 'send'){

      self.task.statistics_url = this.filters.statistics_url;

      if(this.filters.refresh == 'refresh command'){

        self.info({

          'type' : 'type',
          'status' : 'stop'
        });
      }

      if(this.filters.image != undefined){

          self.filters['status'] = 'run'

          self.info(self.filters);

          var pack = {

            'from' : 'command-container',
            'statistics_url' : self.filters.statistics_url,
            'refresh' : 'not refresh'
          }

          if(this.filters.refresh == 'refresh'){

            self.context.events['worker-statistics-selected-task'](self.context, pack);
          }
      }
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
    ko.components.register('c-worker-task-command-container', {
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
