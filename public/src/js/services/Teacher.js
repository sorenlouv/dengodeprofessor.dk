dengodeprofessor.service('teacherService', [
  '$http',
  function ($http) {
    'use strict';

    this.getAll = function() {
      return $http.get('/teachers');
    };

    this.getOne = function(teacherId) {
      return $http.get('/teachers/view/' + teacherId);
    };

    this.add = function(teacher) {
      return $http.post('/teachers/add', teacher);
    };

}]);
