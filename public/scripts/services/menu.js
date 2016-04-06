(function () {

    "use strict";

    var app = angular.module('app');

    app.factory('MenuService', ['$http', '$q', MenuService]);

    function MenuService($http, $q) {

        var service = {
            getItems: getItems,
            addItem: addItem,
            removeItem: removeItem
        };

        // List all food items in the menu
        function getItems() {
            var deferred = $q.defer();
            function onSuccess(response) {
                deferred.resolve(response.data);
            }
            function onFailure(response) {
                deferred.reject(response.status);
            }
            $http.get('/api/menu').then(onSuccess, onFailure);
            return deferred.promise;
        }
        
        // Introduce a food item in the menu
        function addItem(item) {
            var deferred = $q.defer();
            function onSuccess(response) {
                deferred.resolve(response.data);
            }
            function onFailure(response) {
                deferred.reject(response.status);
            }
            $http.post('/api/menu', item).then(onSuccess, onFailure);
            return deferred.promise;
        }
        
        // Remove a food item from the menu
        function removeItem(item) {
            var deferred = $q.defer();
            function onSuccess(response) {
                deferred.resolve(response.data);
            }
            function onFailure(response) {
                deferred.reject(response.status);
            }
            $http.delete('/api/menu/' + item._id).then(onSuccess, onFailure);
            return deferred.promise;
        }

        return service;
    };

})();