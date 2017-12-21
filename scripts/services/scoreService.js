angular.module('CamelRace').service("scoreService", function () {
    var service = {};
    //============================= Get Word==================================
    service.updateScore = function (score,startTime, roundTime, stepsPerRound) {
        var typingTime = new Date().getTime() - startTime;
        if (typingTime < (roundTime / 2)) {
            score += stepsPerRound;
        } else if (typingTime < roundTime) {
            score += stepsPerRound / 2;
        }
        return score;
    };
    return service;
});
/*
yourApp.factory( 'MyDate', function() {

    //Constructor
    function MyDate( date ) {
        this.date = date; //Wrapping a JS date object.
        //Probably want to add some safety here to make sure it IS a date obj
    }

    MyDate.prototype.addHours( h ) {
        this.date.setHours( this.date.getHours() + parseInt(h) );
    }

    return MyDate;
});

yourApp.controller( 'MyDateController', function( $scope, MyDate ) {

   $scope.someMethod = function(h) {
       //Some trigger, UI or what not
       $scope.myDate = new MyDate( new Date() );
       $scope.myDate.addHours(h);
       //Do something with the new date
   };
});
*/