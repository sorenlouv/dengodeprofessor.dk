dengodeprofessor.service('ratingService', [
  '$http',
  function ($http) {
    'use strict';

    this.getAll = function() {
      return $http.get('/ratings');
    };

    this.add = function(score, teacherId) {
      return $http.post('/ratings/add', {
        teacher_id: teacherId,
        score: score
      });
    };

}]);
