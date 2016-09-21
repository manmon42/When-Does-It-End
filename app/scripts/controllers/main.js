'use strict';

/**
 * @ngdoc function
 * @name whenDoesItEndApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the whenDoesItEndApp
 */
angular.module('whenDoesItEndApp')
    .controller('MainCtrl', function ($scope, $interval, $http, $cookies) {
        $scope.schools = [
            'Redwood',
            'Drake'
        ];
        $scope.school = '';
        //$cookies.remove('school');
        $scope.close = function (choice) {
            $cookies.put('school', choice);
            get();
        };
        $scope.choiceMade = function () {
            if ($cookies.get('school')) {
                return false;
            } else {
                return true;
            }
        };
        // Sets the day-index (dayi) to the current day-1 as 0 is sunday
        $scope.dayi = new Date().getDay() - 1;
        // Sets the period-index (peri) to 0 for the start of the day
        $scope.peri = 0;
        // Initialises the endsIn var as a string
        $scope.endsIn = '';
        // Sets the day array's contents
        var get = function () {
            $http.get('../../res/' + $cookies.get('school') + '.json').then(function (res) {
                $scope.day = res.data;
                init();
                // Interval, runs once every second
                $interval(function () {
                    var date = new Date(); // Sets date to be a new Date() object
                    // date.setHours(10, 20); //Used for debugging, overrides the hour and minute values.
                    var time = convertTime(date); // Converts the current time into minutes since the beginning of the day
                    if (isSchoolIn(time)) { // Checks if school is in, if false, the in() and endsIn() functions dont need to run
                        if (needsInc(time)) {
                            $scope.peri++;
                        }
                        endsIn(time); // Runs the endsIn() function and passes in the converted time
                    }
                }, 1000);
            }, function (err) {
                console.log(err);
            });
        };
        // Function to determine wheather or not the period needs to be incremented
        var needsInc = function (time) {
            return (time >= $scope.day[$scope.dayi].periods[$scope.peri].end);
        };
        // Function to convert hours and minutes to time code
        var convertTime = function (time) {
            return (60 * time.getHours() + time.getMinutes());
        };
        // Initialises the app by running helper functions
        var init = function () {
            var tempDate = new Date(); // Sets temp date var just for the init scope
            // tempDate.setHours(10, 20); //Used for debugging, overrides the hour and minute values.
            var time = convertTime(tempDate); // Converts the temp date time to time code
            if (isSchoolIn(time)) {
                while (needsInc(time)) { // Increments untill no longer needed as long as school is in 
                    $scope.peri++;
                }
                endsIn(time); // Runs the helper function to give a value before displaing the app
            }
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
                resp = min + ' minute' + (min === 1 ? '' : 's'); // Sets resp as just the minuts left in class
            } else if ((hour <= 0) && min === 0) {
                resp = hour + ' hour';
            } else { // Otherwise, if there is a nonzero value for hours, bot the hours and minutes are displayed
                resp = hour + ' hour and ' + min + ' minute' + (min === 1 ? '' : 's'); // Sets resp as both the hours and the minutes
            }

            $scope.endsIn = resp; // Sets the endsIn var to equal the local resp var

        };
        $scope.switchSchools = function(){
            console.log('Switch');
            $cookies.remove('school');
        }
        if ($cookies.get('school')) {
            get();
        }

    });