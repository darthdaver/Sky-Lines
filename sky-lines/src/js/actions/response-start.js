/*jslint node: true, nomen: true */
"use strict";

var Promise = require('bluebird');

function Action(options) {

  this.repo_worker_tasks = options.repositories.worker_tasks;
}
Action.prototype.run = function (parameters, solve) {

    var data = {};

    var self = this;

    data.session_url = parameters['session_url'];

    this.repo_worker_tasks.next_task(data).then(function(result){

      var attached = {

        'session_url' : parameters['session_url'],
        'image' : result['image'],
        'type' : parameters['type'],
        'accepted' : parameters['accepted'],
        'annotated' : parameters['annotated'],
        'available' : parameters['available'],
        'reject' : parameters['reject'],
        'statistics_url' : parameters['statistics_url']
      }

      if(parameters['type'] == 'annotation'){

        attached.size = result['size'];
      }

      console.log('attached', attached);

      solve({
        event: 'next-ok-start',

        data: attached
      });
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
