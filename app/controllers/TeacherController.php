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
    $teacher->score = $teacher->ratings()->avg('score');
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
