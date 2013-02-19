var request = require('request');
var util = require('util');

var Analytics = function( profileId, clientId, clientSecret, refreshToken ) {
  this.profileId = profileId;
  this.clientId = clientId;
  this.clientSecret = clientSecret;
  this.refreshToken = refreshToken;

  this.authToken = null;

  this.baseUrl = util.format( this.defaults.baseUrl, this.profileId );
  this.authUrl = this.defaults.authUrl;
};

Analytics.prototype.defaults = {
  baseUrl: 'https://www.googleapis.com/analytics/v3/data/ga?ids=ga:%s&',
  authUrl: 'https://accounts.google.com/o/oauth2/token'
};

/**
 * Authorize method
 */
Analytics.prototype.authorize = function( callback ) {
  var data = {
    refresh_token: this.refreshToken,
    client_id    : this.clientId,
    client_secret: this.clientSecret,
    grant_type   : 'refresh_token'
  };

  // TODO: cache authToken?
  request.post( this.authUrl, { form: data, }, function( err, response, body ) {
    var result = JSON.parse( body );

    // TODO: Handle error
    if ( result.access_token ) {
      this.authToken = result.access_token;

    } else {
      console.log('Auth Error:');
      console.log( err );
      console.log( body );
      return false;
    }

    callback.apply(this);
  }.bind(this));
};

/**
 * Query method
 */
Analytics.prototype.query = function( params, callback ) {
  params['start-date'] = '2005-01-01';
  params['end-date']   = formatDate(new Date());

  this.authorize(function() {
    var header = { Authorization: util.format( 'OAuth %s', this.authToken ) };

    request.get( this.baseUrl, { headers: header, qs: params },
      function( err, response, body ) {
        // TODO: Handle error
        callback( body );
      }.bind(this));
  })
};

/**
 * Private functions
 */
var formatDate = function( date ) {
  var pad = function( n ) { return n < 10 ? '0' + n : '' + n };
  return util.format( '%s-%s-%s', pad( date.getFullYear() ),
                                  pad( date.getMonth() + 1 ),
                                  pad( date.getDate() ));
};

module.exports = Analytics;
