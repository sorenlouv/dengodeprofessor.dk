dengodeprofessor.controller('viewTeacher', [
  '$scope',
  '$routeParams',
  'teacherService',
  'ratingService',
  'facebookService',
  function($scope, $routeParams, teacherService, ratingService, facebookService){
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

    $scope.maxScore = 10;
    $scope.isLoggedIn = false;

    $scope.hoveringOver = function(value) {
      $scope.overStar = value;
      $scope.percent = 100 * (value / $scope.maxScore);
    };

    // Current user's score of teacher
    facebookService.loggedInReady.success(function() {
      $scope.isLoggedIn = true;

      ratingService.getScore(teacherId).success(function(score) {
        $scope.score = score;
      });
    });

}]);
