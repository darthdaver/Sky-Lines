/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {

        var data = data || {};

        var packet = {
          'info' : data['info'],
          'campaign_images_url' : data['campaign_images_url']
        };

        if (!context.vms['master']) {
            context.top.active('master');
            context.vms['master'].init({mask: 'statistics-modal'});
        }
        context.vms['statistics-modal'].init({input : packet});
    };
};
