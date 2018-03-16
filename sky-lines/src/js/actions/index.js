/*jslint node: true, nomen: true */
"use strict";

exports.createActions = function (options) {
    return {
        'change-account-info': require('./change-account-info').createAction(options)
        ,'create-campaign-action': require('./create-campaign-action').createAction(options)
        ,'disable-worker': require('./disable-worker').createAction(options)
        ,'enable-worker': require('./enable-worker').createAction(options)
        ,'get-campaigns-action': require('./get-campaigns-action').createAction(options)
        ,'get-images': require('./get-images').createAction(options)
        ,'get-statistics': require('./get-statistics').createAction(options)
        ,'get-workers': require('./get-workers').createAction(options)
        ,'load-image-action': require('./load-image-action').createAction(options)
        ,'log-in-action': require('./log-in-action').createAction(options)
        ,'log-out-action': require('./log-out-action').createAction(options)
        ,'master-get-image-info': require('./master-get-image-info').createAction(options)
        ,'master-get-information-campaign': require('./master-get-information-campaign').createAction(options)
        ,'master-get-worker-info': require('./master-get-worker-info').createAction(options)
        ,'redirect-action': require('./redirect-action').createAction(options)
        ,'start-campaign': require('./start-campaign').createAction(options)
        ,'terminate-campaign': require('./terminate-campaign').createAction(options)
        ,'edit-campaign-action': require('./edit-campaign-action').createAction(options)
        ,'get-image-statistics': require('./get-image-statistics').createAction(options)
        ,'registration-action': require('./registration-action').createAction(options)
        ,'start-task': require('./start-task').createAction(options)
        ,'response': require('./response').createAction(options)
        ,'response-start': require('./response-start').createAction(options)
        ,'get-tasks': require('./get-tasks').createAction(options)
        ,'worker-get-information-task': require('./worker-get-information-task').createAction(options)
        ,'get-task-info': require('./get-task-info').createAction(options)
        ,'get-statistics-task': require('./get-statistics-task').createAction(options)
        ,'read-statistics-action': require('./read-statistics-action').createAction(options)
    };
};
