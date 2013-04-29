var Analytics = require('./util/analytics.js');
var when      = require('when');

var profileId    = '59574650';
var clientId     = '653659177977.apps.googleusercontent.com';
var clientSecret = process.env.YEOMAN_DASHBOARD_SECRET;
var refreshToken = process.env.YEOMAN_DASHBOARD_REFRESH_TOKEN;

var analytics = new Analytics( profileId, clientId, clientSecret, refreshToken );

exports.installs = function() {
  return deferQuery({
    dimensions   : 'ga:pagePath,ga:date',
    metrics      : 'ga:pageviews',
    sort         : '-ga:date, -ga:pageviews',
    filters      : 'ga:pagePath=@/install/'
  });
};

exports.visitors = function() {
  return deferQuery({
    // TODO: include visitorType to make a stacked bar chart?
    // dimensions: 'ga:date,ga:dayOfWeek,ga:visitorType',
    dimensions: 'ga:date,ga:dayOfWeek',
    metrics   : 'ga:visitors'
  });
};

exports.downloads = function() {
  return deferQuery({
    dimensions: 'ga:pagePath, ga:date',
    metrics   : 'ga:pageviews',
    filters   : 'ga:pagePath=@/downloaded'
  });
};

exports.generators = function() {

};

/**
 * Generates a deferred analytics query.
 *
 * @method deferQuery
 * @param {Object} queryParams Parameters to be passed to analytics.query method
 */
var deferQuery = function( queryParams, processResponse ) {
  var deferred = when.defer();

  // Start of Yeoman
  queryParams['start-date'] = '2012-06-06';

  analytics.query( queryParams, function( responseJSON ) {
    var response = JSON.parse( responseJSON );
    deferred.resolve( response.rows );
  });

  return deferred.promise;
};
