/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        data = data || {};
        var packet = {
            'images_url' : data['images'],
            'enable' : true
        };
        var promise = context.actions['get-images']({filters: packet});
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
