/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context) {
        if (!context.vms['master']) {
            context.top.active('master');
            context.vms['master'].init({mask: 'master-box'});
        }
        if (!context.vms['master-edit-campaigns-container']) {
            context.vms['master-box'].active('master-edit-campaigns-container');
        }
        context.vms['master-edit-campaigns-container'].init();
    };
};
