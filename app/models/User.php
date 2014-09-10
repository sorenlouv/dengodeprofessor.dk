<?php

use Illuminate\Auth\UserTrait;
use Illuminate\Auth\UserInterface;

class User extends Eloquent implements UserInterface {

	use UserTrait;

	// Fields that can be updated
  protected $fillable = array('id');

  public function ratings()
  {
       return $this->hasMany('Rating');
  }

}
