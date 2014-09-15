dengodeprofessor.config(['$httpProvider', function ($httpProvider) {
  'use strict';

  var interceptor = [
    '$q',
    'growl',
    'facebookService',
    function($q, growl, facebookService) {

      function success(response) {
        return response;
      }

      function error(response) {
        if (response.status === 401) {
          growl.warning('<a href="/#/login">Log ind</a> for at gennemføre handlingen');
        }
        return $q.reject(response);
      }

      return function(promise) {
        return promise.then(success, error);
      };

    }
  ];
  $httpProvider.responseInterceptors.push(interceptor);
}]);
