/**
 * Created by dannyyassine
 */

function AppController ($scope, gameService) {
    let vm = this;

   vm.props = gameService.props;

    vm.$onInit = $onInit;
    vm.$postLink = $postLink;

    function $onInit() {

    }

    function $postLink() {
        gameService.startGame();
    }
}

module.exports = AppController;