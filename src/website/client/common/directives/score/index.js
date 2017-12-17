/**
 * Created by dannyyassine
 */
const angular = require('angular');
const ScoreDirective = require('./score.directive');

angular.module('twentyFortyEight.directives')
    .directive('dyScore', ScoreDirective);
