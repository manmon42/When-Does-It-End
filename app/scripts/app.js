'use strict';

/**
 * @ngdoc overview
 * @name whenDoesItEndApp
 * @description
 * # whenDoesItEndApp
 *
 * Main module of the application.
 */
angular
  .module('whenDoesItEndApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngMaterial',
    'ngStorage',
    'ngAudio'
  ])
  angular.module('myApp', ['ngMaterial'])
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('red')
      .accentPalette('orange');
  })
  .config(function($mdThemingProvider) {
    $mdThemingProvider.disableTheming();
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });