/*jslint node: true, nomen: true */
"use strict";

var Promise = require('bluebird');

function Action(options) {

  this.repo_worker_tasks = options.repositories.worker_tasks;
}
Action.prototype.run = function (parameters, solve) {

    var data = {};

    var self = this;

    var attached = {

      'session_url' : parameters['session_url'],
      'type' : parameters['type'],
      'accepted' : parameters['accepted'],
      'annotated' : parameters['annotated'],
      'available' : parameters['available'],
      'reject' : parameters['reject'],
      'statistics_url' : parameters['statistics_url']
    }

    data.session_url = parameters['session_url'];

    this.repo_worker_tasks.start_task(data).then(function(result){

      $.notify({message: 'Task started.'}, {allow_dismiss: true, type: 'success'});

      solve({
        event: 'start-task-ok',

        data : attached
      });
    }, function(err){

        console.log('failure', err);

        if(err.status == 404){

          $.notify({message: 'There are not new images.'}, {allow_dismiss: true, type: 'danger'});

          solve({
            event: 'next-ko-start'
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
