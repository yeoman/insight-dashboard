'use strict';

insightDashboardApp.factory('installs', [ '$http', function($http) {

  var dateFormat = d3.time.format('%Y%m%d');

  var installs = [];
  var slicedInstalls = [];

  var dateDimension = undefined;
  var installsTotalByType = undefined;

  $http.get('/installs').then(function( response ) {
    // Slice off the '/install/' part of the names
    // and convert date strings
    angular.forEach( response.data, function( value ) {
      value[0] = value[0].slice( 9 );
      value[1] = dateFormat.parse(value[1]);
    });

    // Initializing crossfilter
    var cf = crossfilter( response.data );
    dateDimension = cf.dimension( function( row ) { return row[1]; } );

    // group by type of install, reduce by sum of pageviews
    var installsByType = cf.dimension( function( row ) { return row[0]; } );
    installsTotalByType = installsByType.group().reduceSum( function( row ) { return row[2]; } );

    // Only save first 100 entries, mainly for performance. Very few pageviews for the rest anyway
    installs = installsTotalByType.top( 100 );
    slicedInstalls = installs.slice( 0 , 6 );
  });

  return {
    /**
     * @method get
     * @param {Boolean} isSliced determines if should only return the first 7 entries
     */
    get: function(isSliced) {
      return isSliced ? slicedInstalls : installs;
    },

    /**
     * Filters dataset by the specified date interval.
     *
     * @method filter
     * @param {Object} startDate
     * @param {Object} endDate
     */
    filter: function( startDate, endDate ) {
      if ( dateDimension ) {
        dateDimension.filterRange( [ startDate, endDate ] );
        installs = installsTotalByType.top( 100 );
        slicedInstalls = installs.slice( 0 , 6 );
      }
    }
  };
} ]);
