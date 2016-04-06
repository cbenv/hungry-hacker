(function () {

    "use strict";

    var app = angular.module('app', ['ngRoute', 'ui.bootstrap']);

    app.config(function ($routeProvider) {

        $routeProvider.when('/home', {
            templateUrl: 'templates/home.html',
            controller: 'HomeController',
            controllerAs: 'model'
        });
        
        $routeProvider.when('/menu', {
            templateUrl: 'templates/menu.html',
            controller: 'MenuController',
            controllerAs: 'model'
        });
        
        $routeProvider.when('/order', {
            templateUrl: 'templates/order.html',
            controller: 'OrderController',
            controllerAs: 'model'
        });
        
        $routeProvider.when('/analytics', {
            templateUrl: 'templates/analytics.html',
            controller: 'AnalyticsController',
            controllerAs: 'model'
        });
        
        $routeProvider.otherwise('/home');

    });

})();