'use strict';

angular.module('whenDoesItEndApp')
    .controller('SwitchCtrl', function ($cookies, $scope){
      $scope.schools = [
          'Redwood',
          'Drake'
      ];
    });