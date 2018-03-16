/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        if (!context.vms['worker-container']) {
            context.top.active('worker-container');
            context.vms['worker-container'].init({mask: 'worker-box'});
        }
        if (!context.vms['worker-basic-information-container']) {
            context.vms['worker-box'].active('worker-basic-information-container');
            context.vms['worker-basic-information-container'].init({mask: 'worker-basic-information-details'});
        }

        data = data || {};
        var packet = {
            'fullname' : data['fullname']
            ,'username' : data['username']
            ,'password' : data['password']
            ,'type' : data['type']
        };

        no_background();

        context.vms['worker-basic-information-details'].init({input : packet});
    };
};
