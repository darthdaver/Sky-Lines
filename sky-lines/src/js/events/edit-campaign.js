/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {

        data = data || {};
        var packet = {
            'campaign_url' : data['id'],
        };

        if (!context.vms['master']) {
            context.top.active('master');
            context.vms['master'].init({mask: 'edit-campaign-modal'});
        }
        context.vms['edit-campaign-modal'].init({filters: packet});
    };
};
