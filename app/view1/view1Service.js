'use strict';

var teamNames = ["Franciaország", 'Argentína', "Uruguay", "Portugália", "Spanyolország", "Oroszország", 
            "Horvátország", "Dánia", "Brazília", "Mexikó", "Belgium", "Japán", "Svédország", "Svájc",
             "Kolumbia", "Anglia"];

var view1ServiceModule = angular.module('view1ServiceModule', ['ngResource']);


view1ServiceModule.service('playersService', ['$resource',
  function($resource){
    var getPlayers = function() {
      return $resource('https://randomuser.me/api/?results=176', {
          query: {method:'GET'}
      });
    }
    return {
      getPlayers : getPlayers
    }
  }]);


  view1ServiceModule.service('teamsService', ['playersService', function(playersService) {
    var getTeams = function(){
      var teams = [];
      return new Promise(function(resolve){
        playersService.getPlayers().get().$promise.then(function(playersJson){
          for(let name of teamNames){
            let randomTeam = { teamName:name , players:[], goalsShot: 0 };
            teams.push(randomTeam);
          }
          fillTeamsWithPlayers(teams,playersJson);
          resolve(teams);
        });
      })
    }
    return {
      getTeams : getTeams
    }
  }])

function fillTeamsWithPlayers(teams, playersJson){
  var helperIndex = 0;
  for (let i = 0; i < teams.length; i++){
    for(let y = 0; y < 11; y++){
      teams[i].players.push(playersJson.results[helperIndex].name.first + " " + playersJson.results[helperIndex].name.last);
      helperIndex++;
    }
  }
}
