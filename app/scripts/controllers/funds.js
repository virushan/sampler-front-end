'use strict';

/**
 * @ngdoc function
 * @name samplerApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the samplerApp
 */
angular.module('samplerApp')
  .controller('FundsCtrl', function ($scope, $routeParams, $timeout, $location, Auth, account) {
    $scope.myAccount= Auth.getUserDetails();
    $scope.senderAccount = {}
    $scope.account = {fundsToSend: null};
    $scope.userAlert = null;
    $scope.userMsgSuccess = null;

    account.find($routeParams.id).then(function(accountSummery){
      if(accountSummery.error == undefined){
        $scope.senderAccount = accountSummery.data;
      }
    });

    $scope.cancelFund = function(){
      $location.path('/home');
    }

    $scope.sendFunds = function(){
      account.sendFunds($routeParams.id, $scope.account).then(function(accountSummery){
        if(accountSummery.success != undefined || accountSummery.success != false){
          $scope.senderAccount = accountSummery.data;
          $scope.userMsgSuccess = "Funds transferred successfully.";
          Auth.setBalance(accountSummery.data.balance);
          $timeout(function(){
            $location.path('/home');
          }, 5000);

        }else{
          $scope.userAlert = accountSummery.message;
        }
      }, function(error){
        console.log(error);
        $scope.userAlert = error.data.message;
      });
    }

  });
