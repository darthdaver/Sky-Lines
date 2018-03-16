/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {

        data = data || {};
        var packet = {
            'statistics_url' : data['campaign_statistics_url']
          };

        var promise = context.actions['read-statistics-action']({filters: packet});
        context.runningActionsByContainer['statistics-modal'].push(promise);
        promise.then(function (result) {
            context.runningActionsByContainer['statistics-modal'].splice(
                context.runningActionsByContainer['statistics-modal'].indexOf(promise), 1
            );
            if (result.event) {
                context.events[result.event](context, result.data);
            }
        });
    };
};
