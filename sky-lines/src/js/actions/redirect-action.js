/*jslint node: true, nomen: true */
"use strict";

var Promise = require('bluebird');

function Action(options) {

  this.repo_general_account = options.repositories.general_account;
}
Action.prototype.run = function (parameters, solve) {

    var self = this;

    this.repo_general_account.user_redirection(localStorage.getItem('token')).then(function(result){

      $.notify({message: 'Redirection. Please wait.'}, {allow_dismiss: true, type: 'success'});

      var data = {
        'fullname' : result['fullname'],
        'username' : result['username'],
        'password' : localStorage.getItem('pwd'),
        'type' : result['type']
      }

      self.repo_general_account.i_a_insert(data);

      if(result['type'] == 'master'){

        store_type_of_account('master');

        solve({
          event: 'log-in-master',

          data: data
        });
      }

      else {

        store_type_of_account('worker');

        solve({
          event: 'log-in-worker',

          data: data
        });
      }
    }, function(err){

    console.log("Fatal error!");
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
