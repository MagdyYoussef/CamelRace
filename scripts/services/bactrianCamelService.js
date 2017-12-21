
angular.module('CamelRace')
    .factory("bactrianCamelService", function(camelService){
        var bactrianCamel =  function(player){
            this.position = 0;
            this.image = "http://princesitairene.webcindario.com/running_camel.gif";
            this.player = player;
            this.favTerrian = "mud";
            this.turbo = 15;
            this.terrianTurbo = 30;
            this.defense = 20;
        }
        bactrianCamel.prototype = new camelService();
        return bactrianCamel;
    });
