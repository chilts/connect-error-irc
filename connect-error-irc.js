// --------------------------------------------------------------------------------------------------------------------
//
// connect-error-irc.js - Middleware to send errors to an IRC server.
//
// Copyright (c) 2012 AppsAttic Ltd - http://www.appsattic.com/
// Written by Andrew Chilton <chilts@appsattic.com>
//
// License: http://opensource.org/licenses/MIT
//
// --------------------------------------------------------------------------------------------------------------------

var irc = require('irc');

module.exports = function(options) {
    options = options || {};

    // remember these (by taking local variables)
    var server  = options.server;
    var channel = options.channel;
    var nick    = options.nick || 'connect-error-irc';

    // make an IRC Client
    var client = new irc.Client(options.server, options.nick, {
        channels: [ options.channel ],
    });

    return function errorHandler(err, req, res, next) {
        // send this error to the server
        client.say(options.channel, err);

        // console.log(err);

        // ... and pass on the original error to the next error middleware
        next(err);
    };
};

// --------------------------------------------------------------------------------------------------------------------
