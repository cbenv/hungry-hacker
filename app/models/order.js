var mongoose = require('mongoose');

module.exports = mongoose.model('Order', {
    items: [{
        itemID: {
            type: String,
            default: ''
        },
        name: {
            type: String,
            default: ''
        },
        price: {
            type: Number,
            default: 0
        },
        quantity: {
            type: Number,
            default: 0
        }
    }],
    total: Number,
    timePlaced: {
        type: Date,
        default: Date.now
    }
});