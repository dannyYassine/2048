/**
 * Created by dannyyassine
 */
import angular from 'angular';
import TileComponent from './tile.component';
import TileController from './tile.controller';

TileComponent.$inject = ['$timeout'];
TileComponent.controller = TileController;

angular.module('twentyFortyEight')
    .component('tile', TileComponent);
