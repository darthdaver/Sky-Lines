/*jslint node: true, nomen: true */
"use strict";

var Promise = require('bluebird'),
    DataStore = require('nedb');

function Repository(server) {
    if (!(this instanceof Repository)) {
        return new Repository(server);
    }

    this._server = server || '';

    this.db_tasks_general = Promise.promisifyAll(new DataStore({
        filename: 'tasks_general',
        inMemoryOnly: true
    }));

    this.db_tasks_details = Promise.promisifyAll(new DataStore({
        filename: 'tasks_details',
        inMemoryOnly: true
    }));

    this.db_tasks_statistics = Promise.promisifyAll(new DataStore({
        filename: 'tasks_statistics',
        inMemoryOnly: true
    }));
}

/*@@@@@@@@@@ TASKS GENERAL @@@@@@@@@@*/

Repository.prototype.all_tasks = function (token) {
    var self = this;
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "http://awt.ifmledit.org/api/task",
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

Repository.prototype.t_g_insert = function (data) {

  this.db_tasks_general.insert(data, function(err, doc) {

    console.log('inseriti');
  });
};

Repository.prototype.t_g_update = function (data) {

  this.db_tasks_general.update({ id: data['id'] }, { $set: { name: data['name'] } }, {}, function (err, doc) {
  });
  this.db_tasks_general.update({ id: data['id'] }, { $set: { status: data['status'] } }, {}, function (err, doc) {
  });
}

Repository.prototype.t_g_update_status = function (data) {

  this.db_tasks_general.update({ id: data['url'] }, { $set: { status: data['status'] } }, {}, function (err, doc) {
  });
}

Repository.prototype.t_g_find = function (type) {

  var self = this;

  console.log('t_g_find');

  return new Promise(function (solve,reject, onCancel){

    var info;

    self.db_tasks_general.find({ type: type }, function(err, doc) {

      console.log('documento trovato', doc);

      solve(doc);
    });
  });
};

Repository.prototype.t_g_find_all = function () {

  var self = this;

  return new Promise(function (solve,reject, onCancel){

    var info;

    self.db_tasks_general.find({}, function(err, docs) {

      solve(docs);
    });
  });
};

Repository.prototype.t_g_remove_all = function () {

  this.db_tasks_general.remove({}, { multi: true }, function (err, numRemoved) {

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


/*@@@@@@@@@@ SELECTED TASK DETAILS @@@@@@@@@@*/

Repository.prototype.task_info = function (data) {
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

Repository.prototype.t_d_insert = function (data) {

  this.db_tasks_details.insert(data, function(err, doc) {});
};

Repository.prototype.t_d_update = function (data) {

  this.db_tasks_details.update({ id: data['id'] }, { $set: { annotation_replica: data['annotation_replica'] } }, {}, function (err, doc) {
  });
  this.db_tasks_details.update({ id: data['id'] }, { $set: { annotation_size: data['annotation_size'] } }, {}, function (err, doc) {
  });
  this.db_tasks_details.update({ id: data['id'] }, { $set: { selection_replica: data['selection_replica'] } }, {}, function (err, doc) {
  });
  this.db_tasks_details.update({ id: data['id'] }, { $set: { threshold: data['threshold'] } }, {}, function (err, doc) {
  });
  this.db_tasks_details.update({ id: data['id'] }, { $set: { name: data['name'] } }, {}, function (err, doc) {
  });
}

Repository.prototype.t_d_update_status = function (data) {

  this.db_tasks_details.update({ id: data['url'] }, { $set: { status: data['status'] } }, {}, function (err, doc) {
  });
}

Repository.prototype.t_d_findById = function (url) {

  var self = this;

  return new Promise(function (solve,reject, onCancel){

    self.db_tasks_details.findOne({ id : url}, function(err, doc) {

      console.log('doc',doc);

      solve(doc);
    });
  });
};

Repository.prototype.t_d_findByStatistics = function (url) {

  var self = this;

  return new Promise(function (solve,reject, onCancel){

    self.db_tasks_details.findOne({ statistics : url}, function(err, doc) {

      console.log('doc',doc);

      solve(doc);
    });
  });
};

Repository.prototype.t_d_remove_all = function () {

  this.db_tasks_details.remove({}, { multi: true }, function (err, numRemoved) {

  });
}


/*@@@@@@@@@@ START TASK @@@@@@@@@@*/

Repository.prototype.start_task = function (data) {
    var self = this;

    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "http://awt.ifmledit.org" + data['session_url'],
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
            reject(error.jqXHR);
        });
    });
};


/*@@@@@@@@@@ NEXT TASK @@@@@@@@@@*/

Repository.prototype.next_task = function (data) {
    var self = this;

    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "http://awt.ifmledit.org" + data['session_url'],
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
            reject(error.jqXHR);
        });
    });
};

/*@@@@@@@@@@ SELECTION RESPONSE @@@@@@@@@@*/

Repository.prototype.selection_response = function (data) {
    var self = this;

    console.log('data_json', data['api_string']);

    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "http://awt.ifmledit.org" + data['session_url'],
            data: data['api_string'],
            method: "PUT",
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
            reject(error.jqXHR);
        });
    });
};


/*@@@@@@@@@@ ANNOTATION RESPONSE @@@@@@@@@@*/

Repository.prototype.annotation_response = function (data) {
    var self = this;

    console.log('data_json', data['api_string']);

    return new Promise(function (resolve, reject) {
        $.ajax({

            url: "http://awt.ifmledit.org" + data['session_url'],
            data: data['api_string'],
            method: "PUT",
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
            reject(error.jqXHR);
        });
    });
};

/*@@@@@@@@@@ STATISTICS TASK @@@@@@@@@@*/

Repository.prototype.t_s_findById = function (url) {

  var self = this;

  return new Promise(function (solve,reject, onCancel){

    self.db_tasks_statistics.findOne({ id : url}, function(err, doc) {

      console.log('doc_stat',doc);

      solve(doc);
    });
  });
}

Repository.prototype.t_s_insert = function (data) {

  console.log('data_insert', data);

  this.db_tasks_statistics.insert(data, function(err, doc) {

    console.log('doc_insert', doc);
  });
};

Repository.prototype.t_s_remove_task = function (url) {

  console.log('url', url);

  this.db_tasks_statistics.remove({id : url}, {}, function (err, numRemoved) {

    console.log('removed', numRemoved);

  });
}

Repository.prototype.t_s_remove_all = function () {

  this.db_tasks_statistics.remove({}, { multi: true }, function (err, numRemoved) {

  });
}

Repository.prototype.task_statistics = function (data) {
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
