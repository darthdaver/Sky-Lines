/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        data = data || {};
        var packet = {
            'annotation_replica' : data['annotation_replica']
            ,'annotation_size' : data['annotation_size']
            ,'name' : data['name']
            ,'selection_replica' : data['selection_replica']
            ,'threshold' : data['threshold']
        };
        var promise = context.actions['create-campaign-action']({filters: packet});
        context.runningActionsByContainer['master-create-campaign-container'].push(promise);
        promise.then(function (result) {
            context.runningActionsByContainer['master-create-campaign-container'].splice(
                context.runningActionsByContainer['master-create-campaign-container'].indexOf(promise), 1
            );
            if (result.event) {
                context.events[result.event](context, result.data);
            }
        });
    };
};
