/*jslint node: true, nomen: true */
"use strict";

var Promise = require('bluebird');

function Action(options) {

  this.repo_master_images = options.repositories.master_images;
}
Action.prototype.run = function (parameters, solve) {

    var self = this;

    localStorage.setItem("enable",parameters['enable']);

    if($.inArray(parameters['images_url'], get_image_url()) == -1 || get_new_images_flag(parameters['images_url']) == true){

        console.log("chiamata get images");

        if($.inArray(parameters['images_url'], urls) == -1){

          console.log('push get images');

          push_image_url(parameters['images_url']);
        }

        if(get_new_images_flag(parameters['images_url']) == true){

          console.log('new get images');
        }

        set_new_images_flag(parameters['images_url'],false);

        self.repo_master_images.all_images_campaign(parameters['images_url']).then(function(result){

          var repo_images = {

            id : parameters['images_url'],

            images : result['images']
          }

          self.repo_master_images.i_g_remove(parameters['images_url']);

          self.repo_master_images.i_g_insert(repo_images);

          solve({
                event: 'get-images-statistics-ok',
                data: {

                  info : parameters['info'],
                  campaign_images_url : parameters['images_url']
                }
          });
        }, function(err){

            console.log("Fatal error!");
        });
      }

      else {

        console.log("repo get images");

        solve({
            event: 'get-images-statistics-ok',

            data: {

              info : parameters['info'],
              campaign_images_url : parameters['images_url']
            }
        });
      }
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
