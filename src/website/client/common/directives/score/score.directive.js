/**
 * Created by dannyyassine
 */

const ScoreDirective = (function () {
    let directive = {
        link: link,
        restrict: 'EA',
        replace: true,
        scope: {
            title: "@",
            points: "<"
        },
        template: require('./template.html')
    };

    function link(scope, element, attr) {

    }

    return directive;
});

module.exports = ScoreDirective;