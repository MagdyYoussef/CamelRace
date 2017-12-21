angular.module('CamelRace')
    .factory("camelService", function () {
        return function(){
            this.position = 0;
            this.image = "";
            this.player = "";
            this.favTerrian = "";
            this.turbo = "";
            this.terrianTurbo = "";
            this.defense = "";
            this.move = function(actionType, step,  terrian){
                if(actionType == "half") {
                    this.position += step/2;
                }
                else if (actionType == "full"){
                    this.position += step;
                }
                else if (actionType == "turbo") {
                    if (this.favTerrian == terrian){
                        this.position += step + (this.terrianTurbo * step) / 100;
                    }
                    else{
                        this.position += step + (this.turbo * step) / 100;
                    }
                }
            };
        };
    });