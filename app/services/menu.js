module.exports = function(app) {
    
    var Menu = require('../models/menu');
    
    app.get('/api/menu', getItems);
    app.post('/api/menu', addItem);
    app.delete('/api/menu/:itemID', deleteItem);
    
    // Get all food items in the menu
    function getItems(req, res) {
        function onSuccess(items) { res.json(items); }
        function onFailure(error) { res.send(error); }
        Menu.find().exec().then(onSuccess, onFailure);
    }
    
    // Introduce a food item to the menu
    function addItem(req, res) {
        function onSuccess(items) { getItems(req, res); }
        function onFailure(error) { res.send(error); }
        Menu.create(req.body).then(onSuccess, onFailure);
    }
    
    // Remove a food item from the menu
    function deleteItem(req, res) {
        function onSuccess(items) { getItems(req, res); }
        function onFailure(error) { res.send(error); }
        Menu.findByIdAndRemove(req.params.itemID).exec().then(onSuccess, onFailure);
    }
};