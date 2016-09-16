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
    'ngMaterial'
  ])
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