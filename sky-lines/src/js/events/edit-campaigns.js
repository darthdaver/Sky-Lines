/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context) {
        var promise = context.actions['get-campaigns-action']();
        context.runningActionsByContainer['master-box'].push(promise);
        promise.then(function (result) {
            context.runningActionsByContainer['master-box'].splice(
                context.runningActionsByContainer['master-box'].indexOf(promise), 1
            );
            if (result.event) {
                context.events[result.event](context, result.data);
            }
        });
    };
};
