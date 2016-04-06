module.exports = function(app) {

    require('./services/food')(app)
    require('./services/menu')(app)
    require('./services/order')(app)
};