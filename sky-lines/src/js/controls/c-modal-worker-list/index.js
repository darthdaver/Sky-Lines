/*jslint node: true, nomen: true */
"use strict";

var ko = require('knockout'),
    Promise = require('bluebird');

function ViewModel(params) {
    var self = this;
    self._repository = params.context.repositories['master_workers'];
    self.context = params.context;
    self.status = ko.observable('');
    self.selected = ko.observable(undefined);
    self.items = ko.observableArray([]);

    self.worker = ko.observable({});

    self.status_campaign = ko.observable({});

    self.info = undefined;

    self.send = function (id) {

      //console.log(self.info);
      //console.log(id);
      self.context.events[id](self.context, self.info);
    };

    self.select = function() {

        self.selected(this.id);
        self.output = this;
        self.trigger.call(this, 'master-selected-worker-campaign');
    };

    self.trigger = function (id) {
        self.context.events[id](self.context, this);
    };
}

ViewModel.prototype.id = 'modal-worker-list';

ViewModel.prototype.fields = {
    id: 1
    ,'annotator': 1
    ,'fullname': 1
    ,'id': 1
    ,'selector': 1
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
    var firstItem;

    if(localStorage.getItem("enable") == 'true') {

      self.status_campaign({'status' : 'ready'});
    }
    else {

      self.status_campaign({'status' : 'no more ready'});
    }

    this._computing = this._repository.w_g_find_all().then(function (items) {
      self.selected(undefined);
      self.items(items);

      firstItem = items[0];

      if (items.length) {
          self.selected(items[0].id);
          self.output = items[0];
      }

      self.worker({});

      if(!$.isEmptyObject(self.filters)){

        self._computing = self._repository.w_d_findById(self.filters.worker_url).then(function (item) {

            var details = {

              'annotator' : item.annotator,
              'fullname' : item.fullname,
              'id' : item.id,
              'selector' : item.selector,
              'annotation' : item.annotation,
              'selection' : item.selection
            }

            self.info = details;

            var worker = {

                'fullname': ko.observable(item.fullname),
                'selector': ko.observable(item.selector),
                'annotator': ko.observable(item.annotator),
            }

            self.worker(worker);

            var id = '#' + self.filters.worker_url.split("/")[5];

            $(id).addClass("selected").siblings().removeClass("selected");
        });
      }

      else{

        if(firstItem != undefined){

          var obj = {

            'id' : firstItem['id'].split('/')[5]
          }

          selected(obj);

          self.context.events['master-selected-worker-campaign'](self.context, firstItem);
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
    ko.components.register('c-modal-worker-list', {
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
