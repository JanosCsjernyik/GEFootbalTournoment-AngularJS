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

    $scope.matches = [];
    var promise;

    playersService.getPlayers().get(function(playersJson){

      const teams = [];
      for(let name of $scope.teamNames) {
        let randomTeam = { teamName:name , players:[], goalsShot: 0 };
        teams.push(randomTeam);
      }

      $scope.fillTeamsWithPlayers(teams,playersJson);
      $scope.teams = $scope.teamNames;
      $scope.disableButton = false;
      $scope.gameState = "stopped";
      $scope.button = "Start Game";

      $scope.controlGame = function() {
        if ($scope.gameState === "stopped") {
          if ($scope.matches.length === 0) {
            $scope.matches.push($scope.generatePairs(teams));
          }
          $scope.gameState = "run";
          promise = $interval($scope.generateMatches, 300);
          $scope.button = "Stop Game";
        } else { 
          $scope.button = "Start Game";
          $scope.gameState = "stopped";
          $interval.cancel(promise);
        }
      }

      $scope.resetGame = function() {
        $scope.winner = null;
        $scope.matches.length = 0;

        for(let name of $scope.teamNames){
          let randomTeam = { teamName:name , players:[], goalsShot: 0 };
          teams.push(randomTeam);
        }
        $scope.fillTeamsWithPlayers(teams,playersJson);
        $scope.disableButton = false;
        $scope.gameState = "stopped";
        $scope.button = "Start Game";
      }
    });


    $scope.fillTeamsWithPlayers = function(teams, playersJson) {
      var helperIndex = 0;
      for (let i = 0; i < teams.length; i++){
        for(let y = 0; y < 11; y++){
          teams[i].players.push(playersJson.results[helperIndex].name.first + " " + playersJson.results[helperIndex].name.last);
          helperIndex++;
        }
      }
    }

    $scope.generatePairs = function(teams) {
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
          $scope.setGoals(team1, team2);
          teamPairs.push(addToPairs);
      }
      return teamPairs;
  }

  $scope.setGoals = function(team1, team2) {
    team1.goalsShot = $scope.getRandomInt(0, 10);
    team2.goalsShot = $scope.getRandomInt(0, 10);
    while(team1.goalsShot === team2.goalsShot){
        team1.goalsShot = $scope.getRandomInt(0, 10);
    }
  }


  $scope.pickWinnersFromMatches = function(match){
    if(match.team1.goalsShot > match.team2.goalsShot){
      return match.team1;
    }
    return match.team2;
  }

  $scope.getRandomInt = function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  $scope.generateMatches = function() {
    if ($scope.matches.length === 4){
      let winner = $scope.pickWinnersFromMatches($scope.matches[3][0]).teamName;
      let winnerObject = {
        team1 : winner
      }
      $interval.cancel(promise);
      $scope.disableButton = true;
      return;
    }

    var arrayOfWinners = [];
    for (let teamPair of $scope.matches[$scope.matches.length - 1]){
      let winner = Object.assign({}, $scope.pickWinnersFromMatches(teamPair));
      arrayOfWinners.push(winner);
    }
    var nextRound = [];
    while (arrayOfWinners.length) {
      var team1 = arrayOfWinners.shift(),
          team2 = arrayOfWinners.shift();
          $scope.setGoals(team1,team2);
      let newMatch = {
        team1 : team1,
        team2 : team2
      };
      nextRound.push(newMatch);  
    }
    $scope.matches.push(nextRound)    
    $scope.teamPairs = $scope.matches;
  }
}]);