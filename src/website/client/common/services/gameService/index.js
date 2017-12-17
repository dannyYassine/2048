/**
 * Created by dannyyassine
 */
import angular from 'angular';
import GameService from './game.service';

GameService.$inject = ['$window'];

angular.module('twentyFortyEight.services')
    .service('gameService', GameService);
