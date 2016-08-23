'use strict';

angular.module('samplerApp')
  .service('restApi', function( $q, $http ){


    this.get = function(path){
      var request = {
        method: 'GET',
        url: 'http://sampler.dev'+path,
      }
      var deferred = $q.defer();
      $http(request).then(function(response){
        deferred.resolve(response)
      }, function(response){
        deferred.reject(response);
      });
      return deferred.promise;
    }


    this.post = function(path, dataObj){
      var request = {
        method: 'POST',
        url: 'http://sampler.dev'+path,
        headers: {
          'Content-Type': 'application/json'
        },
        data: dataObj
      }
      var deferred = $q.defer();
      $http(request).then(function(response){
        deferred.resolve(response)
      }, function(response){
        deferred.reject(response);
      });
      return deferred.promise;
    }

    this.put = function(path, dataObj){
      var request = {
        method: 'PUT',
        url: 'http://sampler.dev'+path,
        headers: {
          'Content-Type': 'application/json'
        },
        data: dataObj
      }
      var deferred = $q.defer();
      $http(request).then(function(response){
        deferred.resolve(response)
      }, function(response){
        deferred.reject(response);
      });
      return deferred.promise;
    }

    this.delete = function(path){
      var request = {
        method: 'DELETE',
        url: 'http://sampler.dev'+path,
      }
      var deferred = $q.defer();
      $http(request).then(function(response){
        deferred.resolve(response)
      }, function(response){
        deferred.reject(response);
      });
      return deferred.promise;
    }

  });
