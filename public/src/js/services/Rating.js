dengodeprofessor.service('ratingService', [
  '$http',
  function ($http) {
    'use strict';

    this.getAll = function() {
      return $http.get('/ratings');
    };

    this.getOne = function(teacherId) {
      return $http.get('/rating/' + teacherId);
    };

    this.add = function(score, teacherId) {
      return $http.post('/ratings/add', {
        teacher_id: teacherId,
        score: score
      });
    };

}]);