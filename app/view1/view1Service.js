'use strict';
var view1ServiceModule = angular.module('view1ServiceModule', ['ngResource']);

view1ServiceModule.service('playersService', ['$resource',
  function($resource){
    let getPlayers = function() {
      return $resource('https://randomuser.me/api/?results=176', {
          query: {method:'GET'}
      });
    };
    return {
      getPlayers : getPlayers
    }
  }]);

view1ServiceModule.service('teamService', [
    function () {
        let getTeamNames = function () {
            let teamNames = ["Franciaország", 'Argentína', "Uruguay", "Portugália", "Spanyolország", "Oroszország",
                "Horvátország", "Dánia", "Brazília", "Mexikó", "Belgium", "Japán", "Svédország", "Svájc",
                "Kolumbia", "Anglia"];
            return teamNames;
        };
        let generateTeamObjects = function () {
            const teams = [];
            for(let name of getTeamNames()) {
                let randomTeam = { teamName:name , players:[], goalsShot: 0 };
                teams.push(randomTeam);
            }
            return teams;
        };
        return {
            getTeamNames : getTeamNames,
            generateTeamObjects : generateTeamObjects
        }
}]);

view1ServiceModule.service('logicService', [
    function () {
        let getRandomInt = function () {
            let min = 0;
            let max = 10;
            return Math.floor(Math.random() * (max - min)) + min;
        };
        let pickWinner = function (match) {
            if(match.team1.goalsShot > match.team2.goalsShot){
                return match.team1;
            }
            return match.team2;
        };
        let setGoals = function(team1, team2) {
            team1.goalsShot = getRandomInt();
            team2.goalsShot = getRandomInt();
            while(team1.goalsShot === team2.goalsShot){
                team1.goalsShot = getRandomInt();
            }
        };
        let generatePairs = function(teams) {
            let arr1 = teams;
            let teamPairs = [];
            arr1.sort(()=>  0.5 - Math.random());
            while (arr1.length) {
                let team1 = arr1.pop(),
                    team2 = arr1.pop();
                let addToPairs = {
                    team1 : team1,
                    team2 : team2
                };
                setGoals(team1, team2);
                teamPairs.push(addToPairs);
            }
            return teamPairs;
            };
        let fillTeamsWithPlayers = function(teams, playersJson) {
            let helperIndex = 0;
            for (let i = 0; i < teams.length; i++){
                for(let y = 0; y < 11; y++){
                    teams[i].players.push(playersJson.results[helperIndex].name.first + " " + playersJson.results[helperIndex].name.last);
                    helperIndex++;
                }
            }
        };
        return{
            fillTeamsWithPlayers : fillTeamsWithPlayers,
            generatePairs : generatePairs,
            pickWinner : pickWinner,
            setGoals : setGoals
        }
}]);