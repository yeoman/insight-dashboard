var moment = require('moment');
var when   = require('when');

// Connecting to redis
var redis;
if ( process.env.REDISTOGO_URL ) {
  // redistogo heroku connection
  redis = require('redis-url').connect( process.env.REDISTOGO_URL );
} else {
  redis = require('redis').createClient();
}

/**
 * Tries to resolve a request using the cache. If we get a cache miss,
 * we call the original handler 'fallback' and save its result to the cache.
 *
 * @method try
 * @param {Object} req The request object
 * @param {Object} res The response object
 * @param {Funciton} fallback The handler to fallback to in case the cache misses
 */
exports.try = function( req, res, fallback ) {

  redis.get( req.url, function( err, reply ) {

    if ( err || reply === null ) {
      console.log( '%s : cache miss for "%s"', new Date(), req.url );
      fallback().then( function( result ) {

        // Save to cache and set 'expireat' to end of current day
        redis.set( req.url, JSON.stringify( result ) );
        redis.expire( req.url, moment().endOf('day').unix() );

        res.json( result );
      });
    } else {
      console.log( '%s : cache hit for "%s"', new Date(), req.url );
      res.json( JSON.parse( reply ) );
    }
  });
};
