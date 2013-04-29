var express   = require('express');
var query     = require('./query.js');
var cache     = require('./cache.js');

var app = express();

if ( process.env.NODE_ENV === 'production' ) {
  app.use( express.static( __dirname + '/../dist' ));
} else {
  app.use( '/', express.static( __dirname + '/../app' ));
  app.use( '/styles', express.static( __dirname + '/../temp/styles' ));
}

app.get( '/installs', function( req, res ) { cache.try( req, res, query.installs ); } );
app.get( '/visitors', function( req, res ) { cache.try( req, res, query.visitors ); } );
app.get( '/downloads', function( req, res ) { cache.try( req, res, query.downloads ); } );

app.listen( process.env.PORT || 3000 );
