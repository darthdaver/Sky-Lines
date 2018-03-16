/*jslint node: true, nomen: true */
"use strict";

var Promise = require('bluebird');

function Action(options) {

  this.repo_master_workers = options.repositories.master_workers;
}
Action.prototype.run = function (parameters, solve) {

  var self = this;

  var data = {}

  data.worker_url = parameters['worker_url'];
  data.enable_url = parameters['enable_url'];

  data.type = 'enable';

  var split = parameters['enable_url'].split("/");


  //to catch what action have to be updated on the caches
  data.action = split[split.length - 1];

  this.repo_master_workers.enable_worker(data).then(function(result){

    //update caches
    self.repo_master_workers.w_update(data);

    $.notify({message: 'Worker enabled.'}, {allow_dismiss: true, type: 'success'});

    solve({
        event: 'enable-worker-ok',
        data: {
          worker_url : parameters['worker_url']
        }
    })
  }, function(err){

      console.log('Fatal error!');
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
