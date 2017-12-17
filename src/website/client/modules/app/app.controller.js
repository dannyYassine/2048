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

    vm.onNewGameClicked = onNewGameClicked;

    function $onInit() {

    }

    function $postLink() {
        gameService.startGame();
    }

    function onNewGameClicked() {
        swal({
            title: 'New game?',
            text: "You will lose your current score and progress",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                gameService.startGame();
            }
        })
    }

}

