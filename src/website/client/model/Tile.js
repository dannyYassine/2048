/**
 * Created by dannyyassine
 */
import uuidHelper from './uuid';

export default Tile;
function Tile(point, initialPosition, didMerged) {

    let id = uuidHelper.generate();
    let position = initialPosition;
    let value = point || 2;
    let merged = didMerged || false;
    let x = 1;
    let y = 1;

    return {
        id,
        x: position.x,
        y: position.y,
        merged,
        getValue:   getValue,
        setValue: setValue,
        getPosition: getPosition,
        getX:       getX,
        getY:       getY,
        setX:       setX,
        setY:       setY,
        setPosition: setPosition
    };

    function getValue() {
        return value;
    }

    function setValue(val) {
        value = val;
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

    function setPosition(newPosition) {
        position = newPosition;
        x = position.x;
        y = position.y;
        // position.x = newPosition.x;
        // position.y = newPosition.y;
    }

    function setX(newX) {
        console.log(newX);
        if (newX < 1 || newX > 4) { return; }
        position.x = newX;
    }

    function setY(newY) {
        if (newY < 1 || newY > 4) { return; }
        position.y = newY;
    }

};