var express   = require('express');
var query     = require('./query.js');

var app = express();

if ( process.env.NODE_ENV === 'production' ) {
  app.use( express.static( __dirname + '/../dist' ));
} else {
  app.use( express.static( __dirname + '/../app' ));
  app.use( '/styles', express.static( __dirname + '/../temp/styles' ));
}

app.get( '/installs', query.installs );

app.listen( process.env.PORT || 3000 );
