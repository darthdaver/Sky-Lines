/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {

        data = data || {};
        var packet = {
            'statistics_url' : data['statistics_url'],
            'refresh' : data['refresh']
        };

        var promise = context.actions['get-statistics-task']({filters: packet});
        context.runningActionsByContainer['worker-tasks-container'].push(promise);
        promise.then(function (result) {
            context.runningActionsByContainer['worker-tasks-container'].splice(
                context.runningActionsByContainer['worker-tasks-container'].indexOf(promise), 1
            );
            if (result.event) {
                context.events[result.event](context, result.data);
            }
        });
    };
};
