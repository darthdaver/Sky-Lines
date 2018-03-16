/*jslint node: true, nomen: true */
"use strict";

var Promise = require('bluebird');

function Action(options) {

  this.repo_master_images = options.repositories.master_images;
}
Action.prototype.run = function (parameters, solve) {

    var self = this;

    this.repo_master_images.i_d_findById(parameters['image_url']).then(function (item){

      //if the information about the image is not in the repository
      //execute a server call, otherwise not.
      if($.isEmptyObject(item)){

        console.log('chiamata image details');

        var data = {

          token : localStorage.getItem('token'),
          url : parameters['image_url']
        }

        self.repo_master_images.image_info(data).then(function(result){

        self.repo_master_images.i_d_insert(result);

        if(parameters['from'] == 'statistics'){

          console.log('entroooooo');

          solve({

                event: 'get-image-info-ok-statistics',

                data: {

                  url : parameters['image_url'],
                }
            });
        }

        else{

          solve({

                event: 'get-image-info-ok',

                data: {

                  url : parameters['image_url'],
                }
            });
        }
        }, function(err){

            console.log("Fatal error!");
        });
      }

      else{

        console.log("repo image details");

        if(parameters['from'] == 'statistics'){

          solve({

                event: 'get-image-info-ok-statistics',

                data: {

                  url : parameters['image_url'],
                }
            });
        }

        else{

          solve({

                event: 'get-image-info-ok',

                data: {

                  url : parameters['image_url'],
                }
            });
        }
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
