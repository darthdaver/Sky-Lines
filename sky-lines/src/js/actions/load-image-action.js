/*jslint node: true, nomen: true */
"use strict";

var Promise = require('bluebird');

function Action(options) {

  this.repo_master_images = options.repositories.master_images;
}
Action.prototype.run = function (parameters, solve) {

  var data = {};

  data.images_campaign_url = parameters['images_url'];
  data.files = parameters['files'];

  var self = this;

  this.repo_master_images.load_images_campaign(data).then(function(result){

    set_new_images_flag(parameters['images_url'],true);

    $.notify({message: 'Congraturation! New images have been upload.'}, {allow_dismiss: true, type: 'success'});
    solve({
        event: 'image-load-result',
        data : {

          images_url : parameters['images_url']
        }
    });
  }, function(err){

    console.log(err);
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
