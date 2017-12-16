/**
 * Created by dannyyassine
 */
const angular = require('angular');

const FadeDirective = require('./fade.directive');

angular.module('twentyFortyEight.directives')
    .directive('dyFade', FadeDirective);
