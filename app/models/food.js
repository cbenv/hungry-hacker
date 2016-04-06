var mongoose = require('mongoose');

module.exports = mongoose.model('Food', {
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
    }
});