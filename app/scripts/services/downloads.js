'use strict';

insightDashboardApp.factory('downloads', [ '$http', function($http) {

  var dateFormat = d3.time.format('%Y%m%d');

  var downloads = 0;

  var dateDimension = undefined;
  var downloadsGrouped = undefined;

  $http.get('/downloads').then(function( response ) {
    angular.forEach( response.data, function( value ) {
      value[1] = dateFormat.parse(value[1]);
    });

    // Initializing crossfilter
    var cf = crossfilter( response.data );
    dateDimension = cf.dimension( function( row ) { return row[1]; } );

    // groupAll by path, so we ge the total number of downloads
    var downloadsByPath = cf.dimension( function( row ) { return row[0]; } );
    downloadsGrouped = downloadsByPath.groupAll().reduceSum( function( row ) { return row[2]; } );

    downloads = downloadsGrouped.value();
  });

  return {
    /**
     * @method get
     */
    get: function() {
      return downloads;
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
        downloads = downloadsGrouped.value();
      }
    }
  };
} ]);
