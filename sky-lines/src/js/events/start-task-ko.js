/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {

        var data = data || {};

        var packet = {
            'session_url' : data['session_url'],
            'type' : data['type'],
            'accepted' : data['accepted'],
            'annotated' : data['annotated'],
            'available' : data['available'],
            'rejected' : data['rejected']
        };

        if(data['type'] == 'annotation'){

          packet.size = data['size'];
        }

        if (!context.vms['worker-container']) {
            context.top.active('worker-container');
            context.vms['worker-container'].init({mask: 'worker-box'});
        }
        if (!context.vms['worker-edit-tasks']) {
            context.vms['worker-box'].active('worker-edit-tasks');
            context.vms['worker-edit-tasks'].init({mask: 'task-control-container'});
        }
        context.vms['task-control-container'].init({input : packet});
    };
};
