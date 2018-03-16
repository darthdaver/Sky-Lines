/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {

        data = data || {};

        var packet = {
          'session_url' : data['session_url'],
          'api_string' : data['api_string'],
          'info' : data['info'],
          'statistics_url' : data['statistics_url'],
          'line' : data['line']
        };

        var promise = context.actions['response']({filters: packet});
        context.runningActionsByContainer['task-control-container'].push(promise);
        promise.then(function (result) {
            context.runningActionsByContainer['task-control-container'].splice(
                context.runningActionsByContainer['task-control-container'].indexOf(promise), 1
            );
            if (result.event) {
                context.events[result.event](context, result.data);
            }
        });
    };
};
