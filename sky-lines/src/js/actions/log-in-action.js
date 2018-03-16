/*jslint node: true, nomen: true */
"use strict";

var Promise = require('bluebird');

function Action(options) {

  this.repo_general_account = options.repositories.general_account;
}
Action.prototype.run = function (parameters, solve) {

  var data = {};

  data.username = parameters['username'];
  data.password = parameters['password'];

  if(!(data.username == undefined)){

    if(data.username.length == 0){

      data.username = undefined;
    }
  }

  var data_json = ko.toJSON(data);

  this.repo_general_account.user_log_in(data_json).then(function(result){
    $.notify({message: "Hi " + parameters['username'] + "! It's a pleasure to see you again!"},
        {allow_dismiss: true, type: 'success'});

    console.log('log in token', result.token);

    fade_out();
    store_token(result.token);
    store_username(parameters['username']);
    store_pwd(parameters["password"]);

    solve({
        event: 'log-in-ok',

        data: {
            'username_old': parameters['username'],
        }
    });

  }, function(err){

    var err_json = err.error;

    if(typeof(err_json) === 'string'){
      $.notify({message: err_json},
          {allow_dismiss: true, type: 'danger'});
    }

    else{

      $.notify({message: "Ops.. Something goes wrong. Try again."},
          {allow_dismiss: true, type: 'danger'});
    }

    solve({
        event: 'log-in-ko',
        data: {
            'password_old': undefined,
            'pwd_err_msg': err_json['password'],
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
