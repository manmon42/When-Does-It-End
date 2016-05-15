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

        $scope.dayi = new Date().getDay();
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
                },

            {
                periods: [
                    {
                        name: '1st',
                        end: 570
                    },

                    {
                        name: 'Break',
                        end: 580
                    },

                    {
                        name: '2nd',
                        end: 680
                    },

                    {
                        name: 'Lunch',
                        end: 720
                    },

                    {
                        name: '5th',
                        end: 815
                    },

                    {
                        name: 'Break',
                        end: 825
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
                },

            {
                periods: [
                    {
                        name: '3rd',
                        end: 570
                    },

                    {
                        name: 'Break',
                        end: 585
                    },

                    {
                        name: 'Advisory',
                        end: 600
                    },

                    {
                        name: 'Tutorial',
                        end: 650
                    },

                    {
                        name: '4th',
                        end: 745
                    },

                    {
                        name: 'Lunch',
                        end: 785
                    },

                    {
                        name: '6th',
                        end: 880
                    },

                    {
                        name: 'Freedom',
                        end: 880
                    }

                    ]
                },

            {
                periods: [
                    {
                        name: '1st',
                        end: 570
                    },

                    {
                        name: 'Break',
                        end: 580
                    },

                    {
                        name: '2nd',
                        end: 680
                    },

                    {
                        name: 'Lunch',
                        end: 720
                    },

                    {
                        name: '5th',
                        end: 815
                    },

                    {
                        name: 'Break',
                        end: 825
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
                },

            {
                periods: [
                    {
                        name: '3rd',
                        end: 570
                    },

                    {
                        name: 'Break',
                        end: 585
                    },

                    {
                        name: 'Advisory',
                        end: 600
                    },

                    {
                        name: 'Tutorial',
                        end: 650
                    },

                    {
                        name: '4th',
                        end: 745
                    },

                    {
                        name: 'Lunch',
                        end: 785
                    },

                    {
                        name: '6th',
                        end: 880
                    },

                    {
                        name: 'Freedom',
                        end: 880
                    }

                    ]
                }
            ];

        var inc = function (time) {
            if (time >= $scope.day[$scope.dayi].periods[$scope.peri].end) {
                $scope.peri++;
            }
        };

        $scope.isSchoolIn = function (time) {
            if ($scope.dayi === 6 || $scope.dayi === 0) {
                return false;
            } else if (time < 480) {
                return false;
            } else if (time > $scope.day[$scope.dayi].periods[$scope.day[$scope.dayi].periods.length - 1].end) {
                return false;
            } else {
                return true;
            }
        };

        var endsIn = function (time) {
            var resp;

            var min = $scope.day[$scope.dayi].periods[$scope.peri].end - time;
            var hour = Math.floor(time / $scope.day[$scope.dayi].periods[$scope.peri].end);
            $scope.hour = time + ' ' + hour;
            if (hour <= 0) {
                resp = min + ' minutes';
            } else {
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
            date.setHours(8, 49);
            var time = (60 * date.getHours()) + date.getMinutes();
            if ($scope.isSchoolIn()) {
                inc(time);
                endsIn(time);
            }
            //console.log($scope.endsIn + '  ' + date.getSeconds());
        }, 1000);

    });