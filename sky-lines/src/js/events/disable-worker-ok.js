/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        if (!context.vms['master']) {
            context.top.active('master');
            context.vms['master'].init({mask: 'manage-workers-modal'});
        }

        data = data || {};

        var packet = {
            'worker_url' : data['worker_url']
        };

        context.vms['manage-workers-modal'].init({input : packet});
    };
};
