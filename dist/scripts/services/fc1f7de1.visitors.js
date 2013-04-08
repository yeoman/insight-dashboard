'use strict';

insightDashboardApp.factory('visitors', [ '$http', function($http) {

  var dateFormat = d3.time.format('%Y%m%d');
  var visitors = [];
  var dateDimension = undefined;

  $http.get('/visitors').then(function( response ) {

    // convert date strings
    angular.forEach( response.data, function( value ) {
      value[0] = dateFormat.parse(value[0]);
    });

    // Initializing crossfilter
    var cf = crossfilter( response.data );
    dateDimension = cf.dimension( function( row ) { return row[0]; } );

    visitors = dateDimension.top( Infinity );
  });

  return {
    /**
     * @method get
     */
    get: function() {
      return visitors;
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
        visitors = dateDimension.top( Infinity );
      }
    }
  };
} ]);
