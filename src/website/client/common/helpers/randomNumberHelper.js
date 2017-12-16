/**
 * Created by dannyyassine
 */

const randomNumberHelper = (function (leftBound, rightBound) {

    return Math.floor(Math.random() * (rightBound - leftBound) + leftBound);

});

export default randomNumberHelper;