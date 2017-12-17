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

    /**
     * Used for throttling
     */
    let eventTimeout;

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
                _checkThrottle(() => {
                    gameService.moveUp();
                    event.preventDefault();
                });
            } else if (keyboardKeys.down === event.which) {
                _checkThrottle(() => {
                    gameService.moveDown();
                    event.preventDefault();
                });
            } else if (keyboardKeys.left === event.which) {
                _checkThrottle(() => {
                    gameService.moveLeft();
                    event.preventDefault();
                });
            } else if (keyboardKeys.right === event.which) {
                _checkThrottle(() => {
                    gameService.moveRight();
                    event.preventDefault();
                });
            }
            $scope.$apply();
        });
    }

    function _checkThrottle(cb) {
        if (eventTimeout) {
            return;
        }
        eventTimeout = setTimeout(function() {
            eventTimeout = null;
        }, 500);
        cb();
    }

    function swipeUp() {
        _checkThrottle(() => {
            gameService.moveUp();
            $scope.$apply();
        });
    }

    function swipeDown() {
        _checkThrottle(() => {
            gameService.moveDown();
            $scope.$apply();
        });
    }

    function swipeLeft() {
        _checkThrottle(() => {
            gameService.moveLeft();
            $scope.$apply();
        });
    }

    function swipeRight() {
        _checkThrottle(() => {
            gameService.moveRight();
            $scope.$apply();
        });
    }

};

export default GridController;