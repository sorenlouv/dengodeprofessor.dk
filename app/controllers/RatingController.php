<?php

class RatingController extends BaseController {

  public function getIndex()
  {
    $ratings = Rating::all();
    return $ratings;
  }

  public function postAdd()
  {
    $user_id = Auth::id();
    if(!$user_id){
      return Response::make('Unauthorized', 401);
    }

    $rating = Rating::firstOrNew(array(
      'user_id' => $user_id,
      'teacher_id' => Input::get('teacher_id')
    ));

    $rating->score = Input::get('score');
    $rating->save();

    return $rating;
  }
}
