/*jslint node: true, nomen: true */
"use strict";

var ko = require('knockout'),
    Promise = require('bluebird');

function ViewModel(params) {
    var self = this;
    self._repository = params.context.repositories['master_images'];
    self.context = params.context;
    self.status = ko.observable('');
    self.selected = ko.observable(undefined);
    self.items = ko.observableArray([]);

    self.image = ko.observable({});

    self.status_campaign = ko.observable({});

    self.images_url = undefined;
    self.info = undefined;


    self.load_files = function (id) {

      $.each($('#upload_file')[0].files, function(i, file) {

        var data = new FormData();

        data.append('file-'+i, file);

        var send = {

          'campaign_images_url' : self.images_url['campaign_images_url'],
          'files' : data
        }

        self.context.events[id](self.context, send);
      });
    };

    self.select = function() {
        self.selected(this.id);
        self.output = this;
        self.trigger.call(this, 'image-selected');
    };

    self.trigger = function (id) {
        self.context.events[id](self.context, this);
    };
}

ViewModel.prototype.id = 'modal-images-list';

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
    var firstItem;

    if(localStorage.getItem("enable") == 'true') {

      self.status_campaign({'status' : 'ready'});
    }
    else {

      self.status_campaign({'status' : 'no more ready'});
    }

    self.image({});

    if(self.filters.campaign_images_url != undefined){
      this._computing = this._repository.i_g_find_all(self.filters.campaign_images_url).then(function (items) {

        self.selected(undefined);

        console.log(self.filters.campaign_images_url);

        var images_url = {

          'campaign_images_url' : self.filters.campaign_images_url,
        };

        self.images_url = images_url;

        firstItem = items[0]['images'][0];

        if (items[0]['images'].length > 0) {

          var elements = items[0];

          elements['images'].forEach(function(image,ind){

            image['name'] = "image_" + ind;
          });

          console.log(elements['images']);

          self.items(elements['images']);

          self.selected(elements['images'][0].id);
          self.output = elements['images'][0];

          var obj = {

            'id' : firstItem['id'].split('/')[5]
          }

          selected(obj);

          self.trigger.call(firstItem, 'image-selected');
        }

        else{

          self.items([]);
        }
      });
    }

    else if(self.filters.load == true){

      self.campaign_images_url = self.filters.url;

      var packet = {

        'images' : self.campaign_images_url
      }

      console.log('all_image_call');

      self.trigger.call(packet, 'images-details-waiting-campaign');
    }

    else if(self.filters.image_url != undefined){
        self._computing = self._repository.i_d_findById(self.filters.image_url).then(function (item) {

            var image = {

              'id': ko.observable(item.id),
              'canonical': ko.observable(item.canonical),
              'statistics': ko.observable(item.statistics),
            }

            self.info = image;

            var image = {

              'jpg' : item.canonical
            }

            self.image(image);

            var id = '#' + self.filters.image_url.split("/")[5];

            $(id).addClass("selected").siblings().removeClass("selected");
          });
    }

    else if(self.filters.canonical != undefined){

        self._computing = self._repository.i_v_findById(self.filters.canonical).then(function (item) {

            var image = {

              'jpg' : item.jpg
            }

            self.image(image);
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
    ko.components.register('c-modal-images-list', {
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
