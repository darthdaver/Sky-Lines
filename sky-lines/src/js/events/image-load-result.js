/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        if (!context.vms['master']) {
            context.top.active('master');
            context.vms['master'].init({mask: 'images-waiting-modal-container'});
        }

        data = data || {};
        var packet = {

            'url' : data['images_url'],
            'load' : true
        };

        context.vms['images-waiting-modal-container'].init({input : packet});
    };
};
