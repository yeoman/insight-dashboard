var Analytics = require('./util/analytics.js');
var moment    = require('moment');

// Connecting to redis
var redis;
if ( process.env.REDISTOGO_URL ) {
  // redistogo heroku connection
  redis = require('redis-url').connect( process.env.REDISTOGO_URL );
} else {
  redis = require('redis').createClient();
}

var profileId    = '59574650';
var clientId     = '653659177977.apps.googleusercontent.com';
var clientSecret = process.env.YEOMAN_DASHBOARD_SECRET;
var refreshToken = process.env.YEOMAN_DASHBOARD_REFRESH_TOKEN;

var analytics = new Analytics( profileId, clientId, clientSecret, refreshToken );

exports.installs = function( request, response ) {
  // Check cache
  redis.get( request.url, function( err, reply ) {
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
        redis.set( request.url, JSON.stringify( result ) );
        redis.expire( request.url, moment().endOf('day').unix() );

        response.json( result );
      });

    } else {
      response.json( JSON.parse( reply ) );
    }
  });

};
