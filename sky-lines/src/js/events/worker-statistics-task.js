/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context) {
        var promise = context.actions['get-statistics-task']();
        context.runningActionsByContainer['worker-ative-task-selected-container'].push(promise);
        promise.then(function (result) {
            context.runningActionsByContainer['worker-ative-task-selected-container'].splice(
                context.runningActionsByContainer['worker-ative-task-selected-container'].indexOf(promise), 1
            );
            if (result.event) {
                context.events[result.event](context, result.data);
            }
        });
    };
};
