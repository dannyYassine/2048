/**
 * Created by dannyyassine
 */

const Tile = function (point, initialPosition) {

    let position = initialPosition;
    let value = point || 2;

    return {
        getValue:   getValue,
        getPosition: getPosition,
        getX:       getX,
        getY:       getY
    };

    function getValue() {
        return value;
    }

    function getPosition() {
        return position;
    }

    function getX() {
        return position.x;
    }

    function getY() {
        return position.y;
    }

};

export default Tile;