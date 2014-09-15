dengodeprofessor.config(['$routeProvider', function ($routeProvider) {
  'use strict';

  $routeProvider.
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
