/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context) {

        log_in_clicked();

        if (!context.vms['log-in']) {
            context.top.active('log-in');
        }
        context.vms['log-in'].init();
    };
};
