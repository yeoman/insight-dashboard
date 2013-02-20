var Analytics = require('./util/analytics.js');
var when      = require('when');

var profileId    = '59574650';
var clientId     = '653659177977.apps.googleusercontent.com';
var clientSecret = process.env.YEOMAN_DASHBOARD_SECRET;
var refreshToken = process.env.YEOMAN_DASHBOARD_REFRESH_TOKEN;

var analytics = new Analytics( profileId, clientId, clientSecret, refreshToken );

exports.installs = function() {
    var deferred = when.defer();

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

      deferred.resolve( result );
    });

    return deferred.promise;
};
