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
        scope.$watch('points', function (nv, ov) {
            if (nv > ov) {
                let diff = nv - ov;
                element.append('<div class="score-added">+' + diff + '</div>');
            }
        });
    }

    return directive;
});

module.exports = ScoreDirective;