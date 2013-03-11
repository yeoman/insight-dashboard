'use strict';

insightDashboardApp.controller('MainCtrl', ['$scope', '$http', function($scope, $http) {
  $scope.data = [];
  $scope.slicedData = [];

  //TODO extract these out of the controller to somewhere else. Services maybe?

  /**
   * Installs
   */
  $http({
    method: 'GET',
    url: '/installs'
  })
  .then( function( response ) {
    // Slice off the '/install/' part of the names
    angular.forEach( response.data, function( value ) {
      value[0] = value[0].slice( 9 );
    });

    $scope.data = response.data;
    // Only display the first 5-10 entries,
    // TODO: aggregate the rest together in the last entry
    $scope.slicedData = response.data.slice( 0, 6 );
  });

  /**
   * Visitors
   */
  var dateFormat = d3.time.format('%Y%m%d');

  $http({
    method: 'GET',
    url: '/visitors'
  })
  .then( function( response ) {

    // converting date strings to date objects
    angular.forEach( response.data, function( value ) {
      value[0] = dateFormat.parse(value[0]);
    });

    // configuring crossfilter
    $scope.cfVisitors = crossfilter( response.data );
    $scope.dateDimension = $scope.cfVisitors.dimension( function( row ) { return row[0]; } );
    $scope.visitors = $scope.dateDimension.top( Infinity );
  });

  // Filters the visitors data by date interval using crossfilter
  $scope.filterDateStart = '20130306';
  $scope.filterDateEnd = '20130310';
  $scope.filter = function() {
    var dateStart = dateFormat.parse( $scope.filterDateStart );
    // TODO: dateStart is inclusive, but dateEnd not. Should it be?
    var dateEnd = dateFormat.parse( $scope.filterDateEnd );
    $scope.visitors = $scope.dateDimension.filterRange([ dateStart, dateEnd ]).top( Infinity );
  };

}]);
