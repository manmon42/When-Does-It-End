'use strict';

/**
 * @ngdoc function
 * @name whenDoesItEndApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the whenDoesItEndApp
 */
angular.module('whenDoesItEndApp')
    .controller('MainCtrl', function ($scope, $interval) {

        $scope.dayi = 0; //date.getDay() - 1;
        $scope.peri = 0;
        $scope.endsIn = '';
        $scope.times = [];
        $scope.day = [
            {
                periods: [
                    {
                        name: '1st',
                        end: 528
                    },

                    {
                        name: '2nd',
                        end: 581
                    },

                    {
                        name: 'Break',
                        end: 596
                    },

                    {
                        name: '3rd',
                        end: 649
                    },

                    {
                        name: 'Advisory',
                        end: 668
                    },

                    {
                        name: '4th',
                        end: 721
                    },

                    {
                        name: 'Lunch',
                        end: 761
                    },

                    {
                        name: '5th',
                        end: 814
                    },

                    {
                        name: '6th',
                        end: 867
                    },

                    {
                        name: '7th',
                        end: 920
                    },

                    {
                        name: 'Freedom',
                        end: 920
                    }

                    ]
                }
            ];

        var inc = function (time) {
            if(time >= $scope.day[$scope.dayi].periods[$scope.peri].end){
                $scope.peri++;
            }
        };
        
        var endsIn = function (time) {
            var resp;
            
            var min = $scope.day[$scope.dayi].periods[$scope.peri].end - time;
            var hour = Math.floor(time / $scope.day[$scope.dayi].periods[$scope.peri].end);
            $scope.hour = time + ' ' +hour;
            if(hour <= 0){
                resp = min + ' minutes';
            }else{
                resp = hour + ' hours and ' + min + ' minutes';
            }
            
            $scope.endsIn = resp;
            
        };
    
        /*
        for(var i=0; i < $scope.day[$scope.dayi].periods.length; i++){
            $scope.times.push(($scope.day[$scope.dayi].periods[i].end.hour * 60) + $scope.day[$scope.dayi].periods[i].end.min);
        }
        */
    
        $interval(function () {
            var date = new Date();
            date.setHours(8, 48);
            var time = (60 * date.getHours()) + date.getMinutes();
            inc(time);
            endsIn(time);
            //console.log($scope.endsIn + '  ' + date.getSeconds());
        }, 100);

    });