angular.module('CamelRace', ['timer'])
    .controller('CamelRaceController', function ($scope, $interval, $timeout, wordService, envConfigService, playerService){

    $scope.randomWord = "";
    $scope.userInput = "";
    $scope.players = playerService.players;
    $scope.terrianType = envConfigService.terrianType;
    $scope.currentPlayerIndex = playerService.currentPlayerIndex;

        $scope.isHuman = function() {
            return playerService.isCurrentPlayerHuman();
        }

        $scope.weHaveAwinner = function(){
            return playerService.foundWinner();
        }
    var roundEnded = false;
    var typingTime = 0;
    var roundStartTime = 0;
    var counterStopped;

    var startNextRound = function () {
        playerService.getNextPlayer();
        roundEnded = false;
        roundStartTime = new Date().getTime();
        if (playerService.isCurrentPlayerHuman()) {
            stopCounter();
            $scope.counter.seconds = envConfigService.roundTime / 1000;
            $scope.counter.countdown();
            $scope.randomWord = wordService.generateRandomWord();
        }
    };

    var updateGameLogic = function () {

        if (playerService.foundWinner()) {
            console.log("game over!");
            $scope.stopCounter();
            return 0;
        }

        if (playerService.isCurrentPlayerHuman()) {
            var currentTime = new Date().getTime();
            if ((roundStartTime + envConfigService.roundTime) < currentTime) {
                roundEnded = true;
            }
        }

        if (!playerService.isCurrentPlayerHuman()) {
            roundEnded = true;
        }

        if (roundEnded == true) {
            if (playerService.isCurrentPlayerHuman()) {
                if (wordService.matchWords()) {
                    updatePlayerPosition();
                    if(wordService.checkDoubleReversed()) {
                        //weapon code
                    }
                }
            }
            else {
                cpuPlay();
            }
            startNextRound();
        }
    }

        var cpuPlay = function () {
            var index = Math.floor(Math.random() * (4));
            playerService.getCurrentPlayer().move(envConfigService.CPU_MOVES[index],
                envConfigService.stepsPerRound,
                envConfigService.terrianType);
        };

        var updatePlayerPosition = function () {
            if (typingTime < (envConfigService.roundTime / 2)) {
                playerService.getCurrentPlayer().move("full", envConfigService.stepsPerRound, envConfigService.terrianType);
            } else if (typingTime < envConfigService.roundTime) {
                playerService.getCurrentPlayer().move("half", envConfigService.stepsPerRound, envConfigService.terrianType);
            }
        };

        $scope.onTyping = function (keyEvent) {
            if ( playerService.isCurrentPlayerHuman()) {
                if (keyEvent.which === 13) { //enter key
                    wordService.setInputWord($scope.userInput);
                    $scope.userInput = "";
                    typingTime = new Date().getTime() - roundStartTime;
                    roundEnded = true;
                }
            };
        };

        $scope.counter = {};
        $scope.counter.seconds = envConfigService.roundTime / 1000;
        $scope.counter.countdown = function () {
            counterStopped = $timeout(function () {
                $scope.counter.seconds--;
                $scope.counter.countdown();
            }, 1000);
        };
        var counterStopped;
        var stopCounter = function () {
            $timeout.cancel(counterStopped);
        };


        //-------------------------Entry Point -----------------------
        playerService.initializePlayers(envConfigService.humanCamelType, envConfigService.numberOfOpponents);
        startNextRound();
        $interval(updateGameLogic, 1000);
    });
