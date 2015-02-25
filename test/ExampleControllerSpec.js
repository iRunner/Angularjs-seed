describe('ExampleController', function() {
    var scope, controller, httpBackend;

    // Initialization of the AngularJS application before each test case
    beforeEach(module('ExampleApp'));

    // Injection of dependencies, $http will be mocked with $httpBackend
    beforeEach(inject(function($rootScope, $controller, $httpBackend) {
        scope = $rootScope;
        controller = $controller;
        httpBackend = $httpBackend;
    }));
    
    it('should work', function() {

        // We expect the controller to put the right value onto the scope
        expect('First User').toEqual('First User');

    });


});
