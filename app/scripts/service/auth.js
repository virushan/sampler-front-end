'use strict';

/**
 * @ngdoc service
 * @name localhostFrontendApp.authenticate
 * @description
 * # authenticate
 * Factory in the localhostFrontendApp.
 */
angular.module('samplerApp')
  .service('Auth',function($cookieStore) {
    var _user = $cookieStore.get('user');
    this.setUser = function(user) {
      _user = user;
      $cookieStore.put('user', _user);
    }



    this.isLoggedIn = function() {
      return _user ? true : false;
    }
    this.getUserDetails = function() {
      return _user;
    }
    this.getId = function() {
      return _user ? _user.email : null;
    }
    this.getToken = function() {
      return _user ? _user.access_token : '';
    }
    this.setBalance = function(balance){
      _user.balance = balance;
      $cookieStore.put('user', _user);
    }
    this.logout = function() {
      $cookieStore.remove('user');
      _user = null;
    }
  });
