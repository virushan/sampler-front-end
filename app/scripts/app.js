'use strict';

/**
 * @ngdoc overview
 * @name samplerApp
 * @description
 * # samplerApp
 *
 * Main module of the application.
 */
angular
  .module('samplerApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ]).run(function($location, Auth, $rootScope){
    //check if the user is signed in and redirect them to appropriate pages
    $rootScope.$on( "$routeChangeStart", function() {
      if (Auth.isLoggedIn() == false && $location.path() != '/register') {
        $location.path('/');
      }else if(Auth.isLoggedIn() == true && ($location.path() == '/' || $location.path() == '/register')){
        $location.path('/home');
      }
    });
  })
  .config(function ($routeProvider, $httpProvider, $locationProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    }).hashPrefix('!');
    var interceptor =
      function($q, $rootScope, $location, Auth) {
        $.ajaxPrefilter(function(options, originalOptions, jqXHR) {
          jqXHR.setRequestHeader("Authorization", 'Bearer ' + Auth.getToken());
        });
        return {
          'request': function(config) {
              config.headers.Authorization = 'Bearer ' + Auth.getToken();
            return config;
          },
          'response': function(resp) {
            return resp;
          },
          'responseError': function(rejection) {
            switch (rejection.status) {
              case 400:
                break;
              case 401:
                Auth.logout();
                  $rootScope
                    .$broadcast('auth:loginRequired');
                break;
              case 403:
                $rootScope
                  .$broadcast('auth:forbidden');
                break;
              case 404:
                $rootScope
                  .$broadcast('page:notFound');
                break;
              case 500:
                $rootScope
                  .$broadcast('server:error');
                break;
            }
            return $q.reject(rejection);
          }
        }
      }
    $httpProvider.interceptors.push(interceptor);
    $routeProvider
      .when('/', {
        templateUrl: '/views/login.html',
        controller: 'AuthCtrl',
        controllerAs: 'main'
      })
      .when('/sign_out', {
        templateUrl: '/views/login.html',
        controller: 'AuthCtrl',
        controllerAs: 'auth'
      })
      .when('/register', {
        templateUrl: '/views/register.html',
        controller: 'AuthCtrl',
        controllerAs: 'register'
      })
      .when('/home', {
        templateUrl: '/views/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'main'
      })
      .when('/profile', {
        templateUrl: '/views/profile.html',
        controller: 'ProfileCtrl',
        controllerAs: 'profile'
      })
      .when('/send_funds/:id', {
        templateUrl: '/views/funds.html',
        controller: 'FundsCtrl',
        controllerAs: 'funds'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
