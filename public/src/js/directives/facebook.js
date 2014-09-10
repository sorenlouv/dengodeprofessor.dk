angular.module('facebookDirective', []).directive('facebook', [
  function() {
  'use strict';
  return {
    restrict: 'E',
    require: 'facebook',

    controller: ['$scope', '$timeout', 'facebookService', function($scope, $timeout, facebookService) {
      var timeoutSeconds = 15;

      // Abort with error if Facebook SDK has not been loaded after 15 seconds
      var promiseTimeout = $timeout(function() {
        facebookService.rejectSdkDefer('facebook:timeout', 'Timed out loading Facebook SDK after ' + timeoutSeconds + ' seconds');
      }, timeoutSeconds * 1000);

      $scope.onSdkLoaded = function() {
        // Remove timeout
        $timeout.cancel(promiseTimeout);

        // Executed when login status is ready
        FB.getLoginStatus(function(response) {
          console.log('FB: SDK loaded');
          facebookService.resolveSdkDefer(response);
        });

        // Executed when auth status changes
        FB.Event.subscribe('auth.statusChange', function(response) {
          console.log('FB: Auth status change: "' + response.status + '"');
          facebookService.onAuthChange(response);
        });
      };

      // Load the SDK Asynchronously
      (function(d, s, id){
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement(s); js.id = id;
         js.src = '//connect.facebook.net/en_US/sdk.js';
         fjs.parentNode.insertBefore(js, fjs);
       }(document, 'script', 'facebook-jssdk'));

    }],


    link: function($scope, $element, $attrs) {
      // add fb-root to document
      $element.after('<div id="fb-root"></div>');

      // Set attributes
      if (!$attrs.appId) {
        throw ('Missing app-id');
      }

      // fbAsyncInit is run as soon as the SDK is loaded
      window.fbAsyncInit = function() {

        FB.init({
          appId: $attrs.appId, // App ID
          channelUrl: $attrs.channelUrl || 'channel.php',
          status: $attrs.status || false, // check login status
          cookie: true, // enable cookies to allow the server to access the session
          version: 'v2.0'
        });

        $scope.onSdkLoaded();
      };
    }
  };
}]);
