dengodeprofessor.controller('login', [
  '$scope',
  'facebookService',
  'userService',
  function($scope, facebook, userService){
  'use strict';

  facebook.loggedInReady.success(function() {
    $scope.isLoggedIn = true;
    userService.login().success(function(user) {
      console.log(user);
    });
  });

  facebook.sdkReady.success(function() {
    $scope.isSdkReady = true;
  });

  $scope.login = function() {
    facebook.login('');
  };
}]);
