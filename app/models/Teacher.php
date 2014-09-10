<?php

class Teacher extends Eloquent {

  protected $fillable = array('school_id', 'name');

  public function ratings()
  {
       return $this->hasMany('Rating');
  }

}
