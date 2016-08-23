'use strict';

/**
 * @ngdoc service
 * @name localhostFrontendApp.authenticate
 * @description
 * # authenticate
 * Factory in the localhostFrontendApp.
 */
angular.module('samplerApp')
  .factory('account',function($q, restApi) {


    function find(accountId){
      var deferred = $q.defer();
      restApi.get('/api/v1/accounts/'+accountId).then(function(accountSummery){
        if(accountSummery)
          deferred.resolve(accountSummery.data);
        else
          deferred.reject(false);
      });
      return deferred.promise;
    }

    function sendFunds(accountId, fundsObj){
      var deferred = $q.defer();
      restApi.put('/api/v1/accounts/'+accountId+'/send_funds', fundsObj).then(function(accountSummery){
        if(accountSummery)
          deferred.resolve(accountSummery.data);
        else
          deferred.reject(false);
      }, function(error){
        deferred.reject(error);
      });
      return deferred.promise;
    }


    return {
      find: find,
      sendFunds: sendFunds
    }
  });
