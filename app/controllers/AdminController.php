<?php

class AdminController extends BaseController {

  public function postApproveTeacher()
  {
    $teachers = Teacher::all();
    return $teachers;
  }

}
