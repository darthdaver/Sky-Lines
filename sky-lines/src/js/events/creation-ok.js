/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context) {
        if (!context.vms['master']) {
            context.top.active('master');
            context.vms['master'].init({mask: 'master-box'});
        }
        if (!context.vms['master-edit-campaigns-container']) {
          if (!context.vms['master-create-campaign-container']) {
              context.vms['master-box'].active('master-create-campaign-container');
              context.vms['master-create-campaign-container'].init({mask: 'master-create-campaign-form'});
          }
        }
        context.vms['master-create-campaign-container'].init();
    };
};
