/*jslint node: true, nomen: true */
"use strict";

var Promise = require('bluebird'),
    ko = require('knockout');

function Action(options) {

  this.repo_worker_tasks = options.repositories.worker_tasks;
}
Action.prototype.run = function (parameters, solve) {

    var data = {};

    var self = this;

    if(parameters['api_string'] == true || parameters['api_string'] == false){

      data.session_url = parameters['session_url'];
      data.api_string = ko.toJSON({'accepted' : parameters['api_string']});

      this.repo_worker_tasks.selection_response(data).then(function(result){

        self.repo_worker_tasks.next_task(data).then(function(result){

          parameters.info.image = result['image'];

          solve({
            event: 'next-ok',

            data: {
                'info' : parameters['info'],
                'statistics_url' : parameters['statistics_url'],
                'action' : 'nothing'
            }

          });
        },function(err){

            if(err.status == 404){


            }
            else if(err.status == 410){

              $.notify({message: 'Congraturation. You have complete the task. There are not new images for the moment.'}, {allow_dismiss: true, type: 'success'});

              solve({
                event: 'next-ko',
                data : {

                  'info' : parameters['info'],
                  'statistics_url' : parameters['statistics_url'],
                }
              });
            }
        });}, function(err){

                console.log('Fatal error');

      });
    }

    else if(parameters['api_string'] == 'clear'){

      solve({
        event: 'next-ok',

        data: {
            'info' : parameters['info'],
            'statistics_url' : parameters['statistics_url'],
            'action' : 'clear'
        }
      });
    }

    else {

      data.session_url = parameters['session_url'];
      data.api_string = ko.toJSON({'skyline' : parameters['line']});

      if(parameters['line'] == undefined || parameters['line'] == ''){

        $.notify({message: 'You must annotate the image.'}, {allow_dismiss: true, type: 'danger'});

        solve({
          event: 'next-ok',

          data: {
              'info' : parameters['info'],
              'statistics_url' : parameters['statistics_url'],
              'action' : 'no annotation'
          }

        });
      }

      this.repo_worker_tasks.annotation_response(data).then(function(result){

        self.repo_worker_tasks.next_task(data).then(function(result){

          parameters.info.image = result['image'];

          solve({
            event: 'next-ok',

            data: {
                'info' : parameters['info'],
                'statistics_url' : parameters['statistics_url'],
                'action' : 'annotation'
            }

          });
        },function(err){

            if(err.status == 404){


            }
            else if(err.status == 410){

              $.notify({message: 'Congraturation. You have complete the task. There are not new images for the moment.'}, {allow_dismiss: true, type: 'success'});

              solve({
                event: 'next-ko',
                data : {

                  'info' : parameters['info'],
                  'statistics_url' : parameters['statistics_url'],
                }
              });
            }
        });}, function(err){

                console.log('Fatal error');

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
