'use strict';

var teamNames = ["Franciaország", 'Argentína', "Uruguay", "Portugália", "Spanyolország", "Oroszország", 
            "Horvátország", "Dánia", "Brazília", "Mexikó", "Belgium", "Japán", "Svédország", "Svájc",
             "Kolumbia", "Anglia"];

var view1Service = angular.module('view1Service', ['ngResource']);


view1Service.factory('playersService', ['$resource',
  function($resource){
    return $resource('https://randomuser.me/api/?results=176', {
      query: {method:'GET'}
    });
  }]);


  view1Service.factory('teamsService', ['playersService','$q', function(playersService, $q) {
    return {
      getTeams : function(){
        //var deferred = $q.defer();
        var teams = [];
        playersService.get(function(playersJson){
          for(let name of teamNames){
            let winningChance = getRandomInt(0, 100);
            let randomTeam = { teamName:name , players:[], winningChance: winningChance, goalsShot: 0 };
            teams.push(randomTeam);
          }
          fillTeamsWithPlayers(teams,playersJson);
          deferred.resolve(teams);
        });
        return $q.when(teams);
      }
    }
  }])


function generateTeams(arrayOfteams){
  for(let name of teamNames){
    let winningChance = getRandomInt(0, 100);
    let randomTeam = { teamName:name , players:[], winningChance: winningChance, goalsShot: 0 };
    teams.push(randomTeam);
  }
}

function fillTeamsWithPlayers(teams, playersJson){
  var helperIndex = 0;
  for (let i = 0; i < teams.length; i++){
    for(let y = 0; y < 11; y++){
      teams[i].players.push(playersJson.results[helperIndex].name.first + " " + playersJson.results[helperIndex].name.last);
      helperIndex++;
    }
  }
}

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
