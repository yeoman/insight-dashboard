var express   = require('express');
var analytics = require('./util/analytics.js'),

var app = express();

app.get( '/', function( req, res ) {
  analytics.query({

    dimensions   : 'ga:pagePath',
    metrics      : 'ga:pageviews',
    sort         : '-ga:pageviews',
    'max-results': '200'

  }, function( response ) {
    res.send( response );
  });
});

app.listen( 3000 );
console.log('Listening on port 3000');
