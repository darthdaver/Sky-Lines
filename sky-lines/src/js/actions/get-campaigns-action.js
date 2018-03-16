/*jslint node: true, nomen: true */
"use strict";

var Promise = require('bluebird');

//if is the first time to be called, the action execute a server call to
//obtain the list of the campaigns and save it on the corresponding repository
//the next calls are managed without server calls

function Action(options) {

  this.repo_master_campaigns = options.repositories.master_campaigns;

}
Action.prototype.run = function (parameters, solve) {

    var self = this;

    get_campaigns_flag().then(function(flag){

      if(!flag){

        console.log("chiamata get campaigns");

        set_campaigns_flag(true);

        self.repo_master_campaigns.c_g_remove_all();

        self.repo_master_campaigns.all_campaigns(localStorage.getItem('token')).then(function(result){

          self.repo_master_campaigns.c_g_insert(result['campaigns']);

          solve({
                event: 'load-campaigns',
              });
          }, function(err){

            console.log("Fatal error!");
        });
      }

      else {

        console.log("repo get campaigns");

        solve({
            event: 'load-campaigns',
        });
      }
    });
};

exports.createAction = function (options) {

    if (typeof(Storage) !== "undefined") {
        // Store
        localStorage.setItem('campaigns_flag', false);
    }

    var action = new Action(options);
    return function (data) {
        return new Promise(function (solve, reject, onCancel) {
            var parameters = (data && data.filters) || {};
            action.run(parameters, solve, onCancel);
        });
    };
};
