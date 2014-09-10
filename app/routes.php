<?php

// Method level
Route::get('teachers/{id}', 'TeacherController@getView');
Route::get('schools/{id}', 'SchoolController@getView');
Route::get('schools/search/{name}', 'SchoolController@getSearch');

// Controller level
Route::controller('users', 'UserController');
Route::controller('teachers', 'TeacherController');
Route::controller('schools', 'SchoolController');
Route::controller('ratings', 'RatingController');
Route::controller('admin', 'AdminController');

Route::filter('pattern: admin/*', 'auth');
