/*jslint node: true, nomen: true */
"use strict";

var Promise = require('bluebird');

var type_of_account;

function Action(options) {

  type_of_account = localStorage.getItem('type_of_account');

  this.repo_general_account = options.repositories.general_account;

  if(type_of_account == 'master'){

    this.repo_master_campaigns = options.repositories.master_campaigns;
    this.repo_master_images = options.repositories.master_images;
    this.repo_master_workers = options.repositories.master_workers;
  }

  else {

    this.repo_worker_tasks = options.repositories.worker_tasks;
  }

}
Action.prototype.run = function (parameters, solve) {

  set_campaigns_flag(false);

  if(type_of_account == "master"){
    this.repo_master_campaigns.c_g_find_all().then(function(result){

      result.forEach(function(campaign){

        var url = campaign['id'] + "/image";

        set_new_images_flag(url,false);

      });
    });

    remove_all_urls();

    this.repo_general_account.i_a_remove_all();
    this.repo_master_campaigns.c_d_remove_all();
    this.repo_master_campaigns.c_g_remove_all();
    this.repo_master_images.i_d_remove_all();
    this.repo_master_images.i_g_remove_all();
    this.repo_master_workers.w_d_remove_all();
    this.repo_master_workers.w_g_remove_all();
  }

  if(type_of_account == "worker"){

    remove_all_urls();

    this.repo_general_account.i_a_remove_all();
    this.repo_worker_tasks.t_d_remove_all();
    this.repo_worker_tasks.t_g_remove_all();
    this.repo_worker_tasks.t_s_remove_all();
  }

  this.repo_general_account.user_log_out(localStorage.getItem('token')).then(function(result){
    $.notify({message: "Thank you for coming back to visit us. See you soon."},
        {allow_dismiss: true, type: 'success'});

    solve({
        event: 'redirect-to-home',
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
