/**
 * Setup of main AngularJS application, with Restangular being defined as a dependency.
 *
 * @see controllers
 * @see services
 */
var app = angular.module('ExampleApp',
    [   
        'ui.router',
        'Welcome.Controllers',
        'Blog.Controllers'
    ]   
);

app.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state('welcome', {
            url: '/',
            templateUrl:'templates/welcome.tpl.html',
            controller: 'WelcomeCtrl'
        })
        
        .state('blog', {
            url:'/blog',
            templateUrl:'templates/blog.tpl.html',
            controller:'BlogCtrl'
        });

});

