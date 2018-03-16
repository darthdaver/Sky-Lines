/*jslint node: true, nomen: true */
"use strict";

var Promise = require('bluebird');

function Action(options) {

  this.repo_worker_tasks = options.repositories.worker_tasks;
}
Action.prototype.run = function (parameters, solve) {

    var self = this;

    this.repo_worker_tasks.t_d_findById(parameters['task_url']).then(function (item){

      //if the information about the campaign is not in the repository
      //execute a server call, otherwise not.
      if($.isEmptyObject(item)){

        console.log("chiamata get task details");

        var data = {

          token : localStorage.getItem('token'),
          url : parameters['task_url']
        }

        self.repo_worker_tasks.task_info(data).then(function(result){

            self.repo_worker_tasks.t_d_insert(result);

            solve({

                event: 'worker-selected-task-get-info-ok',

                data: {

                  statistics_url : result['statistics'],
                }
            });
          },function(err){

          console.log("Fatal error!");
        });
      }

      else{

        console.log("repo get task details");

        solve({

            event: 'worker-selected-task-get-info-ok',

            data: {

                statistics_url : item['statistics'],
                refresh : parameters['refresh']
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
