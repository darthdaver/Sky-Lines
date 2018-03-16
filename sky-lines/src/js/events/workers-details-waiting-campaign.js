/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        data = data || {};
        var packet = {
            'workers_url' : data['workers'],
            'enable' : true
        };
        var promise = context.actions['get-workers']({filters: packet});
        context.runningActionsByContainer['master-waiting-campaign-selected-container'].push(promise);
        promise.then(function (result) {
            context.runningActionsByContainer['master-waiting-campaign-selected-container'].splice(
                context.runningActionsByContainer['master-waiting-campaign-selected-container'].indexOf(promise), 1
            );
            if (result.event) {
                context.events[result.event](context, result.data);
            }
        });
    };
};
