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
    let currentScore = 0;

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
        score: currentScore
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

        _placeNewRandomTile();
    }
    
    function moveDown() {

        _placeNewRandomTile();
    }
    
    function moveLeft() {

        _placeNewRandomTile();
    }
    
    function moveRight() {

        _placeNewRandomTile();
    }

    /**
     * Resets the availbale tiles from game
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

    function _removeAvailableTile(tile) {
        for (let index in availableTiles) {
            if (availableTiles[index].getPosition() === tile.getPosition()) {
                availableTiles.splice(index, 1)
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
        let tile1 = Tile(2, position1);

        let position2 = _getRandomAvailableTile().getPosition();
        let tile2 = Tile(4, position2);

        tiles.push(tile1);
        tiles.push(tile2);
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
        let newAvailableTile = _getRandomAvailableTile();
        if (newAvailableTile) {
            let newTile = Tile(2, newAvailableTile.getPosition());
            tiles.push(newTile);
        }
        console.log(availableTiles);
    }

    function _placeNewTile(tile) {
        tiles.push(tile);
        _removeAvailableTile(tile)
    }

    function _deleteTile(tile) {
        let index = _getTileIndex(tile);
        availableTiles.splice(index, 1)
        _addAvailableTile(tile)
    }
    
};

