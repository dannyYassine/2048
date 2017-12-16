/**
 * Created by dannyyassine
 */
import angular from 'angular';
import GridComponent from './grid.component';
import GridController from './grid.controller';

GridComponent.controller = GridController;

GridComponent.$inject = ['$scope', '$document', 'gameService'];

angular.module('twentyFortyEight')
    .component('grid', GridComponent);
