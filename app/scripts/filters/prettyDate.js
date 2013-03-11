'use strict';

insightDashboardApp.filter('prettyDate', function() {
  var formatDate = d3.time.format('%d %b %Y');

  return function( input ) {
    if ( input instanceof Date ) {
      return formatDate( input );

    } else {
      return 'invalid date';
    }
  };
});
