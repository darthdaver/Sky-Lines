/*jslint node: true, nomen: true */
"use strict";

var Promise = require('bluebird'),
    DataStore = require('nedb');

function Repository(server) {
    if (!(this instanceof Repository)) {
        return new Repository(server);
    }

    this._server = server || '';

    this.db_images_general = Promise.promisifyAll(new DataStore({
        filename: 'images_general',
        inMemoryOnly: true
    }));

    this.db_images_details = Promise.promisifyAll(new DataStore({
        filename: 'images_details',
        inMemoryOnly: true
    }));

    this.db_images_visualize = Promise.promisifyAll(new DataStore({
        filename: 'images_visualize',
        inMemoryOnly: true
    }));
}

/*@@@@@@@@@@ STAT GENERAL @@@@@@@@@@*/

Repository.prototype.read_stat = function (url) {
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


/*@@@@@@@@@@ IMAGES GENERAL @@@@@@@@@@*/

Repository.prototype.all_images_campaign = function (url) {
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

Repository.prototype.i_g_insert = function (data) {

  this.db_images_general.insert(data, function(err, doc) {

  });
};

Repository.prototype.i_g_find = function (state) {

  var self = this;

  return new Promise(function (solve,reject, onCancel){

    var info;

    self.db_images_general.find({ status: state }, function(err, doc) {

      solve(doc);
    });
  });
};

Repository.prototype.i_g_find_all = function (url) {

  var self = this;

  return new Promise(function (solve,reject, onCancel){

    var info;

    self.db_images_general.find({id : url}, function(err, list) {

      solve(list);
    });
  });
};

Repository.prototype.i_g_remove = function (url) {

  this.db_images_general.remove({id : url}, {}, function (err, numRemoved) {

  });
};

Repository.prototype.i_g_remove_all = function () {

  this.db_images_general.remove({}, { multi: true }, function (err, numRemoved) {

  });
}

/*@@@@@@@@@@ SELECTED IMAGE INFORMATION @@@@@@@@@@*/

Repository.prototype.image_info = function (data) {
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

Repository.prototype.i_d_insert = function (data) {

  this.db_images_details.insert(data, function(err, doc) {

  });
};

Repository.prototype.i_d_find = function (fields, project) {

    return this.db_images_details.findAsync(fields, project);
};

Repository.prototype.i_d_findById = function (url) {

  var self = this;

  return new Promise(function (solve,reject, onCancel){

    self.db_images_details.findOne({ id : url}, function(err, doc) {

      solve(doc);
    });
  });
};

Repository.prototype.i_d_remove_all = function () {

  this.db_images_details.remove({}, { multi: true }, function (err, numRemoved) {

  });
}


/*@@@@@@@@@@ UPLOAD IMAGE @@@@@@@@@@*/

Repository.prototype.load_images_campaign = function (data) {
    var self = this;

    $("#files").append($("#fileUploadProgressTemplate").tmpl());

    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "http://awt.ifmledit.org" + data['images_campaign_url'],
            data: data['files'],
            method: "POST",
            crossDomain: true,
            processData: false,
            contentType: false,
            beforeSend: function(xhr){xhr.setRequestHeader('Authorization', "APIToken " + localStorage.getItem('token'));},
            xhr: function() {
            var xhr = $.ajaxSettings.xhr();
            if (xhr.upload) {

                xhr.upload.addEventListener('progress', function(evt) {
                    var percent = (evt.loaded / evt.total) * 100;
                    $("#files").find(".progress-bar").width(percent + "%");
                }, false);
            }
            return xhr;
            },
            success: function(data) {$("#files").children().last().remove();},
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


/*@@@@@@@@@@ DISPLAY IMAGE @@@@@@@@@@*/

Repository.prototype.selected_image = function (data) {
    var self = this;

    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "http://awt.ifmledit.org" + data['url'],
            data: undefined,
            method: "GET",
            crossDomain: true,
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

Repository.prototype.i_v_insert = function (data) {

  this.db_images_visualize.insert(data, function(err, doc) {

    //user = doc;
  });
};

Repository.prototype.i_v_find = function (state) {

  var self = this;

  return new Promise(function (solve,reject, onCancel){

    var info;

    self.db_images_visualize.find({ status: state }, function(err, doc) {

      solve(doc);
    });
  });
};

Repository.prototype.i_v_find_all = function () {

  var self = this;

  return new Promise(function (solve,reject, onCancel){

    var info;

    self.db_images_visualize.find({}, function(err, doc) {

      solve(doc);
    });
  });
};

Repository.prototype.i_v_findById = function (url) {

  var self = this;

  return new Promise(function (solve,reject, onCancel){

    self.db_images_visualize.findOne({ id : url}, function(err, img) {

      solve(img);
    });
  });
};

Repository.prototype.i_v_remove_all = function () {

  this.db_images_visualize.remove({}, { multi: true }, function (err, numRemoved) {

  });
}


/*@@@@@@@@@@ EXPORTS @@@@@@@@@@*/

exports.Repository = Repository;
exports.createRepository = Repository;
