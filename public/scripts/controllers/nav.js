(function () {

    "use strict";

    var app = angular.module('app');

    app.controller('NavigationController', ['$location', NavigationController]);

    function NavigationController($location) {

        var model = this;
        
        // Record the location to be used to deterimine active navigation button
        model.location = $location;
    }

})();