'use strict';

insightDashboardApp.directive('pieChart', function() {

  // Constants
  var color = d3.scale.category20c();

  return {
    restrict: 'E',

    scope: {
      data: '=',
      width: '=',
      height: '='
    },

    link: function postLink( scope, element, attrs ) {
      var width = +scope.width || 400;
      var height = +scope.height || 400;
      var data = scope.data;

     var svg = d3.select( element[0] )
        .append('svg')
        .attr( 'width', width )
        .attr( 'height', height )

      var chart = nv.models.pieChart()
          .x( function(d) { return d.key } )
          .y( function(d) { return d.value } )
          .showLegend( false )
          .values( function(d) { return d } )
          .color( d3.scale.category10().range() )
          .width( width )
          .height( height )
          .margin({ top: 0, bottom: 0 });


      // Run this everytime scope.data changes
      scope.$watch( 'data', function( data ) {
        svg.datum( [data] )
          .transition()
          .duration( 1200 )
          .call( chart );

      });
    }
  };
});
