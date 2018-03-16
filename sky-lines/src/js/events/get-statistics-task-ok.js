/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {

        data = data || {};

        var packet = {
          'statistics_url' : data['statistics_url'],
          'refresh' : data['refresh']
        };

        if (!context.vms['worker-container']) {
            context.top.active('worker-container');
            context.vms['worker-container'].init({mask: 'worker-box'});
        }
        if (!context.vms['worker-edit-tasks']) {

            context.vms['worker-box'].active('worker-edit-tasks');
            context.vms['worker-edit-tasks'].init({mask: 'worker-selected-statistics-task-details'});
        }
        context.vms['worker-selected-statistics-task-details'].init({input: packet});
    };
};
