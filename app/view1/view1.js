'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])
.controller('View1Ctrl', ['$scope', 'teamsService', function( $scope, teamsService ) {
    teamsService.getTeams().then(function(teams){
    $scope.teams = teams;
     $scope.teamPairs = $scope.generatePairs(teams);
      console.log("len of scope teams: ", teams.length);
     /* $scope.teamPairs = $interval(function generateTeamPairs() {
  
      }, 5000, 4) */ 
    })

    /*teams.getTeams().then(function(teams){
      console.log("teams: ",teams);
      $scope.teamPairs = generatePairs(teams);
      console.log("teamPairs: ", $scope.teamPairs);
    }) */

    $scope.generatePairs = function(teams) {
      console.log("generate in generatePairs: ", teams);
      let arr1 = teams;
      console.log("arr1: ",arr1);
      let teamPairs = [];
      arr1.sort(function() { return 0.5 - Math.random();});
      console.log("arr1 shuffeled: ", arr1); // shuffle arrays
      console.log("arr1: ", arr1 ," arr1.len: " ,arr1.length);
      while (arr1.length) {
          console.log("while");
          var team1 = arr1.pop(),
              team2 = arr1.pop();
        
          let addToPairs = [team1, team2];
          teamPairs.push(addToPairs);
      }
      console.log("teamPairs end of the function: ", teamPairs);
      return teamPairs;
  } 
}]);