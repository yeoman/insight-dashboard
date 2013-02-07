var request = require('request');
var util = require('util');

var analytics = module.exports;

var profileId    = '59574650';
var clientId     = '653659177977.apps.googleusercontent.com';
var clientSecret = process.env.YEOMAN_DASHBOARD_SECRET;
var refreshToken = process.env.YEOMAN_DASHBOARD_REFRESH_TOKEN;
var authToken    = null;

var baseQuery = util.format( 'ids=ga:%s&', profileId );
var baseUrl   = util.format( 'https://www.googleapis.com/analytics/v3/data/ga?%s', baseQuery );
var authUrl   = 'https://accounts.google.com/o/oauth2/token';

/**
 * Authorize analytics
 */
var authorize = function( callback ) {

  var data = {
    refresh_token: refreshToken,
    client_id    : clientId,
    client_secret: clientSecret,
    grant_type   : 'refresh_token'
  };

  // TODO: cache authToken
  request.post( authUrl, { form: data, }, function( err, response, body ) {
    var result = JSON.parse( body );

    // TODO: Handle error
    if ( result.access_token ) {
      authToken = result.access_token;

    } else {
      console.log('Auth Error:');
      console.log( err );
      console.log( body );
      return false;
    }

    callback();
  });
};

analytics.query = function( params, callback ) {

  params['start-date'] = '2005-01-01';
  params['end-date']   = formatDate(new Date());

  authorize(function() {
    var header = { Authorization: util.format( 'OAuth %s', authToken ) };

    request.get( baseUrl, { headers: header, qs: params },
      function( err, response, body ) {
        // TODO: Handle error
        callback( body );
      });
  })
};

var formatDate = function( date ) {
  var pad = function( n ) { return n < 10 ? '0' + n : '' + n };
  return util.format( '%s-%s-%s', pad( date.getFullYear() ),
                                  pad( date.getMonth() + 1 ),
                                  pad( date.getDate() ));
};