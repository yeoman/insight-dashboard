'use strict';

describe('Directive: barChart', function() {
  beforeEach(module('insightDashboardApp'));

  var element;

  it('should make hidden element visible', inject(function($rootScope, $compile) {
    element = angular.element('<bar-chart></bar-chart>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the barChart directive');
  }));
});
