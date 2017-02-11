## Yeoman Insights Dashboard

[![Greenkeeper badge](https://badges.greenkeeper.io/yeoman/insight-dashboard.svg)](https://greenkeeper.io/)

### Running locally:

Install all dependencies:
  - `yeoman install`
  - `npm install`

We use the app secret and a refresh token (read [this](https://groups.google.com/forum/#!msg/google-analytics-data-export-api/4uNaJtquxCs/GuuKmp7MI1EJ) to understand how to get a refresh token) to connect to the analytics API:

  - `export YEOMAN_DASHBOARD_SECRET=your_app_secret`
  - `export YEOMAN_DASHBOARD_REFRESH_TOKEN=your_refresh_token`

This app uses redis as a caching mechanism. Start the redis server:
  - `redis-server`

Start yeoman and the node server:
  - `yeoman server` (ignore the browser window that opens, correct port is 3000)
  - `node server/server.js`

Presto!

### Contributing

Any help is greatly welcome! If you're interested in contributing, please contact [@vitorbal](http://twitter.com/vitorbal) on twitter or freenode and I will
help you get started.
Also, I try to keep a running list of TODOs [here](https://github.com/yeoman/insight-dashboard/issues?milestone=1&state=open).


## License

[BSD license](http://opensource.org/licenses/bsd-license.php)
Copyright (c) Google
