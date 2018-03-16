/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {

        if (!context.vms['master']) {
            context.top.active('master');
            context.vms['master'].init({mask: 'master-box'});
        }
        if (!context.vms['master-basic-information-container']) {
            context.vms['master-box'].active('master-basic-information-container');
            context.vms['master-basic-information-container'].init({mask: 'master-basic-information-details'});
        }

        data = data || {};
        var packet = {
            'fullname' : data['fullname']
            ,'username' : data['username']
            ,'password' : data['password']
            ,'type' : data['type']
        };

        no_background();

        context.vms['master-basic-information-details'].init({input : packet});
    };
};
