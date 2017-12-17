/**
 * Created by dannyyassine
 */

const GridController = function ($scope, $document, gameService) {
    let vm = this;

    vm.tiles = gameService.props.tiles;

    vm.$onInit = $onInit;
    vm.$onChanges = $onChanges;

    vm.swipeUp = swipeUp;
    vm.swipeDown = swipeDown;
    vm.swipeLeft = swipeLeft;
    vm.swipeRight = swipeRight;

    const keyboardKeys = {
        up: 38,
        down: 40,
        left: 37,
        right: 39
    };

    function $onInit() {
        _initKeyboardTouchEvents()
    }

    function $onChanges(changes) {
        console.log(changes);
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

    function swipeUp() {
        gameService.moveUp();
        $scope.$apply();
    }

    function swipeDown() {
        gameService.moveDown();
        $scope.$apply();
    }

    function swipeLeft() {
        gameService.moveLeft();
        $scope.$apply();
    }

    function swipeRight() {
        gameService.moveRight();
        $scope.$apply();
    }

};

export default GridController;