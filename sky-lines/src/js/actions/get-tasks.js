/*jslint node: true, nomen: true */
"use strict";

var Promise = require('bluebird');

//warning: the cache cannot be used in case of shared (and not proprietary) data,
//because of if a new task is create by a master to the server, the task is not present in the repository.
//If we would use a cache system the new task does not appear until the log out and a new log in.
//It is not possible to add a new task to the cache after the creation because the server
//does not return the task_url until we don't call all the task and, moreover, if
//another task is created by a master in another window of the browser the other would not be aware of the
//new task.

function Action(options) {

  this.repo_worker_tasks = options.repositories.worker_tasks;

}
Action.prototype.run = function (parameters, solve) {

    var self = this;

    console.log("chiamata get tasks");

    self.repo_worker_tasks.t_g_remove_all();

    self.repo_worker_tasks.all_tasks(localStorage.getItem('token')).then(function(result){

    console.log('result_get_tasks', result);

    self.repo_worker_tasks.t_g_insert(result['tasks']);

    solve({
        event: 'load-tasks',
    });
  }, function(err){

        console.log("Fatal error!");
  });
};

exports.createAction = function (options) {

    if (typeof(Storage) !== "undefined") {
        // Store
        localStorage.setItem('campaigns_flag', false);
    }

    var action = new Action(options);
    return function (data) {
        return new Promise(function (solve, reject, onCancel) {
            var parameters = (data && data.filters) || {};
            action.run(parameters, solve, onCancel);
        });
    };
};
