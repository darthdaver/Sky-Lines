/*jslint node: true, nomen: true */
"use strict";

var Promise = require('bluebird');

function Action(options) {

  this.repo_worker_tasks = options.repositories.worker_tasks;
}
Action.prototype.run = function (parameters, solve) {

    var self = this;

    this.repo_worker_tasks.t_s_findById(parameters['statistics_url']).then(function (item){

      //if the information about the campaign is not in the repository
      //execute a server call, otherwise not.
      /*if($.isEmptyObject(item)){*/

        console.log("chiamata get task statistics");

        var data = {

          token : localStorage.getItem('token'),
          url : parameters['statistics_url']
        }

        self.repo_worker_tasks.t_s_remove_task(parameters['statistics_url']);

        self.repo_worker_tasks.task_statistics(data).then(function(result){

            var packet = {

              id: parameters['statistics_url'],
              available: result['available'],
              accepted: result['accepted'],
              rejected: result['rejected'],
              annotated: result['annotated'],
            }

            self.repo_worker_tasks.t_s_insert(packet);

            solve({

                event: 'get-statistics-task-ok',

                data: {

                  'statistics_url' : parameters['statistics_url'],
                  'refresh' : parameters['refresh'],
                }
            });
        }, function(err){

            console.log("Fatal error!");
        });
      //}

      /*else{

        console.log("repo get task details");

        solve({

            event: 'get-statistics-task-ok',

            data: {

              statistics_url : parameters['statistics_url'],
            }
        });
      }*/
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
