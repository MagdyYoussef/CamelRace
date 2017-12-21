
angular.module('CamelRace')
    .factory("dromedaryCamelService", function(camelService){
        var dromedaryCamel =  function(player){
            this.position = 0;
            this.image = "http://www.animatedimages.org/data/media/208/animated-camel-image-0010.gif";
            this.player = player;
            this.favTerrian = "sand";
            this.turbo = 25;
            this.terrianTurbo = 35;
            this.defense = 0;
        }
        dromedaryCamel.prototype = new camelService();
        return dromedaryCamel;
    });
