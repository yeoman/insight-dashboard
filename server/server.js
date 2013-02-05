var express = require('express'),
    app     = express(),
    fs      = require('fs'),
    request = require('request');

var profileId = '59574650',
    baseUrl   = 'https://www.googleapis.com/analytics/v3/data/ga?ids=ga:' + profileId + '&',
    exampleQuery = baseUrl + 'start-date=2005-01-01&end-date=2013-02-04&metrics=ga:pageviews';

var authorize = function(refreshToken, callback) {
    var authorize_url = 'https://accounts.google.com/o/oauth2/token';
    request.post(authorize_url, {
        form: {
            refresh_token: refreshToken,
            client_id: '653659177977.apps.googleusercontent.com',
            client_secret: process.env.YEOMAN_DASHBOARD_SECRET,
            grant_type: 'refresh_token'
        }
    }, function(err, response, body) {
        console.log(body);
    });
};

authorize('1/Xl2APrqweSqzwYTsSmh30SmGTORAOckibNnbjsF4iN8');


fs.readFile('token.txt', 'utf8', function(err, data) {
});

// app.get('/', function (req, res) {
// 
//     res.send('sup');
// });
// 
// app.listen(3000);
// console.log('Listening on port 3000');


//    var now = new Date().getTime() - (360 * 1000);
//
//    var jwt_payload = {
//        iss: "372493621640-rjt489be1b9d1hb2un9k8gdeub0qu3nn@developer.gserviceaccount.com",
//        scope: "https://www.googleapis.com/auth/analytics.readonly",
//        aud: "https://accounts.google.com/o/oauth2/token",
//        exp: now + (3600 * 1000),
//        iat: now
//    };
//
//    fs.readFile('privateKey.p12', function(err, secret) {
//        var jwt = require('jwt-simple');
//        var token = jwt.encode(jwt_payload, secret);
//
//        request.post({
//            url: 'https://accounts.google.com/o/oauth2/token',
//            form: { grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: token }
//        }, function(err, response, body) {
//            console.log(body);
//        });
//    });
