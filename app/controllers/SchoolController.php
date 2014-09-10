<?php

class SchoolController extends BaseController {

  public function getIndex()
  {
    $schools = School::all();
    return $schools;
  }

  public function getSearch($school_name)
  {

    $schools = DB::table('schools')
    	->where('name', 'LIKE', '%'. $school_name .'%')
    	->get();

    return $schools;
  }
}
