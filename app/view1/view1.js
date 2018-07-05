'use strict';

var teamNames = ["Franciaország", 'Argentína', "Uruguay", "Portugália", "Spanyolország", "Oroszország", 
            "Horvátország", "Dánia", "Brazília", "Mexikó", "Belgium", "Japán", "Svédország", "Svájc",
             "Kolumbia", "Anglia"];



angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])
.controller('View1Ctrl', ['$scope','playersService', function( $scope, playersService ) {

    playersService.getPlayers().get(function(playersJson){
      var teams = [];
      for(let name of teamNames){
        let randomTeam = { teamName:name , players:[], goalsShot: 0 };
        teams.push(randomTeam);
      }
      fillTeamsWithPlayers(teams,playersJson);
      $scope.teams = teamNames;
      $scope.teamPairs = generatePairs(teams);
      
    })
    
    function fillTeamsWithPlayers(teams, playersJson){
      var helperIndex = 0;
      for (let i = 0; i < teams.length; i++){
        for(let y = 0; y < 11; y++){
          teams[i].players.push(playersJson.results[helperIndex].name.first + " " + playersJson.results[helperIndex].name.last);
          helperIndex++;
        }
      }
    }

    function generatePairs (teams) {
      let arr1 = teams;
      let teamPairs = [];
      arr1.sort(function() { return 0.5 - Math.random();}); // shuffle arrays
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