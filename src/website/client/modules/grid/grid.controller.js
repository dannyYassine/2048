/**
 * Created by dannyyassine
 */

const GridController = function ($scope, $document, gameService) {
    let vm = this;
    
    vm.$onInit = $onInit;
    vm.tiles = gameService.props.tiles;

    const keyboardKeys = {
        up: 38,
        down: 40,
        left: 37,
        right: 39
    };

    function $onInit() {
        _initKeyboardTouchEvents()
    }
    
    function _initKeyboardTouchEvents() {
        $document.bind('keydown', function(event) {
            if (keyboardKeys.up === event.which) {
                gameService.moveUp();
                event.preventDefault();
            } else if (keyboardKeys.down === event.which) {
                gameService.moveDown();
                event.preventDefault();
            } else if (keyboardKeys.left === event.which) {
                gameService.moveLeft();
                event.preventDefault();
            } else if (keyboardKeys.right === event.which) {
                gameService.moveRight();
                event.preventDefault();
            }
            $scope.$apply();
        });
    }
};

export default GridController;