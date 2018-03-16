/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () {
    return function (context , data) {

      console.log('data-ev', data);

        data = data || {};
        var packet = {
            'form' : data['form'],
            'campaign_url' : data['campaign_url']
        };

        var promise = context.actions['edit-campaign-action']({filters: packet});
        context.runningActionsByContainer['edit-campaign-modal'].push(promise);
        promise.then(function (result) {
            context.runningActionsByContainer['edit-campaign-modal'].splice(
                context.runningActionsByContainer['edit-campaign-modal'].indexOf(promise), 1
            );
            if (result.event) {
                context.events[result.event](context, result.data);
            }
        });
    };
};
