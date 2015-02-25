welcome = angular.module('Welcome.Controllers', []);

welcome.controller('WelcomeCtrl', ['$scope', function($scope) {
      $scope.greeting = 'Welcome!';
}]);

