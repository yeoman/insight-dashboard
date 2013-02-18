var express   = require('express');
var Analytics = require('./util/analytics.js');

var app = express();

var profileId    = '59574650';
var clientId     = '653659177977.apps.googleusercontent.com';
var clientSecret = process.env.YEOMAN_DASHBOARD_SECRET;
var refreshToken = process.env.YEOMAN_DASHBOARD_REFRESH_TOKEN;

var analytics = new Analytics(profileId, clientId, clientSecret, refreshToken);

if ( process.env.NODE_ENV === 'production' ) {
  app.use( express.static( __dirname + '/../dist' ));
} else {
  app.use( express.static( __dirname + '/../app' ));
  app.use( '/styles', express.static( __dirname + '/../temp/styles' ));
}

app.get( '/installs', function( req, res ) {
  analytics.query({

    dimensions   : 'ga:pagePath',
    metrics      : 'ga:pageviews',
    sort         : '-ga:pageviews',
    filters      : 'ga:pagePath=@/install/',
    'max-results': '100'

  }, function( responseJSON ) {

    var response = JSON.parse( responseJSON );
    res.json({
      total: response.totalsForAllResults['ga:pageviews'],
      rows: response.rows
    });
  });
});

app.listen( process.env.PORT || 3000 );
