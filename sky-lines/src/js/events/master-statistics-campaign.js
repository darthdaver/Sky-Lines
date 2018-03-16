/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        data = data || {};
        var packet = {
            'info' : data,
            'statistics_url' : data['statistics'],
            'images_url' : data['images']
        };

        var promise = context.actions['get-statistics']({filters: packet});
        context.runningActionsByContainer['master-ended-campaign-selected-container'].push(promise);
        promise.then(function (result) {
            context.runningActionsByContainer['master-ended-campaign-selected-container'].splice(
                context.runningActionsByContainer['master-ended-campaign-selected-container'].indexOf(promise), 1
            );
            if (result.event) {
                context.events[result.event](context, result.data);
            }
        });
    };
};
