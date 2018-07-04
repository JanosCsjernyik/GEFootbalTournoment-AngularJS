'use strict';




angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])
.controller('View1Ctrl', ['$scope', 'players', 'teams', function( $scope, players, teams ) {
    teams.getTeams().then(function(teams){
      $scope.teams = teams;
    })
}]);