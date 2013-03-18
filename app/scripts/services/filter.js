'use strict';

insightDashboardApp.factory('filterService', function() {

  var filterables = [];

  return {
    /**
     * Registers a dataset as being filterable by crossfilter.
     *
     * @method registerFilterable
     * @param {Array} dataset Array of data that will be used to initialize a crossfilter
     * @param {Function} getDate Function used to get the date field from a given row of this dataset
     * @returns {{crossfilter: {Object}, dateDimension: {Object}}
     */
    registerFilterable: function( dataset, getDate ) {
      var cf = crossfilter( dataset );
      var result = {
        cf: cf,
        dateDimension: cf.dimension(getDate)
      }
      filterables.push(result.dateDimension);
      return result;
    },

    /**
     * Filters all registered filterables by the specified date interval.
     * Note that this function doesn't return anything as we expect the client
     * to query on the crossfilter object by himself for data he is interested in.
     *
     * @method filter
     * @param {Object} startDate
     * @param {Object} endDate
     */
    filter: function(startDate, endDate) {
      for ( var i = 0; i < filterables.length; i++ ) {
        filterables[i].filterRange([ startDate, endDate ])
      }
    }
  };
});
