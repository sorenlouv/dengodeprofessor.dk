<?php

use Facebook\FacebookRequest;
use Facebook\FacebookSession;
use Facebook\FacebookJavaScriptLoginHelper;
use Facebook\FacebookRequestException;

class UserController extends BaseController {
  public function postLogin()
  {

    try {
      $session = $this->initializeSession();
    } catch (\Exception $ex) {
      return $ex->getMessage();
    }

    $request = new FacebookRequest($session, 'GET', '/me');
    $response = $request->execute();
    $me = $response->getGraphObject()->asArray();
    $user_id = $me['id'];

    // Create if not exists
    $user = User::firstOrCreate(array('id' => $user_id));

    // Login
    Auth::login($user);

    return $user;
  }

  private function setFacebookAccessToken($session)
  {
    $access_token = $session->getToken();
    Session::put('facebook_access_token', $access_token);
  }

  private function getFacebookSession()
  {
    $helper = new FacebookJavaScriptLoginHelper();
    $session = $helper->getSession();

    if(!$session){
      throw new exception('Session is invalid');
    }

    return $session;
  }

  private function initializeSession()
  {
    $app_id = Config::get('facebook.appId');
    $app_secret = Config::get('facebook.secret');
    FacebookSession::setDefaultApplication($app_id, $app_secret);

    $access_token = Session::get('facebook_access_token');
    if($access_token){
      $session = new FacebookSession($access_token);

      try {
        $session->validate();
      } catch (\Exception $ex) {
        Session::forget('facebook_access_token');
        $access_token = null;
      }
    }

    if(!$access_token){
      $session = $this->getFacebookSession();
      $this->setFacebookAccessToken($session);
    }

    return $session;
  }

}
