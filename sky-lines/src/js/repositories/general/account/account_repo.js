/*jslint node: true, nomen: true */
"use strict";

var Promise = require('bluebird'),
    DataStore = require('nedb');

var user;

function Repository(server) {
    if (!(this instanceof Repository)) {
        return new Repository(server);
    }

    this._server = server || '';

    this.db_info_account = Promise.promisifyAll(new DataStore({
        filename: 'info_account',
        inMemoryOnly: true
    }));
}


/*@@@@@@@@@@ LOG IN @@@@@@@@@@*/

Repository.prototype.user_log_in = function (user) {
    var self = this;
    return new Promise(function (resolve, reject) {

        $.ajax({
            url: "http://awt.ifmledit.org/api/auth",
            data: user,
            method: "POST",
            crossDomain: true,
            contentType: "application/json; charset=UTF-8",
            beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'APIKey 6723a3e5-389e-4d12-ba44-bdbff02c8edb');},
            success: function(data) {/*console.log(data);*/},
            error: function(xhr, status, error) {}
        }).done(function (result) {
            //console.log(result);
            resolve(result);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            //console.log(jqXHR.responseJSON);
            var error = new Error(errorThrown);
            error.textStatus = textStatus;
            error.jqXHR = jqXHR;
            error.errors = jqXHR.responseJSON;
            reject(error.errors);
        });
    });
};

Repository.prototype.user_redirection = function (token) {
    var self = this;
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "http://awt.ifmledit.org/api/user/me",
            data: undefined,
            method: "GET",
            crossDomain: true,
            contentType: "application/json; charset=UTF-8",
            beforeSend: function(xhr){xhr.setRequestHeader('Authorization', "APIToken " + token);},
            success: function(data) {/*console.log(data);*/},
            error: function(xhr, status, error) {}
        }).done(function (result) {
            //console.log(result);
            resolve(result);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            //console.log(jqXHR.responseJSON);
            var error = new Error(errorThrown);
            error.textStatus = textStatus;
            error.jqXHR = jqXHR;
            error.errors = jqXHR.responseJSON;
            reject(error.errors);
        });
    });
};


/*@@@@@@@@@@ USER REGISTRATION @@@@@@@@@@*/

Repository.prototype.user_registration = function (user) {
    var self = this;
    return new Promise(function (resolve, reject) {

        $.ajax({
            url: "http://awt.ifmledit.org/api/user",
            data: user,
            method: "POST",
            crossDomain: true,
            contentType: "application/json; charset=UTF-8",
            beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'APIKey 6723a3e5-389e-4d12-ba44-bdbff02c8edb');},
            success: function(data) {/*console.log(data);*/},
            error: function(xhr, status, error) {}
        }).done(function (result) {
            //console.log(result);
            resolve(result.result);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            //console.log(jqXHR.responseJSON);
            var error = new Error(errorThrown);
            error.textStatus = textStatus;
            error.jqXHR = jqXHR;
            error.errors = jqXHR.responseJSON;
            reject(error.errors);
        });
    });
};


/*@@@@@@@@@@ LOG OUT @@@@@@@@@@*/

Repository.prototype.user_log_out = function (token) {
    var self = this;
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "http://awt.ifmledit.org/api/auth",
            data: undefined,
            method: "DELETE",
            crossDomain: true,
            contentType: "application/json; charset=UTF-8",
            beforeSend: function(xhr){xhr.setRequestHeader('Authorization', "APIToken " + token);},
            success: function(data) {/*console.log(data);*/},
            error: function(xhr, status, error) {}
        }).done(function (result) {
            //console.log(result);
            resolve(result);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            //console.log(jqXHR.responseJSON);
            var error = new Error(errorThrown);
            error.textStatus = textStatus;
            error.jqXHR = jqXHR;
            error.errors = jqXHR.responseJSON;
            reject(error.errors);
        });
    });
};

/*@@@@@@@@@@ INFORMATION ACCOUNT @@@@@@@@@@*/

Repository.prototype.change = function (info) {
    var self = this;
    return new Promise(function (resolve, reject) {

        $.ajax({
            url: "http://awt.ifmledit.org/api/user/me",
            data: info,
            method: "PUT",
            crossDomain: true,
            contentType: "application/json; charset=UTF-8",
            beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'APIToken ' + localStorage.getItem('token'));},
            success: function(data) {/*console.log(data);*/},
            error: function(xhr, status, error) {}
        }).done(function (result) {
            //console.log(result);
            resolve(result.result);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            //console.log(jqXHR.responseJSON);
            var error = new Error(errorThrown);
            error.textStatus = textStatus;
            error.jqXHR = jqXHR;
            error.errors = jqXHR.responseJSON;
            reject(error.errors);
        });
    });
};

Repository.prototype.i_a_insert = function (data) {

  this.db_info_account.insert(data, function(err, doc) {

    user = doc;
  });
};

Repository.prototype.i_a_update = function (data) {

  this.db_info_account.update({ username: user.username }, { username: user.username, fullname: data.fullname,
    password: data.password, type: user.type}, {}, function (err, numReplaced) {
    });
};

Repository.prototype.i_a_findById = function (id) {

  var self = this;

  return new Promise(function (solve,reject, onCancel){

    var info;

    self.db_info_account.findOne({ username: id }, function(err, doc) {

      solve(doc);
    });
  });
};

Repository.prototype.i_a_remove_all = function () {

  this.db_info_account.remove({}, { multi: true }, function (err, numRemoved) {

  });
}


/*@@@@@@@@@@ EXPORTS @@@@@@@@@@*/

exports.Repository = Repository;
exports.createRepository = Repository;
