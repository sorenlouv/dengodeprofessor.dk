dengodeprofessor.controller('viewTeachers', [
  '$scope',
  'teacherService',
  function($scope, teacherService){
    'use strict';

    teacherService.getAll().success(function(teachers) {
      $scope.teachers = teachers;
    });

}]);
