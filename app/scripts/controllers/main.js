'use strict';

/**
 * @ngdoc function
 * @name samplerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the samplerApp
 */
angular.module('samplerApp')
  .controller('HomeCtrl', function ($scope, users, Auth) {
    $scope.accounts = {
      my: Auth.getUserDetails().account,
      all:[]
    };
    users.find(Auth.getId()).then(function(user){
      if(user){
        $scope.accounts.my = user.data.account;
      }
    });
    users.All().then(function(users){
      if(users){
        $scope.accounts.all= users.data;
      }
    });
  });
