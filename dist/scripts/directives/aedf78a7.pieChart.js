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
      var radius = Math.min( width, height ) / 2;

      var data = scope.data;

      var arc = d3.svg.arc()
          .outerRadius( radius - 10 )
          .innerRadius( 0 );

      var labelsArc = d3.svg.arc().outerRadius( arc.outerRadius() );

      var pie = d3.layout.pie()
          .sort( null )
          .value( function(d) { return d.value; } );

      var svg = d3.select( element[0] )
          .append('svg')
            .attr( 'class', 'pie-chart')
            .attr( 'width', width )
            .attr( 'height', height + 50 )
          .append('g')
            .attr( 'transform', 'translate(' + width / 2 + ',' + (height / 2 + 25) + ')');

      // Run this everytime scope.data changes
      scope.$watch( 'data', function( data ) {

        var path = svg.selectAll('path')
            .data( pie( data ) )
            .attr( 'd', arc );

        var text = svg.selectAll('text')
            .data( pie( data ) )
            .text( function(d) { return d.data.key; } )
            .attr('transform', function(d) {
              d.innerRadius = radius + 50;
              d.outerRadius = radius;
              return 'translate(' + labelsArc.centroid( d ) + ')';
            });

        path.enter()
            .append('path')
            .attr( 'fill', function(d) { return color( d.data.key ); } )
            .attr( 'd', arc )

        path.enter()
            .append('text')
            .style( 'text-anchor', 'middle' )
            .text( function(d) { return d.data.key; } )
            .attr('dy', '.35em')
            .attr('transform', function(d) {
              d.innerRadius = radius + 50;
              d.outerRadius = radius;
              return 'translate(' + labelsArc.centroid( d ) + ')';
            });

        path.exit().remove();

      });
    }
  };
});
