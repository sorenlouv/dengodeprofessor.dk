dengodeprofessor.controller('viewTeacher', [
  '$scope',
  '$routeParams',
  'teacherService',
  'ratingService',
  function($scope, $routeParams, teacherService, ratingService){
    'use strict';

    var teacherId = $routeParams.teacherId;
    teacherService.getOne(teacherId).success(function(teacher) {
      $scope.teacher = teacher;
    });

    $scope.addRating = function(score) {
      ratingService.add(score, teacherId).success(function() {
        window.alert('done');
      });
    };


}]);
