<?php

// Controller level
Route::controller('users', 'UserController');
Route::controller('teachers', 'TeacherController');
Route::controller('schools', 'SchoolController');
Route::controller('ratings', 'RatingController');
Route::controller('admin', 'AdminController');

Route::filter('pattern: admin/*', 'auth');
