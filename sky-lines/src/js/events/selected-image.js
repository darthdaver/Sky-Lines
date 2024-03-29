/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {

        data = data || {};
        var packet = {
            'canonical' : data['canonical']
        };

        var promise = context.actions['display-image']({filters: packet});
        context.runningActionsByContainer['images-waiting-modal-container'].push(promise);
        promise.then(function (result) {
            context.runningActionsByContainer['images-waiting-modal-container'].splice(
                context.runningActionsByContainer['images-waiting-modal-container'].indexOf(promise), 1
            );
            if (result.event) {
                context.events[result.event](context, result.data);
            }
        });
    };
};
