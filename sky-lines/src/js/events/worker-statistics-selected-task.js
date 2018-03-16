/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {

        data = data || {};
        var packet = {
            'statistics_url' : data['statistics_url']
        };

        if(data['from'] == 'command-container'){

          packet.refresh = data['refresh command'];

          var promise = context.actions['get-statistics-task']({filters: packet});
          context.runningActionsByContainer['task-control-container'].push(promise);
          promise.then(function (result) {
              context.runningActionsByContainer['task-control-container'].splice(
                  context.runningActionsByContainer['task-control-container'].indexOf(promise), 1
              );
              if (result.event) {
                  context.events[result.event](context, result.data);
              }
          });
        }

        else{

          var promise = context.actions['get-statistics-task']({filters: packet});
          context.runningActionsByContainer['worker-selection-task-selected-container'].push(promise);
          promise.then(function (result) {
              context.runningActionsByContainer['worker-selection-task-selected-container'].splice(
                  context.runningActionsByContainer['worker-selection-task-selected-container'].indexOf(promise), 1
              );
              if (result.event) {
                  context.events[result.event](context, result.data);
              }
          });
        }
    };
};
