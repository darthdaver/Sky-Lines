/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context) {
        var promise = context.actions['log-out-action']();
        context.runningActionsByContainer['welcome-to-user'].push(promise);
        promise.then(function (result) {
            context.runningActionsByContainer['welcome-to-user'].splice(
                context.runningActionsByContainer['welcome-to-user'].indexOf(promise), 1
            );
            if (result.event) {
                context.events[result.event](context, result.data);
            }
        });
    };
};
