/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {

        remove_overflow();

        if (!context.vms['log-in']) {
            context.top.active('log-in');
            context.vms['log-in'].init({mask: 'xor-log-in'});
        }
        if (!context.vms['welcome-to-user']) {
            context.vms['xor-log-in'].active('welcome-to-user');
        }

        data = data || {};
        var packet = {
            'username' : data['username_old']
        };

        context.vms['welcome-to-user'].init({input : packet});
    };
};
