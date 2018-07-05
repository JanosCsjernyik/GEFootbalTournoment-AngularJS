'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])
.controller('View1Ctrl', ['$scope', 'teamsService', function( $scope, teamsService ) {
    $scope.teams = null;
    teamsService.getTeams().then(function(teams){
      $scope.teams = teams;
      $scope.team = teams[0];
      console.log("scopeTeams:", $scope.teams)
      console.log("len of scope teams: ", teams.length);
      console.log("scope team: ",$scope.team);
      $scope.$watch('team', function(newValue){
        console.log(newValue);
      })
     /* $scope.teamPairs = $interval(function generateTeamPairs() {
  
      }, 5000, 4) */ 
    })

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