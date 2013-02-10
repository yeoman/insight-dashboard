var express   = require('express');
var Analytics = require('./util/analytics.js');

var app = express();

var profileId    = '59574650';
var clientId     = '653659177977.apps.googleusercontent.com';
var clientSecret = process.env.YEOMAN_DASHBOARD_SECRET;
var refreshToken = process.env.YEOMAN_DASHBOARD_REFRESH_TOKEN;

var analytics = new Analytics(profileId, clientId, clientSecret, refreshToken);

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
