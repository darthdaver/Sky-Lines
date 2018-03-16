/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        if (!context.vms['sign-up']) {
            context.top.active('sign-up');
            context.vms['sign-up'].init({mask: 'sign-up-form'});
        }
        data = data || {};
        var packet = {
            'Fullname' : data['fullname_old']
            ,'Fullname-error' : data['full_err_msg']
            ,'Password' : data['password_old']
            ,'Password-error' : data['pwd_err_msg']
            ,'Type of account' : data['type_old']
            ,'Type of account-error' : data['type_err_msg']
            ,'Username' : data['username_old']
            ,'Username-error' : data['user_err_msg']
        };
        context.vms['sign-up-form'].init({input: packet});
    };
};
