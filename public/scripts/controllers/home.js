(function () {

    "use strict";

    var app = angular.module('app');

    app.controller('HomeController', ['$http', 'FoodService', 'MenuService', 'OrderService', HomeController]);

    function HomeController($http, FoodService, MenuService, OrderService) {

        var model = this;
        
        // Get the items in the menu
        function fetchMenu() {
            function onSuccess(items) {
                model.items = items;
            }
            function onFailure(error) {
                console.log(error);
            }
            MenuService.getItems().then(onSuccess, onFailure);
        }
        
        // Get the contents of the cart
        function fetchCart() {
            function onSuccess(items) {
                model.cart = items;
                model.calculateTotal();
            }
            function onFailure(error) {
                console.log(error);
            }
            FoodService.getAll().then(onSuccess, onFailure);
        }
        
        // Process cart to order, grouping same items into one and update the quantity field
        function compileOrder(cart) {
            var temp = {};
            var item, itemID;
            for (var i = 0; i < cart.length; i++) {
                item = cart[i];
                itemID = item.itemID;
                temp[itemID] = temp[itemID] || {};
                temp[itemID].name = item.name;
                temp[itemID].price = item.price;
                temp[itemID].quantity = (temp[itemID].quantity || 0) + 1; 
            }
            var order = {
                items: [],
                total: model.total
            }
            for (var a in temp) {
                order.items.push({
                    itemID: a,
                    name: temp[a].name,
                    price: temp[a].price,
                    quantity: temp[a].quantity
                });
            }
            return order;
        }
        
        // Calculate the total price of all items in the cart
        model.calculateTotal = function() {
            function onSuccess(data) {
                model.total = data.total;
            }
            function onFailure(error) {
                console.log(error);
            }
            FoodService.getTotalPrice().then(onSuccess, onFailure);
        }
        
        // Add item to the cart
        model.addItem = function(item) {
            function onSuccess(items) {
                model.cart = items;
                model.calculateTotal();
            }
            function onFailure(error) {
                console.log(error);
            }
            FoodService.create({
                itemID: item._id,
                name: item.name,
                price: item.price
            }).then(onSuccess, onFailure);
        }
        
        // Remove item from the cart
        model.removeItem = function(item) {
            function onSuccess(items) {
                model.cart = items;
                model.calculateTotal();
            }
            function onFailure(error) {
                console.log(error);
            }
            FoodService.remove(item).then(onSuccess, onFailure);
        }
        
        // Submit and record an order, then clear the cart upon completion
        model.submitOrder = function(cart) {
            function onSuccess(orders) {
                FoodService.removeAll().then(onSuccess2, onFailure);
            }
            function onSuccess2(items) {
                model.cart = items;
                model.calculateTotal();
            }
            function onFailure(error) {
                console.log(error);
            }
            var order = compileOrder(cart);
            OrderService.createOrder(order).then(onSuccess, onFailure);
        }
        
        fetchMenu();
        fetchCart();
    }

})();
    
    
    