'use strict';

/**
 * @ngdoc function
 * @name samplerApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the samplerApp
 */
angular.module('samplerApp')
  .controller('ProfileCtrl', function ($scope, Auth) {
    $scope.myProfile = Auth.getUserDetails();
  });
