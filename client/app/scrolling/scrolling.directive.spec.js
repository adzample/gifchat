'use strict';

describe('Directive: scrolling', function () {

  // load the directive's module
  beforeEach(module('gifchatApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<scrolling></scrolling>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the scrolling directive');
  }));
});