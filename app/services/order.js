module.exports = function(app) {
    
    var Order = require('../models/order');
    
    app.get('/api/order', getOrders);
    app.post('/api/order', createOrder);
    
    // Get all orders that have been placed
    function getOrders(req, res) {
        function onSuccess(orders) { res.json(orders); }
        function onFailure(error) { res.send(error); }
        Order.find().exec().then(onSuccess, onFailure);
    }
    
    // Submit an order and record it
    function createOrder(req, res) {
        function onSuccess(orders) { getOrders(req, res); }
        function onFailure(error) { res.send(error); }
        Order.create(req.body).then(onSuccess, onFailure);
    }
};