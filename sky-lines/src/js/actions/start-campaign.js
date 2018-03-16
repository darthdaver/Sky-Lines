/*jslint node: true, nomen: true */
"use strict";

var Promise = require('bluebird');

function Action(options) {

  this.repo_master_campaigns = options.repositories.master_campaigns;
}
Action.prototype.run = function (parameters, solve) {

    var data = {};

    var self = this;

    data.execution_url = parameters['execution_url'];

    this.repo_master_campaigns.start_campaign(data).then(function(result){

      var info = {

        'url' : parameters['campaign_url'],
        'status' : "started"
      }

      self.repo_master_campaigns.c_g_update_status(info);
      self.repo_master_campaigns.c_d_update_status(info);

      $.notify({message: 'Campaign started.'}, {allow_dismiss: true, type: 'success'});

      solve({
        event: 'start-ok',
      });
    }, function(err){

        console.log('Fatal Error!');
    });
};

exports.createAction = function (options) {
    var action = new Action(options);
    return function (data) {
        return new Promise(function (solve, reject, onCancel) {
            var parameters = (data && data.filters) || {};
            action.run(parameters, solve, onCancel);
        });
    };
};
