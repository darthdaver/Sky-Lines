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

    self.image = ko.observable({});
    self.info = ko.observable({});
    self.line = ko.observable();

    self.trigger = function (id) {
        self.context.events[id](self.context, this);
    };

    self.line.subscribe(function () {
        self.line();

        console.log(self.line());
    });

    self.pen  = ko.computed(function() {

      if (self.info()['size'] != undefined){
        return parseInt(self.info()['size']);
      }

      else{

        return 10;
      }
    }, this);
}

ViewModel.prototype.id = 'information-or-image-container';

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

    this.image({});

    if(this.filters != undefined){

      this.info(this.filters);
    }

    if(this.filters.image != undefined){

        var image = {

          'jpg' : this.filters.image
        }

        this.image(image);
    }

    if(this.filters.action == 'clear'){

      self.line('');

      var canvas = $("#mycanvas")[0];

      var context = canvas.getContext("2d");
      context.clearRect(0, 0, canvas.width,canvas.height);
      context.beginPath();
    }

    this.status('computed');
    this._computing = undefined;
  }

  else{

    var pack = self.filters;

    pack.line = self.line();

    console.log('line', pack);

    self.context.events['worker-send-annotation'](self.context, pack);
  }
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
    ko.components.register('c-information-or-image-container', {
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
