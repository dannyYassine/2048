/**
 * Created by dannyyassine
 */
import angular from 'angular';
import TileComponent from './tile.component';

TileComponent.$inject = ['$scope'];

angular.module('twentyFortyEight')
    .component('tile', TileComponent);
