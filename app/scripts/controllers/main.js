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
        // Sets the day-index (dayi) to the current day-1 as 0 is sunday
        $scope.dayi = new Date().getDay() - 1;
        // Sets the period-index (peri) to 0 for the start of the day
        $scope.peri = 0;
        // Initialises the endsIn var as a string
        $scope.endsIn = '';
        // Sets the day array's contents
        $scope.day = [
            // Monday, index 0. This is why we subtract one from the current day. This is repeated for each day
            {
                // Array of periods for the day
                periods: [
                    // Period object, contains name and end time in number of minutes since the beginning of the day
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

        var needsInc = function (time) {
            return (time >= $scope.day[$scope.dayi].periods[$scope.peri].end);
        };
        var convertTime = function (time) {
            return (60 * time.getHours() + time.getMinutes());
        };
        var init = function () {
            var tempDate = new Date();
            // tempDate.setHours(11, 30); //Used for debugging, overrides the hour and minute values.
            var time = convertTime(tempDate);
            while (needsInc(time) && isSchoolIn(time)) {
                $scope.peri++;
            }
            endsIn(time);
        };
        // Checks wheather or not school is in based on minutes since the beginning of the day
        var isSchoolIn = function (time) {
            if ($scope.dayi === 5 || $scope.dayi === -1) { // Checks if the day is Saturday(5) or Sunday(-1). Sunday is off because 1 is subtracted from the date in dayi to make the arrays easier
                $scope.isSchoolIn = false;
            } else if (time < 480) { // Checks if the time is befor 8:00, before school starts
                $scope.isSchoolIn = false;
            } else if (time > $scope.day[$scope.dayi].periods[$scope.day[$scope.dayi].periods.length - 1].end) { // Checks if the time is greater than the end time of the final class for a given day
                $scope.isSchoolIn = false;
            } else { // If none of these conditions are met, retun true
                $scope.isSchoolIn = true;
            }
            return $scope.isSchoolIn;
        };
        // Checks the ammount of time untill a given period ends based on minutes since the beginning of the day
        var endsIn = function (time) {
            var resp; // Initialises the resp variable

            var diff = $scope.day[$scope.dayi].periods[$scope.peri].end - time; // Sets diff as the number of minutes untill the end of class
            var hour = Math.floor(diff / 60); // Sets hour as the truncated quotient of the number of minutes left in class and 60
            var min = diff - (60 * hour); // Sets min as the number of minutes left in class minus those reperesented by the hour denomination
            if (hour <= 0) { // Checks if the hour var is less than or equal too zero, if true, only the minuts are displayed
                resp = min + ' minutes'; // Sets resp as just the minuts left in class
            } else { // Otherwise, if there is a nonzero value for hours, bot the hours and minutes are displayed
                resp = hour + ' hour and ' + min + ' minutes'; // Sets resp as both the hours and the minutes
            }

            $scope.endsIn = resp; // Sets the endsIn var to equal the local resp var

        };
        init();
        // Interval, runs once every second
        $interval(function () {
            var date = new Date(); // Sets date to be a new Date() object
            // date.setHours(11, 30); //Used for debugging, overrides the hour and minute values.
            var time = convertTime(date); // Converts the current time into minutes since the beginning of the day
            if (isSchoolIn(time)) { // Checks if school is in, if false, the in() and endsIn() functions dont need to run
                if (needsInc(time)) {
                    $scope.peri++;
                }
                endsIn(time); // Runs the endsIn() function and passes in the converted time
            }
        }, 1000);

    });