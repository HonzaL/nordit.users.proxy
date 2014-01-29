#!/usr/bin/env /usr/bin/node
/**
 * Module Dependencies
 */

var mongoose = require('mongoose')
  , config = require('nconfig')({file: __dirname + '/config/config.js'})
  , fs = require('fs')

// Bootstrap mongoDB connection
mongoose.connect(config.db.mongo);

// Bootstrap Contract model
require('ncontract')

// Load Contract model
var Contract = mongoose.model('Contract')

Contract.find({'active': true}, {'_id': 1, 'port': 1}, function(err, data) {
    if (err) process.exit(1)

    // Deklarace objektu pro zapis
    var router = {}
    router.router = {}
    
    // Pre pravidla
    for (var i in config.router.pre) {
	router.router[config.users.host + i] = config.router.pre[i];
    }

    // Projdeme vsechny aktivni zakazky
    for (var i in data) {
	var contract = data[i];
	// do objektu routru pridame pravidlo pro danou zakazku
	router.router[config.users.host + "/nc/" + contract._id + "/"] = "127.0.0.1:" + contract.port
    }
    // Post pravidla 
    for (var i in config.router.post) {
	router.router[config.users.host + i] = config.router.post[i];
    }
    // Nakonec pridame pravidlo pro root modul
    router.router[config.users.host + "/"] = "127.0.0.1:" + config.users.port

    // Zapiseme cesty do souboru
    fs.writeFile(__dirname + "/router/" + config.routerFile, JSON.stringify(router, null, 4) + "\n", function(err) {
	if (err) throw err;
	// exit process
	process.exit(0);
    })
})
