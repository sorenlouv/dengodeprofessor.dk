dengodeprofessor.controller('addTeacher', [
  '$scope',
  '$timeout',
  'teacherService',
  'schoolService',
  '$http',
  function($scope, $timeout, teacherService, schoolService){
    'use strict';

    schoolService.getAll().success(function(schools) {
      $scope.schools = schools;
    });

    $scope.addTeacher = function() {
      teacherService.add($scope.teacher).success(function() {

      });
    };
}]);
