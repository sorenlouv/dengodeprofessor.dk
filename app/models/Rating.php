<?php

class Rating extends Eloquent {

  protected $fillable = array('user_id', 'teacher_id', 'score');

}
