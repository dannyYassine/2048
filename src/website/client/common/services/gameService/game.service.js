/**
 * Created by dannyyassine
 */

import Tile from './../../../model/Tile';
import randomNumberHelper from './../../helpers/randomNumberHelper';

export default function GameService() {
    /**
     * Placed tiles on screen
     * @type {Array}
     */
    let tiles = [];

    /**
     * Player score
     * @type {number}
     */
    let currentScore = 4;

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
    let props = {
        tiles,
        currentScore,
        isGameOver: gameOver,
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
        let didTilesMoved = true;

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

            if (nextTile && nextTile.getValue() === tile.getValue() && !nextTile.isMerged) {
                didTilesMoved = true;
                nextTile.setValue(tile.getValue() * 2);
                nextTile.setMerged(true);
                _deleteTile(tile);

                // let newPosition = tile.getPosition();
                // let newTile = Tile(updatedValue, {x: newPosition.x, y: newPosition.y}, true);

                // tiles.push(newTile);

                // newTile.setPosition(newPosition);
                // newTile.x = newPosition.x;
                // newTile.y = newPosition.y;

                props.currentScore += nextTile.getValue();

                if (currentScore >= scoreToWin) {
                    finished = true;
                }

            } else {
                // Move tile
                //TODO: positon internal not updating
                tile.setPosition(newPosition);
                tile.x = newPosition.x;
                tile.y = newPosition.y;

            }

        }

        // verify game
        if (didTilesMoved) {
            _placeNewRandomTile();
        }

    }

    function _setupBeforeMove() {
        tiles.sort((a, b) => {
            if (a.x === b.x) return a.y - b.y;
            return a.x - b.x;
        });
    }
    
    function _orderedTilesWithDirection(direction) {
        if (direction.x === -1.0) {
            let section1 = [];
            let section2 = [];
            let section3 = [];
            let section4 = [];

            for (let index in tiles) {
                let tile = tiles[index];
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

            for (let index in tiles) {
                let tile = tiles[index];
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

            for (let index in tiles) {
                let tile = tiles[index];
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

            for (let index in tiles) {
                let tile = tiles[index];
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
        for (let i = 0; i < tiles.length; i++) {
            let tile = tiles[i];
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
        for (let index in tiles) {
            if (tiles[index].getX() === position.x && tiles[index].getY() === position.y) {
                return tiles[index];
            }
        }
        return null;
    }

    function _isTileAvailableAtIndex(i) {
        let position = _indexToPosition(i);
        for (let index in tiles) {
            if (tiles[index].getX() === position.x && tiles[index].getY() === position.y) {
                return false;
            }
        }
        return true;
    }

    function _removeAvailableTile(tile) {
        for (let index in availableTiles) {
            if (availableTiles[index].getPosition() === tile.getPosition()) {
                availableTiles.splice(index, 1);
                break;
            }
        }
    }

    function _addAvailableTile(tile) {
        let emptyTile = Tile(null, tile.getPosition());
        availableTiles.push(emptyTile);
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

        tiles.push(tile1);
        tiles.push(tile2);

        props.currentScore = 4;
    }

    /**
     * Recreates a new game
     * @private
     */
    function _initGame() {
        _resetAvailableTiles();
        _placeStarterTiles();
    }

    function _getTileIndex(tile) {
        return tile.getY * gameSize + tile.getX();
    }

    function _placeNewRandomTile() {
        _reCalculateAvailableTiles();

        let newAvailableTile = _getRandomAvailableTile();
        if (newAvailableTile) {
            let newTile = Tile(2, newAvailableTile.getPosition());
            tiles.push(newTile);
        }
    }

    function _placeNewTile(tile) {
        tiles.push(tile);
    }

    function _deleteTile(tile) {
        for (let index in tiles) {
            if (tiles[index].getX() === tile.getX() && tiles[index].getY() === tile.getY()) {
                tiles.splice(index, 1);
                break;
            }
        }
    }
    
};
