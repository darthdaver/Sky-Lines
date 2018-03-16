/*jslint node: true, nomen: true */
"use strict";

var Promise = require('bluebird');

//warning: the cache cannot be used in case of shared (and not proprietary) data,
//because of if a new worker is registered to the server the worker is not present in the repository.
//If we would use a cache system the new users does not appear until the log out and a new log in.
//It is not possible to add a new user to the cache after the registration because the server
//does not return the worker_url until we don't call all the workers and, moreover, if
//another user register itself in another window of the browser the other would not be aware of the
//new registration.

function Action(options) {

  this.repo_master_workers = options.repositories.master_workers;
}
Action.prototype.run = function (parameters, solve) {

    localStorage.setItem("enable",parameters['enable']);

    var self = this;

    console.log("chiamata all workers");

    self.repo_master_workers.w_g_remove_all();

    this.repo_master_workers.all_workers_campaign(parameters['workers_url']).then(function(result){

      self.repo_master_workers.w_g_insert(result['workers']);

      solve({
          event: 'get-workers-ok',
      });
    }, function(err){

        console.log("Fatal error!");
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
