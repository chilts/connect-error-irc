var express = require('express');
var irc = require('connect-error-irc');

var config = {
    server  : 'irc.example.org',
    channel : '#error',
    nick    : 'webserver',
};

// create your express server
var app = module.exports = express.createServer();

// set the error middleware
app.get('/', function(req, res, next) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('<p>OK</p>');
});

app.get('/error', function(req, res, next) {
    next( 'An error has occurred.' );
});

// set the IRC error handler, which passes it through (and therefore on to the express.errorHandler())
app.use(irc(config));
app.use(express.errorHandler());

app.listen(3000);

console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
