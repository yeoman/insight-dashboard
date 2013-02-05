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

authorize(process.env.YEOMAN_DASHBOARD_REFRESH_TOKEN);

// app.get('/', function (req, res) {
// 
//     res.send('Hello, Yeoman!');
// });
// 
// app.listen(3000);
// console.log('Listening on port 3000');
