dengodeprofessor.controller('viewSchool', [
  '$scope',
  '$routeParams',
  'schoolService',
  function($scope, $routeParams, schoolService){
    'use strict';

    var schoolId = $routeParams.schoolId;
    schoolService.getOne(schoolId).success(function(school) {
      $scope.school = school;
    });

}]);
