var dengodeprofessor = angular.module('dengodeprofessor',
    ['ngRoute', 'facebookDirective', 'safeApply', 'ui.bootstrap']);

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

dengodeprofessor.config(['$routeProvider', function ($routeProvider) {
  'use strict';

  $routeProvider.
  // when('/home', {
  //   templateUrl: 'templates/home.html',
  //   controller: 'home'
  // }).
  when('/login', {
    templateUrl: 'templates/login.html',
    controller: 'login'
  }).

  // Schools
  when('/schools', {
    templateUrl: 'templates/view-schools.html',
    controller: 'viewSchools'
  }).
  when('/schools/:schoolId', {
    templateUrl: 'templates/view-school.html',
    controller: 'viewSchool'
  }).

  // Teacher
  when('/teachers', {
    templateUrl: 'templates/view-teachers.html',
    controller: 'viewTeachers'
  }).
  when('/teachers/:teacherId', {
    templateUrl: 'templates/view-teacher.html',
    controller: 'viewTeacher'
  }).
  when('/add-teacher', {
    templateUrl: 'templates/add-teacher.html',
    controller: 'addTeacher'
  }).

  otherwise({
    redirectTo: '/schools/1'
  });
}]);

dengodeprofessor.controller('addTeacher', [
  '$scope',
  '$timeout',
  'teacherService',
  'schoolService',
  '$http',
  function($scope, $timeout, teacherService, schoolService){
    'use strict';

    schoolService.getAll().success(function(schools) {
      $scope.schools = schools;
    });

    $scope.addTeacher = function() {
      teacherService.add($scope.teacher).success(function() {

      });
    };
}]);

dengodeprofessor.controller('home', [
  '$scope',
  function($scope){
  'use strict';

}]);

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

dengodeprofessor.controller('viewSchool', [
  '$scope',
  '$routeParams',
  'schoolService',
  function($scope, $routeParams, schoolService){
    'use strict';

    var schoolId = $routeParams.schoolId;
    schoolService.getOne(schoolId).success(function(school) {
      $scope.school = school;
    });

}]);

dengodeprofessor.controller('viewSchools', [
  '$scope',
  'schoolService',
  function($scope, schoolService){
    'use strict';

    schoolService.getAll().success(function(schools) {
      $scope.schools = schools;
    });

}]);

dengodeprofessor.controller('viewTeacher', [
  '$scope',
  '$routeParams',
  'teacherService',
  'ratingService',
  'facebookService',
  function($scope, $routeParams, teacherService, ratingService, facebookService){
    'use strict';

    var teacherId = $routeParams.teacherId;
    teacherService.getOne(teacherId).success(function(teacher) {
      $scope.teacher = teacher;
    });

    $scope.addRating = function(score) {
      $scope.overStar = null;
      ratingService.add(score, teacherId).success(function() {
      });
    };

    $scope.maxScore = 10;
    $scope.isLoggedIn = false;

    $scope.hoveringOver = function(value) {
      $scope.overStar = value;
      $scope.percent = 100 * (value / $scope.maxScore);
    };

    // Current user's score of teacher
    facebookService.loggedInReady.success(function() {
      $scope.isLoggedIn = true;

      ratingService.getScore(teacherId).success(function(score) {
        $scope.score = score;
      });
    });

}]);

dengodeprofessor.controller('viewTeachers', [
  '$scope',
  'teacherService',
  function($scope, teacherService){
    'use strict';

    teacherService.getAll().success(function(teachers) {
      $scope.teachers = teachers;
    });

}]);

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

dengodeprofessor.service('ratingService', [
  '$http',
  function ($http) {
    'use strict';

    this.getAll = function() {
      return $http.get('/ratings');
    };

    this.add = function(score, teacherId) {
      return $http.post('/ratings/add', {
        teacher_id: teacherId,
        score: score
      });
    };

    this.getScore = function(teacherId) {
      return $http.get('/ratings/score-by-teacher-id/' + teacherId);
    };

}]);

dengodeprofessor.service('schoolService', [
  '$http',
  function ($http) {
    'use strict';

    this.getAll = function() {
      return $http.get('/schools');
    };

    this.getOne = function(schoolId) {
      return $http.get('/schools/view/' + schoolId);
    };

    this.search = function(schoolName) {
      return $http.get('/schools/search/' + schoolName);
    };

}]);

dengodeprofessor.service('teacherService', [
  '$http',
  function ($http) {
    'use strict';

    this.getAll = function() {
      return $http.get('/teachers');
    };

    this.getOne = function(teacherId) {
      return $http.get('/teachers/view/' + teacherId);
    };

    this.add = function(teacher) {
      return $http.post('/teachers/add', teacher);
    };

}]);

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

angular.module('safeApply', []).factory('safeApply', ['$rootScope', function($rootScope) {
    'use strict';

    return function($scope, fn) {
        var phase = $scope.$root.$$phase;
        if (phase == '$apply' || phase == '$digest') {
            if (fn) {
                $scope.$eval(fn);
            }
        } else {
            if (fn) {
                $scope.$apply(fn);
            } else {
                $scope.$apply();
            }
        }
    };
}]);
