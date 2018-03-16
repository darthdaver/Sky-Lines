/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context) {
        if (!context.vms['master']) {
            context.top.active('master');
            context.vms['master'].init({mask: 'images-statistics-list'});
        }
        context.vms['images-statistics-list'].init();
    };
};
