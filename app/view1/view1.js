'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])
.controller('View1Ctrl', ['$scope','$interval', 'playersService', 'teamService', 'logicService', function( $scope, $interval, playersService,  teamService, logicService ) {
    $scope.teamNames = teamService.getTeamNames();
    $scope.matches = [];
    let promise;

    playersService.getPlayers().get(function(playersJson){
        let teams = teamService.generateTeamObjects();
        $scope.initGame(teams, playersJson);
        $scope.controlGame = function() {
            if ($scope.gameState === "stopped") {
                if ($scope.matches.length === 0) {
                    $scope.matches.push(logicService.generatePairs(teams));
                }
                $scope.gameState = "run";
                promise = $interval($scope.generateMatches, 3000);
                $scope.button = "Stop Game";
            } else {
                $scope.button = "Start Game";
                $scope.gameState = "stopped";
                $interval.cancel(promise);
            }
        };
        $scope.resetGame = function () {
            $scope.winner = null;
            $scope.matches.length = 0;
            teams = teamService.generateTeamObjects();
            $scope.initGame(teams, playersJson);
        }
    });

    $scope.initGame = function (teams, playersJson) {
        logicService.fillTeamsWithPlayers(teams, playersJson);
        $scope.teams = $scope.teamNames;
        $scope.disableButton = false;
        $scope.gameState = "stopped";
        $scope.button = "Start Game";
    };

    $scope.generateMatches = function () {
    if ($scope.matches.length === 4){
      $interval.cancel(promise);
      $scope.disableButton = true;
      return;
    }
    let arrayOfWinners = [];
    for (let teamPair of $scope.matches[$scope.matches.length - 1]){
        let winner = Object.assign({}, logicService.pickWinner(teamPair));
        arrayOfWinners.push(winner);
    }
    let nextRound = [];
    while (arrayOfWinners.length) {
        let team1 = arrayOfWinners.shift(),
            team2 = arrayOfWinners.shift();
        logicService.setGoals(team1,team2);
        let newMatch = {
        team1 : team1,
        team2 : team2
        };
        nextRound.push(newMatch);
    }
    $scope.matches.push(nextRound);
    $scope.teamPairs = $scope.matches;
  }
}]);