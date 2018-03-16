/*jslint node: true, nomen: true */
"use strict";

var Promise = require('bluebird');

function Action(options) {

  this.repo_master_campaigns = options.repositories.master_campaigns;
}
Action.prototype.run = function (parameters, solve) {

    var self = this;

    this.repo_master_campaigns.c_d_findById(parameters['campaign_url']).then(function (item){

      //if the information about the campaign is not in the repository
      //execute a server call, otherwise not.
      if($.isEmptyObject(item)){

        console.log("chiamata get campaign details");

        var data = {

          token : localStorage.getItem('token'),
          url : parameters['campaign_url']
        }

        self.repo_master_campaigns.campaign_info(data).then(function(result){

            self.repo_master_campaigns.c_d_insert(result);

            if(parameters['status'] == 'ready'){

              solve({

                  event: 'master-waiting-campaigns-get-info-ok',

                  data: {

                    url : parameters['campaign_url'],
                  }
              });
            }

            else if(parameters['status'] == 'started'){

              solve({

                  event: 'master-running-campaigns-get-info-ok',

                  data: {

                    url : parameters['campaign_url'],
                  }
              });
            }

            else if(parameters['status'] == 'ended'){

              solve({

                  event: 'master-ended-campaigns-get-info-ok',

                  data: {

                    url : parameters['campaign_url'],
                  }
              });
            }
        });
      }

      else{

        console.log("repo get campaign details");

        if(parameters['status'] == 'ready'){

          solve({

                event: 'master-waiting-campaigns-get-info-ok',

                data: {

                  url : parameters['campaign_url'],
                }
            });
        }

        else if(parameters['status'] == 'started'){

          solve({

                event: 'master-running-campaigns-get-info-ok',

                data: {

                  url : parameters['campaign_url'],
                }
            });
        }

        else if(parameters['status'] == 'ended'){

          solve({

                event: 'master-ended-campaigns-get-info-ok',

                data: {

                  url : parameters['campaign_url'],
                }
            });
        }
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
