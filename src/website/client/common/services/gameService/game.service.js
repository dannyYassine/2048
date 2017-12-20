/**
 * Created by dannyyassine
 */

import Tile from './../../../model/Tile';
import randomNumberHelper from './../../helpers/randomNumberHelper';

export default function GameService($window) {
    /**
     * Placed tiles on screen
     * @type {Array}
     */
    let tiles = [];

    /**
     * Player score
     * @type {number}
     */
    let currentScore = 0;
    let highScore = 0;

    /**
     * Game variables to keep track of
     * @type {boolean}
     */
    let gameOver = false;
    let finished = false;
    let scoreToWin = 2048;

    /**
     * Game grid size
     * @type {number}
     */
    let gameSize = 4;

    /**
     * Available tiles spaces to put new tiles on screen
     * @type {Array}
     */
    let availableTiles = [];
    
    /**
     * Module
     */
    const props = {
        tiles,
        currentScore,
        highScore,
        gameOver,
        finished
    };

    return {
        props: props,
        startGame: startNewGame,
        moveUp: moveUp,
        moveDown: moveDown,
        moveLeft: moveLeft,
        moveRight: moveRight,
    };

    /**
     * Methods
     */

    function startNewGame() {
        _initGame();
    }
    
    function moveUp() {
        _handleMove({x: 0, y: -1});
    }
    
    function moveDown() {
        _handleMove({x: 0, y: 1});
    }
    
    function moveLeft() {
        _handleMove({x: -1, y: 0});
    }
    
    function moveRight() {
        _handleMove({x: 1, y: 0});
    }

    function _handleMove(direction) {
        let didTilesMoved = false;

        _setupBeforeMove();
        let ordered = _orderedTilesWithDirection(direction);

        for (let tileIndex in ordered) {
            let tile = _tileAtPosition(ordered[tileIndex]);

            let newPosition = ordered[tileIndex];

            let isAllowed = true;
            let isWithinBounds = true;
            let nextTile = null;

            while (isWithinBounds && isAllowed) {
                let tempPosition = {x:newPosition.x + direction.x, y: newPosition.y + direction.y};
                if (tempPosition.x > 4 || tempPosition.x < 1) {
                    isWithinBounds = false;
                }
                if (tempPosition.y > 4 || tempPosition.y < 1) {
                    isWithinBounds = false;
                }
                isAllowed = _isAllowedToMoveAt(tempPosition);
                if (isWithinBounds && isAllowed) {
                    newPosition = tempPosition;
                }
            }

            let tempPosition = {x:newPosition.x + direction.x, y: newPosition.y + direction.y};
            nextTile = _tileAtPosition(tempPosition);

            if (nextTile && nextTile.getValue() === tile.getValue() && !nextTile.merged && !tile.merged) {
                console.log(nextTile.merged);
                didTilesMoved = true;
                nextTile.setValue(tile.getValue() * 2);
                nextTile.merged = true;

                _deleteTile(tile);

                props.currentScore += nextTile.getValue();

                if (props.currentScore >= scoreToWin) {
                    props.finished = true;
                }

                _verifyHighScore();
                
            } else {

                // Move tile
                let tilePosition = tile.getPosition();

                if (tilePosition.x !== newPosition.x || tilePosition.y !== newPosition.y) {
                    didTilesMoved = true;
                }

                tile.setPosition(newPosition);
                tile.x = newPosition.x;
                tile.y = newPosition.y;
            }

        }

        // verify game
        if (didTilesMoved) {
            _placeNewRandomTile();
        }

        if (!_anyMovesAvailable()) {
            props.gameOver = true;
        }

    }

    function _setupBeforeMove() {
        props.tiles.sort((a, b) => {
            if (a.x === b.x) return a.y - b.y;
            return a.x - b.x;
        });

        props.tiles.forEach((tile) => {
            tile.merged = false;
        });
    }

    function _anyMovesAvailable() {
        for (let i = 1; i < gameSize * gameSize; i++) {
            let tile = _tileAtIndex(i);

            if (tile) {

                let directions = [{x: 1, y: 0}, {x: -1, y: 0}, {x: 0, y: 1}, {x: 0, y: -1}];

                for (let directionIndex in directions) {
                    let direction = directions[directionIndex];
                    let tilePosition = tile.getPosition();
                    let position = { x: tilePosition.x + direction.x, y: tilePosition.y + direction.y };
                    let possibleMatch = _tileAtPosition(position);
                    if (possibleMatch && possibleMatch.getValue() === tile.getValue()) {
                        return true;
                    }
                }
            } else {
                return true;
            }
        }
        return false;
    }

    /**
     * Maps tiles array to an array of positions
     * @param direction
     * @returns {[*,*,*,*]}
     * @private
     */
    function _orderedTilesWithDirection(direction) {
        if (direction.x === -1.0) {
            let section1 = [];
            let section2 = [];
            let section3 = [];
            let section4 = [];

            for (let index in props.tiles) {
                let tile = props.tiles[index];
                if (tile.getY() === 1) {
                    section1.push(tile.getPosition())
                } else if (tile.getY() === 2) {
                    section2.push(tile.getPosition())
                } else if (tile.getY() === 3) {
                    section3.push(tile.getPosition())
                } else if (tile.getY() === 4) {
                    section4.push(tile.getPosition())
                }
            }
            return [...section1, ...section2, ...section3, ...section4];
        } else if (direction.x === 1.0) {
            let section1 = [];
            let section2 = [];
            let section3 = [];
            let section4 = [];

            for (let index in props.tiles) {
                let tile = props.tiles[index];
                if (tile.getY() === 1) {
                    section1.push(tile.getPosition())
                } else if (tile.getY() === 2) {
                    section2.push(tile.getPosition())
                } else if (tile.getY() === 3) {
                    section3.push(tile.getPosition())
                } else if (tile.getY() === 4) {
                    section4.push(tile.getPosition())
                }
            }
            section1.reverse();
            section2.reverse();
            section3.reverse();
            section4.reverse();
            return [...section1, ...section2, ...section3, ...section4]
        } else if (direction.y === 1.0) {
            let section1 = [];
            let section2 = [];
            let section3 = [];
            let section4 = [];

            for (let index in props.tiles) {
                let tile = props.tiles[index];
                if (tile.getX() === 1) {
                    section1.push(tile.getPosition())
                } else if (tile.getX() === 2) {
                    section2.push(tile.getPosition())
                } else if (tile.getX() === 3) {
                    section3.push(tile.getPosition())
                } else if (tile.getX() === 4) {
                    section4.push(tile.getPosition())
                }
            }
            section1.reverse();
            section2.reverse();
            section3.reverse();
            section4.reverse();
            return [...section1, ...section2, ...section3, ...section4];
        } else if (direction.y === -1.0) {
            let section1 = [];
            let section2 = [];
            let section3 = [];
            let section4 = [];

            for (let index in props.tiles) {
                let tile = props.tiles[index];
                if (tile.getX() === 1) {
                    section1.push(tile.getPosition())
                } else if (tile.getX() === 2) {
                    section2.push(tile.getPosition())
                } else if (tile.getX() === 3) {
                    section3.push(tile.getPosition())
                } else if (tile.getX() === 4) {
                    section4.push(tile.getPosition())
                }
            }

            return [...section1, ...section2, ...section3, ...section4];
        }
    }

    function _isAllowedToMoveAt(position) {
        for (let i = 0; i < props.tiles.length; i++) {
            let tile = props.tiles[i];
            if (tile.getX() === position.x && tile.getY() === position.y) {
                return false;
            }
        }
        return true;
    }

    /**
     * Resets the available tiles from game
     * @private
     */
    function _resetAvailableTiles() {
        availableTiles = [];
        for (let i = 1; i <= gameSize; i++) {
            for (let j = 1; j <= gameSize; j++) {
                let position = {x: i, y: j};
                let emptyTile = Tile(null, position);
                availableTiles.push(emptyTile);
            }
        }
    }

    function _reCalculateAvailableTiles() {
        availableTiles = [];
        for (let i = 1; i <= gameSize * gameSize; i++) {
            if (_isTileAvailableAtIndex(i)) {
                let position = _indexToPosition(i);
                availableTiles.push(Tile(null, position));
            }
        }
    }

    function _indexToPosition(i) {
        let x = (i / 4) % 1 / 0.25 + 1;
        let y = Math.ceil(i / 4);
        return {
            x,
            y
        }
    }

    function _tileAtPosition(position) {
        for (let index in props.tiles) {
            if (props.tiles[index].getX() === position.x && props.tiles[index].getY() === position.y) {
                return props.tiles[index];
            }
        }
        return null;
    }

    function _isTileAvailableAtIndex(i) {
        let position = _indexToPosition(i);
        for (let index in props.tiles) {
            if (props.tiles[index].getX() === position.x && props.tiles[index].getY() === position.y) {
                return false;
            }
        }
        return true;
    }

    function _tileAtIndex(i) {
        let position = _indexToPosition(i);
        for (let index in props.tiles) {
            if (props.tiles[index].getX() === position.x && props.tiles[index].getY() === position.y) {
                return props.tiles[index];
            }
        }
        return null;
    }

    /**
     * Returns an available tile and removes it from the available tiles array
     * @returns {*}
     * @private
     */
    function _getRandomAvailableTile() {
        if (!availableTiles.length) {
            return null; // quick exit
        }
        let randomPosition = randomNumberHelper(0, availableTiles.length - 1);
        return availableTiles.splice(randomPosition, 1)[0];
    }

    /**
     * Initializes new game tiles
     * @private
     */
    function _placeStarterTiles() {
        let position1 = _getRandomAvailableTile().getPosition();
        let tile1 = Tile(4, {x: position1.x, y: position1.y});

        let position2 = _getRandomAvailableTile().getPosition();
        let tile2 = Tile(2, {x: position2.x, y: position2.y});

        props.tiles.push(tile1);
        props.tiles.push(tile2);
    }

    /**
     * Recreates a new game
     * @private
     */
    function _initGame() {
        props.gameOver = false;
        props.finished = false;

        props.tiles.splice(0, tiles.length);
        props.currentScore = 0;

        _resetAvailableTiles();
        _placeStarterTiles();
        _loadHighScore();
    }


    function _placeNewRandomTile() {
        _reCalculateAvailableTiles();

        let newAvailableTile = _getRandomAvailableTile();
        if (newAvailableTile) {
            let newTile = Tile(2, newAvailableTile.getPosition());
            props.tiles.push(newTile);
        }
    }

    function _placeNewTile(tile) {
        props.tiles.push(tile);
    }

    function _deleteTile(tile) {
        for (let index in props.tiles) {
            if (props.tiles[index].getX() === tile.getX() && props.tiles[index].getY() === tile.getY()) {
                props.tiles.splice(index, 1);
                break;
            }
        }
    }

    function _loadHighScore() {
        props.highScore = $window.localStorage.getItem('tfe.highScore') || 0;
    }

    function _verifyHighScore() {
        let localHighScore = $window.localStorage.getItem('tfe.highScore');
        if (!localHighScore) {
            $window.localStorage.setItem('tfe.highScore', props.currentScore);
            props.highScore = props.currentScore;
            return;
        }
        if (props.highScore <= props.currentScore) {
            $window.localStorage.setItem('tfe.highScore', props.currentScore);
            props.highScore = props.currentScore;
        }
    }
    
};

