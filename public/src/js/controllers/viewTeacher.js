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
      $scope.overStar = null;
      ratingService.add(score, teacherId).success(function() {
      });
    };

    // Current user's score of teacher
    ratingService.getScore(teacherId).success(function(score) {
      $scope.score = score;
    });

    $scope.maxScore = 10;
    $scope.isReadonly = false;

    $scope.hoveringOver = function(value) {
      $scope.overStar = value;
      $scope.percent = 100 * (value / $scope.maxScore);
    };

}]);
