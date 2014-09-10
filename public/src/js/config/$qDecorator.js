// Decorator for $q
// Will add success() and error() methods to $q promises, to make them available like $http promises
dengodeprofessor.config(['$provide', function ($provide) {
  'use strict';
  $provide.decorator('$q', ['$delegate', function ($delegate) {
    var defer = $delegate.defer;
    $delegate.defer = function () {
      var deferred = defer();
      deferred.promise.success = function (fn) {
        deferred.promise.then(function (value) {
          fn(value);
        });
        return deferred.promise;
      };
      deferred.promise.error = function (fn) {
        deferred.promise.then(null, function (value) {
          fn(value);
        });
        return deferred.promise;
      };
      return deferred;
    };
    return $delegate;
  }]);
}]);
