'use strict';

/**
 * @ngdoc service
 * @name localhostFrontendApp.authenticate
 * @description
 * # authenticate
 * Factory in the localhostFrontendApp.
 */
angular.module('samplerApp')
  .factory('users',function($q, restApi) {

    function All(){
      var deferred = $q.defer();
      restApi.get('/api/v1/users').then(function(usersList){
        if(usersList)
          deferred.resolve(usersList.data);
        else
          deferred.reject(false);
      });
      return deferred.promise;
    }

    function find(id){
      var deferred = $q.defer();
      restApi.get('/api/v1/users/'+id).then(function(usersList){
        if(usersList)
          deferred.resolve(usersList.data);
        else
          deferred.reject(false);
      });
      return deferred.promise;
    }


    return {
      All: All,
      find: find,
    }
  });
