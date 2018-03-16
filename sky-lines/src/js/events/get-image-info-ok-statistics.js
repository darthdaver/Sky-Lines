/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        if (!context.vms['master']) {
            context.top.active('master');
            context.vms['master'].init({mask: 'modal-images-list'});
        }

        data = data || {};
        var packet = {
            'image_url' : data['url']
        };

        console.log('entroooooo_2');

        context.vms['images-statistics-list'].init({input : packet});
    };
};
