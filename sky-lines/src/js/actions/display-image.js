/*jslint node: true, nomen: true */
"use strict";

var Promise = require('bluebird');

function Action(options) {

  this.repo_master_images = options.repositories.master_images;
}
Action.prototype.run = function (parameters, solve) {

    var self = this;

    this.repo_master_images.i_v_findById(parameters['canonical']).then(function (item){

      //if the image is not in the repository
      //execute a server call, otherwise not.
      if($.isEmptyObject(item)){

        console.log('chiamata display image');

        var data = {

          token : localStorage.getItem('token'),
          url : parameters['canonical']
        }

        self.repo_master_images.selected_image(data).then(function(result){

        var packet = {

          id : parameters['canonical'],
          jpg : result
        }

        self.repo_master_images.i_v_insert(packet);

        solve({

              event: 'display-image-ok',

              data: {

                url : parameters['canonical'],
              }
          });
        }, function(err){

            console.log("Fatal error!");
        });
      }

      else{

        console.log("repo image");

        solve({

            event: 'display-image-ok',
            data: {

              url : parameters['image_url'],
            }
        });
      }
    });
};

exports.createAction = function (options) {
    var action = new Action(options);
    return function (data) {
        return new Promise(function (solve, reject, onCancel) {
            var parameters = (data && data.filters) || {};
            action.run(parameters, solve, onCancel);
        });
    };
};
