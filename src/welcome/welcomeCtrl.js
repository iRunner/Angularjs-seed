/**
 * This is an example controller.
 * It triggers the UserdataService and puts the returned value on the scope
 *
 * @see services
 */
var controllers = angular.module('ExampleApp.controllers', [])
    .controller('ExampleController', function ($scope, UserdataService) {
        $scope.phone_number="";

    });
