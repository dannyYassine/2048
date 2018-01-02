/**
 * Created by dannyyassine
 */

export default GridController;
function GridController($scope, $document, gameService) {
    let vm = this;

    vm.props = gameService.props;

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
    }
    
    function _initKeyboardTouchEvents() {
        $document.bind('keydown', function(event) {
            if (gameService.props.gameOver || gameService.props.finished) {
                return;
            }
            _checkThrottle(() => {
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
                $scope.$evalAsync()
            });
        });
    }

    function _checkThrottle(cb) {
        // if (eventTimeout) {
        //     return;
        // }
        // eventTimeout = setTimeout(function() {
        //     eventTimeout = null;
        // }, 0);
        cb();
    }

    function swipeUp() {
        _checkThrottle(() => {
            gameService.moveUp();
        });
    }

    function swipeDown() {
        _checkThrottle(() => {
            gameService.moveDown();
        });
    }

    function swipeLeft() {
        _checkThrottle(() => {
            gameService.moveLeft();
        });
    }

    function swipeRight() {
        _checkThrottle(() => {
            gameService.moveRight();
        });
    }

};

