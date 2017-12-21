
angular.module('CamelRace')
    .factory("domesticCamelService", function(camelService){
        var domesticCamel =  function(player){
            this.position = 0;
            this.image = "http://loscuatroojos.com/wp-content/uploads/2007/06/unknown-23.gif";
            this.player = player;
            this.favTerrian = "grass";
            this.turbo = 20;
            this.terrianTurbo = 30;
            this.defense = 10;
        }
        domesticCamel.prototype = new camelService();
        return domesticCamel;
    });
