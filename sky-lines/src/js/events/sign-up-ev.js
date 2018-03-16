/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context) {

        remove_overflow();

        if (!context.vms['sign-up']) {
            context.top.active('sign-up');
        }
        context.vms['sign-up'].init();
    };
};
