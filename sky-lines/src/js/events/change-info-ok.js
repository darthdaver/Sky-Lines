/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context,data) {
        if (!context.vms['master']) {
            context.top.active('master');
            context.vms['master'].init({mask: 'master-box'});
        }
        if (!context.vms['master-edit-account']) {
            context.vms['master-box'].active('master-edit-account');
            context.vms['master-edit-account'].init({mask: 'account-info-details'});
        }

        data = data || {};

        var packet = {
            'username' : data['username']
        };

        context.vms['account-info-details'].init({input : packet});

        context.vms['edit-account-form'].init();
    };
};
