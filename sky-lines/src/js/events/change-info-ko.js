/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        if (!context.vms['master']) {
            context.top.active('master');
            context.vms['master'].init({mask: 'master-box'});
        }
        if (!context.vms['master-edit-account']) {
            context.vms['master-box'].active('master-edit-account');
            context.vms['master-edit-account'].init({mask: 'edit-account-form'});
        }
        data = data || {};
        var packet = {
            'fullname-error' : data['fullname_err_msg']
            ,'fullname' : data['fullname_old']
            ,'password' : data['password_old']
            ,'password-error' : data['password_err_msg']
        };
        context.vms['edit-account-form'].init({input: packet});
    };
};
