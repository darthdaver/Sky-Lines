/*jslint node: true, nomen: true */
"use strict";

var Promise = require('bluebird');

function Action(options) {

  this.repo_master_images = options.repositories.master_images;
}
Action.prototype.run = function (parameters, solve) {

    var self = this;

    this.repo_master_images.read_stat(parameters['statistics_url']).then(function (result){


          solve({

                event: 'read-statistics-ok',

                data: {

                  res : result,

                  statistics_url : parameters['statistics_url'],
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
