/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        data = data || {};
        var packet = {
            'fullname' : data['Fullname']
            ,'password' : data['Password']
            ,'username' : data['Username']
            ,'type' : data['Type of account']
        };
        var promise = context.actions['registration-action']({filters: packet});
        context.runningActionsByContainer['sign-up'].push(promise);
        promise.then(function (result) {
            context.runningActionsByContainer['sign-up'].splice(
                context.runningActionsByContainer['sign-up'].indexOf(promise), 1
            );
            if (result.event) {
                context.events[result.event](context, result.data);
            }
        });
    };
};
