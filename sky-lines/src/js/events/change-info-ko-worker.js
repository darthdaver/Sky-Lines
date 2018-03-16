/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        if (!context.vms['worker-container']) {
            context.top.active('worker-container');
            context.vms['worker-container'].init({mask: 'worker-box'});
        }
        if (!context.vms['worker-edit-account']) {
            context.vms['worker-box'].active('worker-edit-account');
            context.vms['worker-edit-account'].init({mask: 'worker-account-form'});
        }
        data = data || {};
        var packet = {
            'fullname-error' : data['fullname_err_msg']
            ,'fullname' : data['fullname_old']
            ,'password' : data['password_old']
            ,'password-error' : data['password_err_msg']
        };
        context.vms['worker-account-form'].init({input: packet});
    };
};
