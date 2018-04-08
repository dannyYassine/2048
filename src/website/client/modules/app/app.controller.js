/**
 * Created by dannyyassine
 */

import swal from 'sweetalert2';

export default AppController;
function AppController($scope, gameService) {
    let vm = this;

    vm.props = gameService.props;

    vm.$onInit = $onInit;
    vm.$postLink = $postLink;
    vm.$onDestroy = $onDestroy;

    vm.onNewGameClicked = onNewGameClicked;
    vm.onGameOver = onGameOver;
    vm.playerWon = playerWon;

    /**
     * Life cycles
     */
    function $onInit() {
        gameService.onScoreIncreased(_onScoreIncreased);
        gameService.onGameWon(playerWon);
        gameService.onGameOver(onGameOver);
    }

    function $postLink() {
        gameService.startGame();
    }

    function $onDestroy() {
    }

    function _onScoreIncreased(scoreDiff) {
        console.log(scoreDiff);
    }

    /**
     * Instance Methods
     */

    function resetGame() {
        gameService.startGame();
        $scope.$evalAsync();
    }

    function onNewGameClicked() {
        swal({
            title: 'New game?',
            text: "You will lose your current score and progress",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#42B5A6',
            cancelButtonColor: '#F3426E',
            confirmButtonText: 'New game'
        }).then((result) => {
            if (result.value) {
                resetGame();
            }
        })
    }

    function onGameOver() {
        vm.keyboardEnabled = false;
        swal({
            title: 'Game over!',
            text: `Your current score is ${vm.props.currentScore}`,
            type: 'error',
            confirmButtonColor: '#42B5A6',
            confirmButtonText: 'New game?'
        }).then((result) => {
            if (result.value) {
                resetGame();
            }
        })
    }

    function playerWon() {
        vm.keyboardEnabled = false;
        swal({
            title: 'Congratulations! You win!',
            text: `Your current score is ${vm.props.currentScore}`,
            type: 'success',
            confirmButtonColor: '#42B5A6',
            confirmButtonText: 'New game?'
        }).then((result) => {
            if (result.value) {
                resetGame();
            }
        })
    }

}

