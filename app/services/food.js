module.exports = function(app) {
    
    var Food = require('../models/food');
    
    app.get('/api/food', getFoods);
    app.post('/api/food', createFood);
    app.delete('/api/food/:foodID', deleteFood);
    app.delete('/api/food', deleteAll);
    app.get('/api/total', getTotalPrice);
    
    // Get all foods in the cart
    function getFoods(req, res) {
        function onSuccess(foods) { res.json(foods); }
        function onFailure(error) { res.send(error); }
        Food.find().exec().then(onSuccess, onFailure);
    }
    
    // Add a food to the cart
    function createFood(req, res) {
        function onSuccess(foods) { getFoods(req, res); }
        function onFailure(error) { res.send(error); }
        Food.create(req.body).then(onSuccess, onFailure);
    }
    
    // Remove a food from the cart 
    function deleteFood(req, res) {
        function onSuccess(foods) { getFoods(req, res); }
        function onFailure(error) { res.send(error); }
        Food.findByIdAndRemove(req.params.foodID).exec().then(onSuccess, onFailure);
    }
    
    // Remove all foods from the cart
    function deleteAll(req, res) {
        function onSuccess() { res.json([]); }
        function onFailure(error) { res.send(error); }
        Food.remove().exec().then(onSuccess, onFailure);
    }
    
    // Get the total price of all foods in the cart
    function getTotalPrice(req, res) {
        function onSuccess(foods) {
            var sum = 0;
            for (var i = 0; i < foods.length; i++) { sum += foods[i].price; }
            res.json({ total: 1.075 * sum });
        }
        function onFailure(error) { res.send(error); }
        Food.find().select('price').exec().then(onSuccess, onFailure);
    }
};