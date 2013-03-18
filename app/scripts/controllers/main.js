'use strict';

insightDashboardApp.controller('MainCtrl', ['$scope', '$http', 'filterService',
function( $scope, $http, filterService ) {

  var dateFormat = d3.time.format('%Y%m%d');

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
    // and convert date strings
    angular.forEach( response.data, function( value ) {
      value[0] = value[0].slice( 9 );
      value[1] = dateFormat.parse(value[1]);
    });

    // group by type of install, reduce by sum of pageviews
    var installs = filterService.registerFilterable( response.data, function( row ) { return row[1]; } );
    var installsByType = installs.cf.dimension( function( row ) { return row[0]; } );
    $scope.installsTotalByType = installsByType.group().reduceSum( function( row ) { return row[2]; } );

    // Only show first 100 entries, mainly for performance. Very few pageviews for the rest anyway
    $scope.data = $scope.installsTotalByType.top( 100 );
    // Only display the first 5-10 entries
    $scope.slicedData = $scope.data.slice( 0, 6 );
  });

  /**
   * Visitors
   */
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
    var visitors = filterService.registerFilterable( response.data, function( row ) { return row[0]; } );
    $scope.visitorsByDate = visitors.dateDimension;
    $scope.visitors = $scope.visitorsByDate.top( Infinity );
  });

  // Filters the metrics datum by date interval using crossfilter
  $scope.filterDateStart = '20130306';
  $scope.filterDateEnd = '20130310';
  $scope.filter = function() {
    var dateStart = dateFormat.parse( $scope.filterDateStart );
    // TODO: dateStart is inclusive, but dateEnd not. Should it be?
    var dateEnd = dateFormat.parse( $scope.filterDateEnd );
    filterService.filter(dateStart, dateEnd);

    $scope.visitors = $scope.visitorsByDate.top( Infinity );
    $scope.data = $scope.installsTotalByType.top( 100 );
    $scope.slicedData = $scope.data.slice( 0, 6 );

    return false;
  };

}]);
