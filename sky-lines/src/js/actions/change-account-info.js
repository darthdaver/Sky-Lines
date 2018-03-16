/*jslint node: true, nomen: true */
"use strict";

var Promise = require('bluebird');

function Action(options) {

  this.repo_general_account = options.repositories.general_account;
}
Action.prototype.run = function (parameters, solve) {

  var self = this;

  var data = {}

  data.fullname = parameters['fullname'];
  data.password = parameters['password'];

  var data_json = ko.toJSON(data);

  this.repo_general_account.change(data_json).then(function(result){

    $.notify({message: 'Very well ' + parameters['username'] + '! ' + 'Your account has been correctly modified.'},
        {allow_dismiss: true, type: 'success'});

    var data = {
      'fullname' : parameters['fullname'],
      'password' : parameters['password'],
    }

    self.repo_general_account.i_a_update(data);

    if(localStorage.getItem('type_of_account') == 'master'){

      solve({
          event: 'change-info-ok',
          data: {
            username : localStorage.getItem('username')
          }
      })
    }

    else{

      solve({
          event: 'change-info-ok-worker',
          data: {
            username : localStorage.getItem('username')
          }
      })
    }
  }, function(err){

    $.notify({message: 'Ops.. Something goes wrong. Try again.'},
        {allow_dismiss: true, type: 'danger'});

    var err_json = err.error;

    if(localStorage.getItem('type_of_account') == 'master'){

      solve({
          event: 'change-info-ko',
          data: {
              'fullname_err_msg': err_json['fullname'],
              'fullname_old': parameters['fullname'],
              'password_old': parameters['password'],
              'password_err_msg': err_json['password'],
          }
      });
    }

    else{

      solve({
          event: 'change-info-ko-worker',
          data: {
              'fullname_err_msg': err_json['fullname'],
              'fullname_old': parameters['fullname'],
              'password_old': parameters['password'],
              'password_err_msg': err_json['password'],
          }
      });
    }
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
