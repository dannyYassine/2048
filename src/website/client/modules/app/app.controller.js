/**
 * Created by dannyyassine
 */

function AppController ($scope, gameService) {
    let vm = this;
    vm.isLoading = false;

    vm.$onInit = $onInit;
    vm.$postLink = $postLink;

    function $onInit() {
    }

    function $postLink() {
        gameService.startGame();
    }
}

module.exports = AppController;