/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {

        var data = data || {};

        if(data['action'] == 'nothing'){

          var packet = {
              'session_url' : data['info']['session_url'],
              'image' : data['info']['image'],
              'type' : data['info']['type'],
              'statistics_url' : data['statistics_url'],
              'refresh' : 'refresh',
              'action' : data['action']
          };

          if(data['info']['type'] == 'annotation'){

            packet.size = data['info']['size'];

            console.log('packet_size', packet);
          }
        }

        else if(data['action'] == 'clear' || data['action'] == 'no annotation'){

          var packet = {
              'session_url' : data['info']['session_url'],
              'image' : data['info']['image'],
              'type' : data['info']['type'],
              'statistics_url' : data['statistics_url'],
              'refresh' : 'not refresh',
              'action' : data['action']
          };
        }

        else if(data['action'] == 'annotation'){

          var packet = {
            'session_url' : data['info']['session_url'],
            'image' : data['info']['image'],
            'type' : data['info']['type'],
            'statistics_url' : data['statistics_url'],
            'refresh' : 'refresh',
            'action' : 'clear'
          };
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
