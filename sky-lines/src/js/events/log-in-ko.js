/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        if (!context.vms['log-in']) {
            context.top.active('log-in');
            context.vms['log-in'].init({mask: 'xor-log-in'});
        }
        if (!context.vms['log-in-form-container']) {
            context.vms['xor-log-in'].active('log-in-form-container');
            context.vms['log-in-form-container'].init({mask: 'log-in-form'});
        }
        data = data || {};
        var packet = {
            'username' : data['username_old']
            ,'username-error' : data['user_err_msg']
            ,'password-error' : data['pwd_err_msg']
        };
        context.vms['log-in-form'].init({input: packet});
    };
};
