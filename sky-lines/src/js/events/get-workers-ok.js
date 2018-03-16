/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context) {
        if (!context.vms['master']) {
            context.top.active('master');
            context.vms['master'].init({mask: 'modal-worker-list'});
        }

        context.vms['modal-worker-list'].init();
    };
};
