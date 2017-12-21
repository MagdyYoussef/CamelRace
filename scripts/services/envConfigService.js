angular.module('CamelRace').factory("envConfigService", function () {
    var service = {};

    //-------------------- Configurable ---------------------
    service.roundTime = 5000;
    service.stepsPerRound = 5;
    service.numberOfOpponents = 4;
    service.humanCamelType = "domestic";
    service.terrianType = "sandLane";

    //---------------------Non-Configurable-------------------
    service.CPU_MOVES = ["no", "half", "full", "turbo", "weapon"]; //make turbo special case of half/full/weapon

    return service;
});
