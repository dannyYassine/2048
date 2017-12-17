/**
 * Created by dannyyassine
 */

import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import swipe from 'angular-swipe';

require('./common/directives');
require('./common/filters');
require('./common/services');
require('./common/components');

/**
 * Set Angular client
 */
let app = angular.module('twentyFortyEight',
    [
        uiRouter,
        'swipe',

        'twentyFortyEight.services',
        'twentyFortyEight.components',
        'twentyFortyEight.filters',
        'twentyFortyEight.directives'
    ]);

require('./modules');

/**
 * Build config phase
 */
app
    .config(configLocationProvider)
    .config(configRouterProvider)
    .config(configAppRootRoutes);

/**
 *
 * @param $locationProvider
 */
function configLocationProvider ($locationProvider) {
    $locationProvider.html5Mode(true);
}
configLocationProvider.$inject = ['$locationProvider'];

/**
 *
 * @param $urlRouterProvider
 */
function configRouterProvider($urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
}
configRouterProvider.$inject = ['$urlRouterProvider'];

/**
 *
 * @param $stateProvider
 */
function configAppRootRoutes($stateProvider) {

}