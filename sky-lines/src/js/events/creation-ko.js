/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        if (!context.vms['master']) {
            context.top.active('master');
            context.vms['master'].init({mask: 'master-box'});
        }
        if (!context.vms['master-create-campaign-container']) {
            context.vms['master-box'].active('master-create-campaign-container');
            context.vms['master-create-campaign-container'].init({mask: 'master-create-campaign-form'});
        }
        data = data || {};
        var packet = {
            'annotation_replica-error' : data['annotation_replica_err_msg']
            ,'annotation_replica' : data['annotation_replica_old']
            ,'annotation_size' : data['annotation_size_old']
            ,'annotation_size-error' : data['annotation_size_err_msg']
            ,'name' : data['name_old']
            ,'name-error' : data['name_err_msg']
            ,'selection_replica' : data['selection_replica_old']
            ,'selection_replica-error' : data['selection_replica_err_msg']
            ,'threshold' : data['threshold_old']
            ,'threshold-error' : data['threshold_err_msg']
        };
        context.vms['master-create-campaign-form'].init({input: packet});
    };
};
