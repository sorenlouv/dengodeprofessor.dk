dengodeprofessor.controller('viewSchools', [
  '$scope',
  'schoolService',
  'growl',
  function($scope, schoolService, growl){
    'use strict';

    growl.success('This adds a success message <a href="/#/login">Login</a>');

    schoolService.getAll().success(function(schools) {
      $scope.schools = schools;
    });

}]);
