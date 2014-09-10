<?php

class School extends Eloquent {

  protected $fillable = array('name');

  public function teachers()
  {
       return $this->hasMany('Teacher');
  }

}
