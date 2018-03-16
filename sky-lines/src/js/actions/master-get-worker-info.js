/*jslint node: true, nomen: true */
"use strict";

var Promise = require('bluebird');

function Action(options) {

  this.repo_master_workers = options.repositories.master_workers;
}
Action.prototype.run = function (parameters, solve) {

    var self = this;

    this.repo_master_workers.w_d_findById(parameters['worker_url']).then(function (item){

      //if the information about the campaign is not in the repository
      //execute a server call, otherwise not.
      if($.isEmptyObject(item)){

        console.log('chiamata get worker');

        var data = {

          token : localStorage.getItem('token'),
          url : parameters['worker_url']
        }

        self.repo_master_workers.worker_info(data).then(function(result){

        self.repo_master_workers.w_d_insert(result);

        solve({

              event: 'get-worker-info-ok',

              data: {

                url : parameters['worker_url'],
              }
          });
        }, function(err){

            console.log("Fatal error!");
        });
      }

      else{

        console.log("repo get worker");

        solve({

            event: 'get-worker-info-ok',
            data: {

              url : parameters['worker_url'],
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
