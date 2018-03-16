/*jslint node: true, nomen: true */
"use strict";

var Promise = require('bluebird'),
    DataStore = require('nedb'),
    $ = require('jquery');

var user;

function Repository(server) {
    if (!(this instanceof Repository)) {
        return new Repository(server);
    }

    this._server = server || '';

    this.db_campaigns_general = Promise.promisifyAll(new DataStore({
        filename: 'campaigns_general',
        inMemoryOnly: true
    }));

    this.db_campaigns_details = Promise.promisifyAll(new DataStore({
        filename: 'campaigns_details',
        inMemoryOnly: true
    }));
}


/*@@@@@@@@@@ CAMPAIGNS GENERAL @@@@@@@@@@*/

Repository.prototype.all_campaigns = function (token) {
    var self = this;
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "http://awt.ifmledit.org/api/campaign",
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

Repository.prototype.c_g_insert = function (data) {

  this.db_campaigns_general.insert(data, function(err, doc) {

    user = doc;
  });
};

Repository.prototype.c_g_update = function (data) {

  this.db_campaigns_general.update({ id: data['id'] }, { $set: { name: data['name'] } }, {}, function (err, doc) {
  });
  this.db_campaigns_general.update({ id: data['id'] }, { $set: { status: data['status'] } }, {}, function (err, doc) {
  });
}

Repository.prototype.c_g_update_status = function (data) {

  this.db_campaigns_general.update({ id: data['url'] }, { $set: { status: data['status'] } }, {}, function (err, doc) {
  });
}

Repository.prototype.c_g_find = function (state) {

  var self = this;

  return new Promise(function (solve,reject, onCancel){

    var info;

    self.db_campaigns_general.find({ status: state }, function(err, doc) {

      console.log("doc", doc);

      solve(doc);
    });
  });
};

Repository.prototype.c_g_find_all = function () {

  var self = this;

  return new Promise(function (solve,reject, onCancel){

    var info;

    self.db_campaigns_general.find({}, function(err, docs) {

      solve(docs);
    });
  });
};

Repository.prototype.c_g_remove_all = function () {

  this.db_campaigns_general.remove({}, { multi: true }, function (err, numRemoved) {

  });
}


/*@@@@@@@@@@ CREATE CAMPAIGN @@@@@@@@@@*/

Repository.prototype.create = function (campaign) {
    var self = this;
    return new Promise(function (resolve, reject) {

        $.ajax({
            url: "http://awt.ifmledit.org/api/campaign",
            data: campaign,
            method: "POST",
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


/*@@@@@@@@@@ EDIT CAMPAIGN @@@@@@@@@@*/

Repository.prototype.edit_campaign = function (campaign) {
    var self = this;
    return new Promise(function (resolve, reject) {

        $.ajax({
            url: "http://awt.ifmledit.org" + campaign['url'],
            data: campaign['content'],
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


/*@@@@@@@@@@ SELECTED CAMPAIGN DETAILS @@@@@@@@@@*/

Repository.prototype.campaign_info = function (data) {
    var self = this;

    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "http://awt.ifmledit.org" + data['url'],
            data: undefined,
            method: "GET",
            crossDomain: true,
            contentType: "application/json; charset=UTF-8",
            beforeSend: function(xhr){xhr.setRequestHeader('Authorization', "APIToken " + data['token']);},
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

Repository.prototype.c_d_insert = function (data) {

  this.db_campaigns_details.insert(data, function(err, doc) {});
};

Repository.prototype.c_d_update = function (data) {

  this.db_campaigns_details.update({ id: data['id'] }, { $set: { annotation_replica: data['annotation_replica'] } }, {}, function (err, doc) {
  });
  this.db_campaigns_details.update({ id: data['id'] }, { $set: { annotation_size: data['annotation_size'] } }, {}, function (err, doc) {
  });
  this.db_campaigns_details.update({ id: data['id'] }, { $set: { selection_replica: data['selection_replica'] } }, {}, function (err, doc) {
  });
  this.db_campaigns_details.update({ id: data['id'] }, { $set: { threshold: data['threshold'] } }, {}, function (err, doc) {
  });
  this.db_campaigns_details.update({ id: data['id'] }, { $set: { name: data['name'] } }, {}, function (err, doc) {
  });
}

Repository.prototype.c_d_update_status = function (data) {

  this.db_campaigns_details.update({ id: data['url'] }, { $set: { status: data['status'] } }, {}, function (err, doc) {
  });
}

Repository.prototype.c_d_findById = function (url) {

  var self = this;

  return new Promise(function (solve,reject, onCancel){

    self.db_campaigns_details.findOne({ id : url}, function(err, doc) {

      console.log('doc',doc);

      solve(doc);
    });
  });
};

Repository.prototype.c_d_remove_all = function () {

  this.db_campaigns_details.remove({}, { multi: true }, function (err, numRemoved) {

  });
}


/*@@@@@@@@@@ START CAMPAIGN @@@@@@@@@@*/

Repository.prototype.start_campaign = function (data) {
    var self = this;

    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "http://awt.ifmledit.org" + data['execution_url'],
            data: undefined,
            method: "POST",
            crossDomain: true,
            contentType: "application/json; charset=UTF-8",
            beforeSend: function(xhr){xhr.setRequestHeader('Authorization', "APIToken " + localStorage.getItem('token'));},
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


/*@@@@@@@@@@ TERMINATE CAMPAIGN @@@@@@@@@@*/

Repository.prototype.terminate_campaign = function (data) {
    var self = this;

    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "http://awt.ifmledit.org" + data['execution_url'],
            data: undefined,
            method: "DELETE",
            crossDomain: true,
            contentType: "application/json; charset=UTF-8",
            beforeSend: function(xhr){xhr.setRequestHeader('Authorization', "APIToken " + localStorage.getItem('token'));},
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


/*@@@@@@@@@@ EXPORTS @@@@@@@@@@*/

exports.Repository = Repository;
exports.createRepository = Repository;
