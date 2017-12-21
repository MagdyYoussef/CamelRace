angular.module('CamelRace').factory("playerService",
    function (bactrianCamelService, dromedaryCamelService, domesticCamelService) {
    var service = {};
    service.players = [];
    service.currentPlayerIndex = 0;

    service.initializePlayers = function(humanCamelType, numberOfOpponents){
        //initialize human player
        if(humanCamelType == "bactrian"){
            service.players.push(new bactrianCamelService("human"));
        }
        else if(humanCamelType == "dromedary"){
            service.players.push(new dromedaryCamelService("human"));
        }
        else if((humanCamelType == "domestic")){
            service.players.push(new domesticCamelService("human"));
        }

        //generate random cpu opponents
        for(var i=0;i<numberOfOpponents;i++){
            var randomNumber = Math.floor(Math.random() * 3);
            if (randomNumber == 0){
                service.players.push(new bactrianCamelService("cpu"));
            }
            else if (randomNumber == 1){
                service.players.push(new dromedaryCamelService("cpu"));
            }
            else if (randomNumber == 2){
                service.players.push(new domesticCamelService("cpu"));
            }
        }

    }

    service.getCurrentPlayer = function() {
        return service.players[service.currentPlayerIndex];
    }

    service.getNextPlayer = function(){
        var index = service.currentPlayerIndex + 1;
        index %= service.players.length; //rotate
        service.currentPlayerIndex = index;
        return service.players[index];
    }

    service.isCurrentPlayerHuman = function(){
        if (service.players[service.currentPlayerIndex].player == "human"){
            return true;
        }
        return false;
    }

    service.foundWinner = function(){
        for (var i = 0; i < service.players.length; i++) {
            if (service.players[i].position >= 100) {
                return true;
            }
        }
        return false;
    }

    return service;
});
