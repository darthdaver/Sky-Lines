/*jslint node: true, nomen: true */
"use strict";

var Promise = require('bluebird');

function Action(options) {

  this.repo_master_campaigns = options.repositories.master_campaigns;
}
Action.prototype.run = function (parameters, solve) {

  var data = {};

  data.name = parameters['name'];
  data.selection_replica = parseInt(parameters['selection_replica']);
  data.threshold = parseInt(parameters['threshold']);
  data.annotation_replica = parseInt(parameters['annotation_replica']);
  data.annotation_size = parseInt(parameters['annotation_size']);

  var data_json = ko.toJSON(data);

  var self = this;

  this.repo_master_campaigns.create(data_json).then(function(result){

    get_campaigns_flag().then(function(flag){

      if(flag){

        set_campaigns_flag(false);
      }
    });

    $.notify({message: 'Congraturation! A new campaign has been created.'}, {allow_dismiss: true, type: 'success'});
    solve({
        event: 'creation-ok'
    });
  }, function(err){

    var err_json = err.error;

    $.notify({message: 'Ops.. Something goes wrong. Try again.'},
        {allow_dismiss: true, type: 'danger'});

    solve({
        event: 'creation-ko',
        data: {
            'annotation_replica_err_msg': err_json['annotation_replica'],
            'annotation_replica_old': parameters['annotation_replica'],
            'annotation_size_err_msg': err_json['annotation_size'],
            'annotation_size_old': parameters['annotation_size'],
            'name_err_msg': err_json['name'],
            'name_old': parameters['name'],
            'selection_replica_err_msg': err_json['selection_replica'],
            'selection_replica_old': parameters['selection_replica'],
            'threshold_err_msg': err_json['threshold'],
            'threshold_old': parameters['threshold'],
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
