/*jslint node: true, nomen: true */
"use strict";

var Promise = require('bluebird');

function Action(options) {

  this.repo_general_account = options.repositories.general_account;
}
Action.prototype.run = function (parameters, solve) {

    var data = {};

    var self = this;

    data.fullname = parameters['fullname'];
    data.username = parameters['username'];
    data.password = parameters['password'];
    data.type = parameters['type'];

    var data_json = ko.toJSON(data);

    this.repo_general_account.user_registration(data_json).then(function(result){
      $.notify({message: 'Hi ' + parameters['username'] + '! ' + 'Your account has been correctly registered.'},
          {allow_dismiss: true, type: 'success'});

      localStorage.setItem('new_registration', true);

      solve({
          event: 'registration-ok'
      })
    }, function(err){

      var err_json = err.error;

      $.notify({message: 'Ops.. Something goes wrong. Try again.'},
          {allow_dismiss: true, type: 'danger'});

      solve({
          event: 'registration-ko',
          data: {
              'full_err_msg': err_json['fullname'],
              'fullname_old': parameters['fullname'],
              //'password-old': undefined,
              'password_old': parameters['password'],
              'pwd_err_msg': err_json['password'],
              'type_err_msg': err_json['type'],
              'type_old': parameters['type'],
              'user_err_msg': err_json['username'],
              'username_old': parameters['username'],
          }
      });
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
