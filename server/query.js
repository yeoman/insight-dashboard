var Analytics = require('./util/analytics.js');
var when      = require('when');

var profileId    = '59574650';
var clientId     = '653659177977.apps.googleusercontent.com';
var clientSecret = process.env.YEOMAN_DASHBOARD_SECRET;
var refreshToken = process.env.YEOMAN_DASHBOARD_REFRESH_TOKEN;

var analytics = new Analytics( profileId, clientId, clientSecret, refreshToken );

exports.installs = function() {
  return deferQuery({
    dimensions   : 'ga:pagePath',
    metrics      : 'ga:pageviews',
    sort         : '-ga:pageviews',
    filters      : 'ga:pagePath=@/install/',
    'max-results': '100'
  });
};

exports.visitors = function() {
  return deferQuery({
    dimensions: 'ga:date,ga:dayOfWeek,ga:visitorType',
    metrics   : 'ga:visitors'
  });
};

/**
 * Generates a deferred analytics query.
 *
 * @method deferQuery
 * @param {Object} queryParams Parameters to be passed to analytics.query method
 */
var deferQuery = function( queryParams, processResponse ) {
  var deferred = when.defer();

  analytics.query( queryParams, function( responseJSON ) {
    var response = JSON.parse( responseJSON );
    deferred.resolve( response.rows );
  });

  return deferred.promise;
};
