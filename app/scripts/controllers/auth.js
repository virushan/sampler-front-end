'use strict';

/**
 * @ngdoc function
 * @name samplerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the samplerApp
 */
angular.module('samplerApp')
  .controller('AuthCtrl', function ($scope, $location, $timeout, Auth, authFactory) {

    $scope.AuthObj = {
      grant_type: 'password',
      client_id: 1,
      client_secret: 1234,
      username: null,
      password: null,
    }

    $scope.registerObj ={
      "first_name": null,
      "last_name": null,
      "email": null,
      "password": null,
      "password_confirmation": null
    }

    $scope.userAlert = null;
    $scope.userMsgSuccess = null;

    $scope.registerUser = function(){
      authFactory.register($scope.registerObj).then(function(registeredUser){
        if(registeredUser.error == undefined){
          $scope.userMsgSuccess = "User Created Successfully.";
          $timeout(function() {
            $location.path('/')
          }, 5000);

        }else{
          $scope.userAlert = registeredUser;
        }
      }, function(error){
        $scope.userAlert = error.data.message.split(".");
      });
    }


    $scope.signIn = function(){
      authFactory.signIn($scope.AuthObj).then(function(authResponse){
        if(authResponse.error == undefined){
          Auth.setUser(authResponse.data);
          $location.path('/home');
        }else{
          $scope.userAlert = authResponse;
        }
      }, function(error){
        $scope.userAlert = error.data.error_description.split(",");
      });
    }

    if($location.path() == '/sign_out'){
      authFactory.signOut().then(function(authResponse){
        if(authResponse){
          Auth.logout();
          $location.path('/home');
        }
      });
    }
  });
