/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        if (!context.vms['master']) {
            context.top.active('master');
            context.vms['master'].init({mask: 'modal-images-list'});
        }

        console.log('Data', data);

        data = data || {};
        var packet = {
            'canonical' : data['url']
        };

        context.vms['modal-images-list'].init({input : packet});
    };
};
