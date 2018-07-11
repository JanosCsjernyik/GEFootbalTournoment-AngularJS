'use strict';

angular.module('myApp.groupDirective',[]).directive('group', [function(){
    return {
        restrict : 'E',
        scope : {
            pair : "="
        },
        templateUrl : "view1/groupDirective.html"
    }
}])