/*jslint node: true, nomen: true */
"use strict";

exports.createRepositories = function (options) {
    var repositories = {}
    repositories['general_account'] = require('./general/account/account_repo.js').createRepository(options);
    repositories['master_campaigns'] = require('./master/campaigns/campaigns_repo.js').createRepository(options);
    repositories['master_images'] = require('./master/images/images_repo.js').createRepository(options);
    repositories['master_statistics'] = require('./master/statistics/statistics_repo.js').createRepository(options);
    repositories['master_workers'] = require('./master/workers/workers_repo.js').createRepository(options);
    repositories['worker_tasks'] = require('./worker/tasks/tasks_repo.js').createRepository(options);
    return repositories;
};
