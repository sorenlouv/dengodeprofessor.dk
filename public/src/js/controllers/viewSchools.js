dengodeprofessor.controller('viewSchools', [
  '$scope',
  'schoolService',
  function($scope, schoolService){
    'use strict';

    schoolService.getAll().success(function(schools) {
      $scope.schools = schools;
    });

}]);
