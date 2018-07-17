'use strict';

// Declare app level module which depends on views, and components
var tournament = angular.module('myApp', [
    'myApp.view1',
    'myApp.view2',
    'myApp.version',
    'view1ServiceModule',
    'myApp.groupDirective',
    'ngAnimate'
]);


tournament.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
