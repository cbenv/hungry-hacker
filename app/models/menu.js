var mongoose = require('mongoose');

module.exports = mongoose.model('Menu', {
    name: {
        type: String,
        default: ''
    },
    price: {
        type: Number,
        default: 0
    }
});