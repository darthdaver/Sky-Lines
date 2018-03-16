/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        if (!context.vms['master']) {
            context.top.active('master');
            context.vms['master'].init({mask: 'images-statistics-list'});
        }

        data = data || {};
        var packet = {
            'res' : data['res'],
            'statistics_url' : data['statistics_url']
        };

        console.log('entroooooo_2');

        context.vms['images-statistics-list'].init({input : packet});
    };
};
