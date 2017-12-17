/**
 * Created by dannyyassine
 */
import angular from 'angular';
import AppComponent from './app.component';
import AppController from './app.controller';

AppController.$inject = ['$scope', 'gameService'];

AppComponent.controller = AppController;

angular.module('twentyFortyEight')
    .component('app', AppComponent);
