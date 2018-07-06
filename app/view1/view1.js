'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])
.controller('View1Ctrl', ['$scope','playersService','$interval', function( $scope, playersService, $interval ) {
    $scope.teamNames = ["Franciaország", 'Argentína', "Uruguay", "Portugália", "Spanyolország", "Oroszország", 
    "Horvátország", "Dánia", "Brazília", "Mexikó", "Belgium", "Japán", "Svédország", "Svájc",
    "Kolumbia", "Anglia"];

    $scope.matchups = [];

    playersService.getPlayers().get(function(playersJson){
      var teams = [];
      for(let name of $scope.teamNames){
        let randomTeam = { teamName:name , players:[], goalsShot: 0 };
        teams.push(randomTeam);
      }
      fillTeamsWithPlayers(teams,playersJson);
      $scope.teams = $scope.teamNames;
      $scope.matchups.push(generatePairs(teams));
      console.log("$scope.matchups: ", $scope.matchups, "len:", $scope.matchups.length);
      $scope.teamPairs = $interval(generateMatchups(), 3000);
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
      var helperIndex = 0;
      while (arr1.length) {
          var team1 = arr1.pop(),
              team2 = arr1.pop();
          let addToPairs = {
            team1 : team1,
            team2 : team2
          };
          team1.goalsShot = getRandomInt(0, 10);
          team2.goalsShot = getRandomInt(0, 10);
          while(team1.goalsShot == team2.goalsShot){
              team1.goalsShot = getRandomInt(0, 10);
          }
          teamPairs.push(addToPairs);
      }
      console.log("teamPairs end of the function: ", teamPairs);
      return teamPairs;
  }


  function pickWinnersFromMatches(match){
    if(match.team1.goalsShot > match.team2.goalsShot){
      return match.team1;
    }
    return match.team2;
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function generateMatchups() {
    console.log('$scope.matchups: ', $scope.matchups, 'len: ', $scope.matchups.length);
    if ($scope.matchups.length === 3){
      let winner = pickWinnersFromMatches($scope.matchups[$scope.matchups.length - 1]);
      $scope.matchups.push([winner]);
      return $scope.matchups;
    }
    var arrayOfWinners = [];
    for (let teamPair of $scope.matchups[$scope.matchups.length - 1]){
      let winner = pickWinnersFromMatches(teamPair);
      arrayOfWinners.push(winner);
    }
    var nextRound = [];
    while (arrayOfWinners.length) {
      var team1 = arrayOfWinners.pop(),
          team2 = arrayOfWinners.pop();
      let newMatch = {
        team1 : team1,
        team2 : team2
      };
      nextRound.push(newMatch);  
    }
    $scope.matchups.push(nextRound)
    return $scope.matchups;
  }
}]);