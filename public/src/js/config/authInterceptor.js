dengodeprofessor.config(['$httpProvider', function ($httpProvider) {
  'use strict';

  var interceptor = [
    '$q',
    function($q) {

      function success(response) {
        return response;
      }

      function error(response) {
        if (response.status === 401) {
          window.location = '/#/login';
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
