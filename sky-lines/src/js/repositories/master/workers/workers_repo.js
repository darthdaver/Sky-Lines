/*jslint node: true, nomen: true */
"use strict";

var Promise = require('bluebird'),
    DataStore = require('nedb');

function Repository(server) {
    if (!(this instanceof Repository)) {
        return new Repository(server);
    }

    this._server = server || '';

    this.db_workers_general = Promise.promisifyAll(new DataStore({
        filename: 'workers_general',
        inMemoryOnly: true
    }));

    this.db_workers_details = Promise.promisifyAll(new DataStore({
        filename: 'workers_details',
        inMemoryOnly: true
    }));
}


/*@@@@@@@@@@ WORKERS GENERAL @@@@@@@@@@*/

Repository.prototype.all_workers_campaign = function (url) {
    var self = this;

    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "http://awt.ifmledit.org" + url,
            data: undefined,
            method: "GET",
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

Repository.prototype.w_g_insert = function (data) {

  this.db_workers_general.insert(data, function(err, doc) {

  });
};

Repository.prototype.w_g_find = function (state) {

  var self = this;

  return new Promise(function (solve,reject, onCancel){

    var info;

    self.db_workers_general.find({ status: state }, function(err, doc) {

      solve(doc);
    });
  });
};

Repository.prototype.w_g_find_all = function (state) {

  var self = this;

  return new Promise(function (solve,reject, onCancel){

    var info;

    self.db_workers_general.find({}, function(err, doc) {

      solve(doc);
    });
  });
};

Repository.prototype.w_g_remove_all = function () {

  this.db_workers_general.remove({}, { multi: true }, function (err, numRemoved) {

  });
}


/*@@@@@@@@@@ SELECTED WORKER INFORMATION @@@@@@@@@@*/

Repository.prototype.worker_info = function (data) {
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

Repository.prototype.w_d_insert = function (data) {

  this.db_workers_details.insert(data, function(err, doc) {

  });
};

Repository.prototype.w_d_find = function (fields, project) {

    return this.db_workers_details.findAsync(fields, project);
};

Repository.prototype.w_d_findById = function (url) {

  var self = this;

  return new Promise(function (solve,reject, onCancel){

    self.db_workers_details.findOne({ id : url}, function(err, doc) {

      solve(doc);
    });
  });
};

Repository.prototype.w_d_remove_all = function () {

  this.db_workers_details.remove({}, { multi: true }, function (err, numRemoved) {

  });
}


/*@@@@@@@@@@ ENABLE-DISABLE WORKER @@@@@@@@@@*/

Repository.prototype.enable_worker = function (data) {
    var self = this;

    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "http://awt.ifmledit.org" + data['enable_url'],
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

Repository.prototype.disable_worker = function (data) {
    var self = this;

    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "http://awt.ifmledit.org" + data['disable_url'],
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

Repository.prototype.w_update = function (data) {

  if(data['type'] == 'enable'){

    if(data['action'] == 'annotation'){

      this.db_workers_general.update({ id: data['worker_url'] }, { $set: { annotator: true } }, {}, function (err, doc) {
      });

      this.db_workers_details.update({ id: data['worker_url'] }, { $set: { annotator: true } }, {}, function (err, doc) {
      });
    }

    else{

      this.db_workers_general.update({ id: data['worker_url'] }, { $set: { selector: true } }, {}, function (err, doc) {
      });

      this.db_workers_details.update({ id: data['worker_url'] }, { $set: { selector: true } }, {}, function (err, doc) {
      });
    }
  }

  else {

    if(data['action'] == 'annotation'){

      this.db_workers_general.update({ id: data['worker_url'] }, { $set: { annotator: false } }, {}, function (err, doc) {
      });

      this.db_workers_details.update({ id: data['worker_url'] }, { $set: { annotator: false } }, {}, function (err, doc) {
      });
    }

    else{

      this.db_workers_general.update({ id: data['worker_url'] }, { $set: { selector: false } }, {}, function (err, doc) {
      });

      this.db_workers_details.update({ id: data['worker_url'] }, { $set: { selector: false } }, {}, function (err, doc) {
      });
    }
  }
};


/*@@@@@@@@@@ EXPORTS @@@@@@@@@@*/

exports.Repository = Repository;
exports.createRepository = Repository;
