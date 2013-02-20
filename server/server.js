var express   = require('express');
var query     = require('./query.js');
var cache     = require('./cache.js');

var app = express();

if ( process.env.NODE_ENV === 'production' ) {
  app.use( express.static( __dirname + '/../dist' ));
} else {
  app.use( '/', express.static( __dirname + '/../temp' ));
}

app.get( '/installs', function( req, res ) { cache.try( req, res, query.installs ); } );

app.listen( process.env.PORT || 3000 );
