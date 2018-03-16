/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        if (!context.vms['master']) {
            context.top.active('master');
            context.vms['master'].init({mask: 'modal-worker-list'});
        }

        data = data || {};
        var packet = {
            'worker_url' : data['url']
        };

        context.vms['modal-worker-list'].init({input : packet});
    };
};
