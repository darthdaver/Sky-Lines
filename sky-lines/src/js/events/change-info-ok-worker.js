/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context,data) {
        if (!context.vms['worker-container']) {
            context.top.active('worker-container');
            context.vms['worker-container'].init({mask: 'worker-box'});
        }
        if (!context.vms['worker-edit-account']) {
            context.vms['worker-box'].active('worker-edit-account');
            context.vms['worker-edit-account'].init({mask: 'account-info-details-worker'});
        }

        data = data || {};

        var packet = {
            'username' : data['username']
        };

        context.vms['account-info-details-worker'].init({input : packet});

        context.vms['worker-account-form'].init();
    };
};
