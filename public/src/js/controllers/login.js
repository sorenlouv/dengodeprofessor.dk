dengodeprofessor.controller('login', [
  '$scope',
  'facebookService',
  'userService',
  function($scope, facebookService, userService){
  'use strict';

  facebookService.loggedInReady.success(function() {
    $scope.isLoggedIn = true;
    userService.login().success(function(user) {
      console.log(user);
    });
  });

  facebookService.sdkReady.success(function() {
    $scope.isSdkReady = true;
  });

  $scope.login = function() {
    facebookService.login('');
  };
}]);
