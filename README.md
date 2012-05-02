```
 _______  _______  _        _        _______  _______ _________
(  ____ \(  ___  )( (    /|( (    /|(  ____ \(  ____ \\__   __/
| (    \/| (   ) ||  \  ( ||  \  ( || (    \/| (    \/   ) (   
| |      | |   | ||   \ | ||   \ | || (__    | |         | |   
| |      | |   | || (\ \) || (\ \) ||  __)   | |         | |   
| |      | |   | || | \   || | \   || (      | |         | |   
| (____/\| (___) || )  \  || )  \  || (____/\| (____/\   | |   
(_______/(_______)|/    )_)|/    )_)(_______/(_______/   )_(   
                                                               

            _______  _______  _______  _______  _______ 
           (  ____ \(  ____ )(  ____ )(  ___  )(  ____ )
           | (    \/| (    )|| (    )|| (   ) || (    )|
     _____ | (__    | (____)|| (____)|| |   | || (____)|
    (_____)|  __)   |     __)|     __)| |   | ||     __)
           | (      | (\ (   | (\ (   | |   | || (\ (   
           | (____/\| ) \ \__| ) \ \__| (___) || ) \ \__
           (_______/|/   \__/|/   \__/(_______)|/   \__/
                                                        

            _________ _______  _______ 
            \__   __/(  ____ )(  ____ \
               ) (   | (    )|| (    \/
         _____ | |   | (____)|| |      
        (_____)| |   |     __)| |      
               | |   | (\ (   | |      
            ___) (___| ) \ \__| (____/\
            \_______/|/   \__/(_______/
                                       
```

Connect middleware to send errors to an IRC server.

# Usage #

    var express = require('express');
    var irc = require('connect-error-irc');

    var config = {
        server  : 'irc.example.com',
        channel : '#error',
        nick    : 'my.example.com',
    };

    // create your express server
    var app = module.exports = express.createServer();

    // YOUR ROUTES HERE

    // set the IRC error handler which logs then passes the error on
    app.use(irc(config));
    app.use(express.errorHandler());

    app.listen(3000);

    console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

You may just want to use connect-error-irc on just one of your environments. Let's say 'development' uses express's own
errorHandler, 'testing' uses connect-error-irc and 'production' uses some better magic:

    app.configure('development', function(){
        app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
    });

    app.configure('testing', function(){
        app.use(ses(config));
        app.use(express.errorHandler());
    });

    app.configure('production', function(){
        app.use(someOtherBattleHardenedErrorMiddleware());
    });

## Notes ##

Your IRC server may throttle messages coming from your webserver. This middleware may or may not be a good choice for
your product - you need to figure out what the answer to that question is! :)

Have fun!

# Author #

Written by [Andrew Chilton](http://www.chilts.org/blog/)

Copyright 2012 [AppsAttic](http://www.appsattic.com/)

# License #

MIT. See LICENSE for more details.

[npm]: http://github.com/isaacs/npm
