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

    this.db_statistics_general = Promise.promisifyAll(new DataStore({
        filename: 'statistics_general',
        inMemoryOnly: true
    }));

    this.db_campaigns_details = Promise.promisifyAll(new DataStore({
        filename: 'statistics_details',
        inMemoryOnly: true
    }));
}


/*@@@@@@@@@@ EXPORTS @@@@@@@@@@*/

exports.Repository = Repository;
exports.createRepository = Repository;
