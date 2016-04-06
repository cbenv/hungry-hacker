(function () {

    "use strict";

    var app = angular.module('app');

    app.controller('OrderController', ['OrderService', OrderController]);

    function OrderController(OrderService) {

        var model = this;
        
        // Get all orders that have been placed
        function fetchOrders() {
            function onSuccess(orders) {
                model.orders = orders;
                model.sort = '-timePlaced';
            }
            function onFailure(error) {
                
            }
            OrderService.getOrders().then(onSuccess, onFailure);
        }
        
        // Specify the sorting configuration to be used
        model.sortOrder = function(sort) {
            model.sort = sort;
        }
        
        fetchOrders();
    }

})();