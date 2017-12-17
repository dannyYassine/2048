/**
 * Created by dannyyassine
 */
import angular from 'angular';
import AppComponent from './app.component';
import AppController from './app.controller';

AppComponent.controller = AppController;
AppController.$inject = ['$scope', 'gameService'];

angular.module('twentyFortyEight')
    .component('app', AppComponent);
