'use strict';

insightDashboardApp.controller('MainCtrl', ['$scope', '$http', 'installs', 'visitors', 'downloads',
function( $scope, $http, installs, visitors, downloads ) {

  var dateFormat = d3.time.format('%Y%m%d');

  $scope.installs = installs.get;
  $scope.visitors = visitors.get;
  $scope.downloads = downloads.get;

  // Filters the metrics datum by date interval using crossfilter
  $scope.filterDateStart = '20130306';
  $scope.filterDateEnd = '20130310';
  $scope.filter = function() {
    var dateStart = dateFormat.parse( $scope.filterDateStart );
    // TODO: dateStart is inclusive, but dateEnd not. Should it be?
    var dateEnd = dateFormat.parse( $scope.filterDateEnd );

    installs.filter(dateStart, dateEnd);
    visitors.filter(dateStart, dateEnd);
    downloads.filter(dateStart, dateEnd);

    return false;
  };

}]);
