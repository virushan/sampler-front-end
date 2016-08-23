'use strict';

/**
 * @ngdoc service
 * @name localhostFrontendApp.authenticate
 * @description
 * # authenticate
 * Factory in the localhostFrontendApp.
 */
angular.module('samplerApp')
  .factory('authFactory',function($q, restApi) {

    function signIn(authObj){
      var deferred = $q.defer();
      restApi.post('/api/v1/sign_in', authObj).then(function(usersList){
        if(usersList)
          deferred.resolve(usersList.data);
        else
          deferred.reject(false);
      }, function(error){
        deferred.reject(error);
      });
      return deferred.promise;
    }

    function signOut(){
      var deferred = $q.defer();
      restApi.get('/api/v1/sign_out').then(function(usersList){
        if(usersList)
          deferred.resolve(usersList.data);
        else
          deferred.reject(false);
      }, function(error){
        deferred.reject(error);
      });
      return deferred.promise;
    }

    function register(registerObj){
      var deferred = $q.defer();
      restApi.post('/api/v1/users', registerObj).then(function(registeredUser){
        if(registeredUser)
          deferred.resolve(registeredUser.data);
        else
          deferred.reject(false);
      }, function(error){
        deferred.reject(error);
      });
      return deferred.promise;
    }


    return {
      signIn: signIn,
      signOut: signOut,
      register: register,
    }
  });
