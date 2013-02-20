var express   = require('express');
var moment    = require('moment');
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

// Connecting to redis
var redis;
if ( process.env.REDISTOGO_URL ) {
  // redistogo heroku connection
  redis = require('redis-url').connect( process.env.REDISTOGO_URL );
} else {
  redis = require('redis').createClient();
}

app.get( '/installs', function( req, res ) {

  // Check cache
  redis.get( 'installs', function( err, reply ) {
    if ( err || reply === null ) {
      // cache miss, perform query
      analytics.query({

        dimensions   : 'ga:pagePath',
        metrics      : 'ga:pageviews',
        sort         : '-ga:pageviews',
        filters      : 'ga:pagePath=@/install/',
        'max-results': '100'

      }, function( responseJSON ) {
        var response = JSON.parse( responseJSON );
        var result = {
          'total': response.totalsForAllResults['ga:pageviews'],
          'rows': response.rows
        };

        // Save to cache and set 'expireat' to end of current day
        redis.set( 'installs', JSON.stringify( result ) );
        redis.expire( 'installs', moment().endOf('day').unix() );

        res.json( result );
      });

    } else {
      res.json( JSON.parse( reply ) );
    }
  });
});

app.listen( process.env.PORT || 3000 );
