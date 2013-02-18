'use strict';

insightDashboardApp.controller('MainCtrl', ['$scope', '$http', function($scope, $http) {
  var data = $http({
    method: 'GET',
    url: '/installs'
  })
  .then( function( response ) {
    $scope.data = response.data.rows;
    // Only display the first 5-10 entries,
    // TODO: aggregate the rest together in the last entry
    $scope.slicedData = response.data.rows.slice( 0, 6 );
  });

  $scope.data = data;
  $scope.slicedData = [];
}]);
