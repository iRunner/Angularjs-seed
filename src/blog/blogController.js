blog = angular.module('Blog.Controllers', []);

blog.controller('BlogCtrl', ['$scope', function($scope) {
      $scope.greeting = 'Blog!';
}]);

