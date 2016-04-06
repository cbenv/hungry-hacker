(function () {

    "use strict";

    var app = angular.module('app');

    app.factory('OrderService', ['$http', '$q', OrderService]);

    function OrderService($http, $q) {

        var service = {
            getOrders: getOrders,
            createOrder: createOrder
        };

        // Get all orders that have been placed
        function getOrders() {
            var deferred = $q.defer();
            function onSuccess(response) {
                deferred.resolve(response.data);
            }
            function onFailure(response) {
                deferred.reject(response.status);
            }
            $http.get('/api/order').then(onSuccess, onFailure);
            return deferred.promise;
        }
        
        // Submit an order and record it
        function createOrder(order) {
            var deferred = $q.defer();
            function onSuccess(response) {
                deferred.resolve(response.data);
            }
            function onFailure(response) {
                deferred.reject(response.status);
            }
            $http.post('/api/order', order).then(onSuccess, onFailure);
            return deferred.promise;
        }
        
        return service;
    };

})();