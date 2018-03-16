/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
  return function (context, data) {
      data = data || {};
      var packet = {
        'session_url' : data['session_url'],
        'type' : data['type'],
        'accepted' : data['accepted'],
        'annotated' : data['annotated'],
        'available' : data['available'],
        'rejected' : data['rejected'],
        'statistics_url' : data['statistics_url']
      };

      var promise = context.actions['response-start']({filters: packet});
      context.runningActionsByContainer['task-statistics-container'].push(promise);
      promise.then(function (result) {
          context.runningActionsByContainer['task-statistics-container'].splice(
              context.runningActionsByContainer['task-statistics-container'].indexOf(promise), 1
          );
          if (result.event) {
              context.events[result.event](context, result.data);
          }
      });
    };
};
