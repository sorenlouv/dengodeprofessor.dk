dengodeprofessor.factory('facebookService', ['$q',
  function($q) {
    'use strict';
    var sdkDefer = $q.defer();
    var loginDefer = $q.defer();

    var facebook = {
      sdkReady: sdkDefer.promise,
      loggedInReady: loginDefer.promise
    };

    facebook.login = function(scope, callback) {
      scope = scope || '';
      FB.login(callback, { scope: scope });
    };

    facebook.resolveSdkDefer = function(value) {
      sdkDefer.resolve(value);
    };

    facebook.rejectSdkDefer = function(reason) {
      sdkDefer.reject(reason);
    };

    // Facebook login status changed (login or logout)
    facebook.onAuthChange = function(auth) {
      if (auth.status === 'connected') {
        loginDefer.resolve(auth);
      }
    };

    return facebook;
  }
]);
