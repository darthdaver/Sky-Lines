/*jslint node: true, nomen: true */
"use strict";

var Promise = require('bluebird');

function Action(options) {

  this.repo_master_campaigns = options.repositories.master_campaigns;
}
Action.prototype.run = function (parameters, solve) {

  var data = {};

  console.log('parameters', parameters);

  console.log('example', parameters['form']['name']);

  data.name = parameters['form']['name'];
  data.selection_replica = parseInt(parameters['form']['selection_replica']);
  data.threshold = parseInt(parameters['form']['threshold']);
  data.annotation_replica = parseInt(parameters['form']['annotation_replica']);
  data.annotation_size = parseInt(parameters['form']['annotation_size']);

  var data_json = ko.toJSON(data);

  var packet = {

    'url' : parameters['campaign_url'],
    'content' : data_json
  }

  console.log('packet', packet);

  var self = this;

  this.repo_master_campaigns.edit_campaign(packet).then(function(result){

    var update_c_g = {

      'id' : parameters['campaign_url'],
      'name' : parameters['form']['name'],
      'status' : 'ready'
    }

    data.id = parameters['campaign_url'];

    self.repo_master_campaigns.c_g_update(update_c_g);
    self.repo_master_campaigns.c_d_update(data);

    close_modal();

    $.notify({message: 'Congraturation! The campaign has been updated.'}, {allow_dismiss: true, type: 'success'});
    solve({
        event: 'edit-campaign-ok'
    });
  }, function(err){

    var err_json = err.error;

    console.log(err);

    $.notify({message: 'Ops.. Something goes wrong. Try again.'},
        {allow_dismiss: true, type: 'danger'});

    solve({
        event: 'edit-campaign-ko',
        data: {
            'annotation_replica_err_msg': err_json['annotation_replica'],
            'annotation_replica_old': parameters['form']['annotation_replica'],
            'annotation_size_err_msg': err_json['annotation_size'],
            'annotation_size_old': parameters['form']['annotation_size'],
            'name_err_msg': err_json['name'],
            'name_old': parameters['form']['name'],
            'selection_replica_err_msg': err_json['selection_replica'],
            'selection_replica_old': parameters['form']['selection_replica'],
            'threshold_err_msg': err_json['threshold'],
            'threshold_old': parameters['form']['threshold'],
        }
    });
  });
}

exports.createAction = function (options) {
    var action = new Action(options);
    return function (data) {
        return new Promise(function (solve, reject, onCancel) {
            var parameters = (data && data.filters) || {};
            action.run(parameters, solve, onCancel);
        });
    };
};
