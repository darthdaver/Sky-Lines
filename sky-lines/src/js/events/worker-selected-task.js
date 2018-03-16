/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {

        data = data || {};
        var packet = {
            'task_url' : data['id'],
            'type' : data['type'],
            'refresh' : 'refresh command'
        };

        var promise = context.actions['worker-get-information-task']({filters: packet});
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
