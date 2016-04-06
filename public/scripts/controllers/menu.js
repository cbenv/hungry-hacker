(function () {

    "use strict";

    var app = angular.module('app');

    app.controller('MenuController', ['MenuService', MenuController]);

    function MenuController(MenuService) {

        var model = this;
        
        // Get the items in the menu
        function fetchMenu() {
            function onSuccess(items) {
                model.newItem = {};
                model.items = items;
            }
            function onFailure(error) {
                
            }
            MenuService.getItems().then(onSuccess, onFailure);
        }
        
        // Remove a food item from the menu
        model.remove = function(item) {
            function onSuccess(items) {
                model.items = items;
            }
            function onFailure(error) {
                
            }
            MenuService.removeItem(item).then(onSuccess, onFailure);
        }
        
        // Introduce a food item to the menu
        model.add = function(item) {
            function onSuccess(items) {
                model.newItem = {};
                model.items = items;
            }
            function onFailure(error) {
                
            }
            MenuService.addItem(item).then(onSuccess, onFailure);
        }
        
        fetchMenu();
    }

})();