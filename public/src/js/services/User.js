dengodeprofessor.service('userService', [
  '$http',
  function ($http) {
    'use strict';

    this.getAll = function() {
      return $http.get('/users');
    };

    this.login = function() {
      return $http.post('/users/login');
    };

}]);
