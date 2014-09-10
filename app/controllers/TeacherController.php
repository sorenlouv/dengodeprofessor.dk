<?php

class TeacherController extends BaseController {

  public function getIndex()
  {
    $teachers = Teacher::all();
    return $teachers;
  }

  public function getView($id)
  {
    $teacher = Teacher::find($id);
    $ratings = $teacher->ratings();

    $teacher->score = $ratings->avg('score');
    $teacher->ratings_count = $ratings->count();

    return $teacher;
  }

  public function postAdd()
  {
    $teacher = new Teacher;
    $teacher->name = Input::get('name');
    $teacher->school_id = Input::get('school_id');
    $teacher->save();

    return $teacher;
  }
}
