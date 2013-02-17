## Yeoman Insights Dashboard

### Setting up for deployment on Heroku

Add all necessary environment variables:
  - `heroku config:set NODE_ENV=production`
  - `heroku config:set YEOMAN_DASHBOARD_SECRET=your_app_secret`
  - `heroku config:set YEOMAN_DASHBOARD_REFRESH_TOKEN=your_refresh_token`

Configure git to push the heroku branch when pushing to the heroku remote:
  - `git config --local remote.heroku.push heroku:master`
  - push with `git push heroku`

Don't forget that when running on production environment, the app expects static files
to be served from the `dist/` directory.
