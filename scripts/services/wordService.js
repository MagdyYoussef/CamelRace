angular.module('CamelRace').factory("wordService", function () {
    var service = {};
    service.generatedWord = "";
    service.inputWord = "";

    service.generateRandomWord = function () {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < 3; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        service.generatedWord = text;
        return text;
    };

    service.checkDoubleReversed = function () {
        var remainingChars =  service.inputWord.substring(3, service.inputWord.length);
        if (remainingChars != "") {
            if (remainingChars.length == 3) {
                remainingChars = remainingChars.split("").reverse().join("");
                if (remainingChars ==  service.generatedWord) {
                    return true;
                }
                else
                    return false;
            }
        } else {
            return false;
        }
    };

    service.setInputWord = function(inputWord){
        service.inputWord = inputWord;
    }

    service.matchWords = function () {
        var firstThreeChars = service.inputWord.substring(0, 3);
        if (firstThreeChars == service.generatedWord) {
            return true;
        }
        return false;
    }

    return service;
});
