/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {

        data = data || {};
        var packet = {
            'campaign_url' : data['id'],
            'status' : data['status']
        };

        var promise = context.actions['master-get-information-campaign']({filters: packet});
        context.runningActionsByContainer['master-running-campaign-list-container'].push(promise);
        promise.then(function (result) {
            context.runningActionsByContainer['master-running-campaign-list-container'].splice(
                context.runningActionsByContainer['master-running-campaign-list-container'].indexOf(promise), 1
            );
            if (result.event) {
                context.events[result.event](context, result.data);
            }
        });
    };
};
