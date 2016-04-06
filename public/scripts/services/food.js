(function () {

    "use strict";

    var app = angular.module('app');

    app.factory('FoodService', ['$http', '$q', FoodService]);

    function FoodService($http, $q) {

        var service = {
            getAll: getAll,
            create: create,
            remove: remove,
            removeAll: removeAll,
            getTotalPrice: getTotalPrice
        };
        
        // Get all foods in the cart
        function getAll() {
            var deferred = $q.defer();
            function onSuccess(response) {
                deferred.resolve(response.data);
            }
            function onFailure(response) {
                deferred.reject(response.status);
            }
            $http.get('/api/food').then(onSuccess, onFailure);
            return deferred.promise;
        }
        
        // Add a food to the cart
        function create(food) {
            var deferred = $q.defer();
            function onSuccess(response) {
                console.log('here2');
                deferred.resolve(response.data);
            }
            function onFailure(response) {
                deferred.reject(response.status);
            }
            $http.post('/api/food', food).then(onSuccess, onFailure);
            return deferred.promise;
        }
        
        // Remove a food from the cart
        function remove(food) {
            var deferred = $q.defer();
            function onSuccess(response) {
                deferred.resolve(response.data);
            }
            function onFailure(response) {
                deferred.reject(response.status);
            }
            $http.delete('/api/food/' + food._id).then(onSuccess, onFailure);
            return deferred.promise;
        }
        
        // Remove all foods from the cart
        function removeAll() {
            var deferred = $q.defer();
            function onSuccess(response) {
                deferred.resolve(response.data);
            }
            function onFailure(response) {
                deferred.reject(response.status);
            }
            $http.delete('/api/food').then(onSuccess, onFailure);
            return deferred.promise;
        }
        
        // Get total price for all foods in the cart
        function getTotalPrice() {
            var deferred = $q.defer();
            function onSuccess(response) {
                deferred.resolve(response.data);
            }
            function onFailure(response) {
                deferred.reject(response.status);
            }
            $http.get('/api/total').then(onSuccess, onFailure);
            return deferred.promise;
        }

        return service;
    };

})();