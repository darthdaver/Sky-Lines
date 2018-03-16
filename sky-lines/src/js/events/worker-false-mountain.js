/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context) {
        var promise = context.actions['response']();
        context.runningActionsByContainer['worker-task-stat-and-command-container'].push(promise);
        promise.then(function (result) {
            context.runningActionsByContainer['worker-task-stat-and-command-container'].splice(
                context.runningActionsByContainer['worker-task-stat-and-command-container'].indexOf(promise), 1
            );
            if (result.event) {
                context.events[result.event](context, result.data);
            }
        });
    };
};
