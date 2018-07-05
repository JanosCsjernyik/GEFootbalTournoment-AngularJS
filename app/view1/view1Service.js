'use strict';
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