'use strict';

insightDashboardApp.controller('MainCtrl', ['$scope', '$http', function($scope, $http) {
  $scope.data = [];
  $scope.slicedData = [];

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
}]);
