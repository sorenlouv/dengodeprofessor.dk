dengodeprofessor.service('schoolService', [
  '$http',
  function ($http) {
    'use strict';

    this.getAll = function() {
      return $http.get('/schools');
    };

    this.getOne = function(schoolId) {
      return $http.get('/school/' + schoolId);
    };

    this.search = function(schoolName) {
      return $http.get('/schools/search/' + schoolName);
    };

}]);
