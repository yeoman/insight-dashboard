var request = require('request');

var analytics = module.exports;

var profileId    = '59574650',
    clientId     = '653659177977.apps.googleusercontent.com',
    clientSecret = process.env.YEOMAN_DASHBOARD_SECRET,
    refreshToken = process.env.YEOMAN_DASHBOARD_REFRESH_TOKEN,
    authToken    = null,

    baseQuery    = 'ids=' + encodeURIComponent('ga:' + profileId) + '&',
    baseUrl      = 'https://www.googleapis.com/analytics/v3/data/ga?' + baseQuery,
    authUrl      = 'https://accounts.google.com/o/oauth2/token';

/**
 * Authorize analytics
 */
var authorize = function(callback) {

    var data = {
        refresh_token: refreshToken,
        client_id    : clientId,
        client_secret: clientSecret,
        grant_type   : 'refresh_token'
    };

    // TODO: cache authToken
    request.post(authUrl, { form: data, }, function(err, response, body) {
        var result = JSON.parse(body);

        // TODO: Handle error
        if (result.access_token) {
            authToken = result.access_token;

        } else {
            console.log('Auth Error:');
            console.log(err);
            console.log(body);
            return false;
        }

        callback();
    });
};

analytics.query = function(params, callback) {
    var paramsArray = [],
        queryUrl = '';

    for (var param in params) {
        if (params.hasOwnProperty(param)) {
            paramsArray.push(param + '=' + encodeURIComponent(params[param]));
        }
    }

    // TODO: Make (at least) end date default to current time
    paramsArray.push('start-date=' + encodeURIComponent('2005-01-01'));
    paramsArray.push('end-date=' + encodeURIComponent('2013-02-04'));

    queryUrl = baseUrl + paramsArray.join('&');

    authorize(function() {

        var header = { Authorization: 'OAuth ' + authToken };
        request.get(queryUrl, { headers: header }, function(err, response, body) {
            // TODO: Handle error
            callback(body);
        });
    })

};
