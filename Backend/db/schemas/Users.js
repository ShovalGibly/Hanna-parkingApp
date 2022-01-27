const mongoose = require('mongoose');
const CarModel = require('./Car');

const userSchema = mongoose.Schema({
    email: {
        type: 'string',
        unique: true,
        required: true
    },
    password: {
        type: 'string',
        required: true,
        minLength: 8
    },
    fullName: {
        type: 'string',
        required: true,
    },
    points: {
        type: 'number',
    },
    userType: {
        type: 'string',
        enum: ['admin', 'regular'],
        default: 'regular'
    },
    cars: {
        type: [Car],
        default: []
    }
});

module.exports = mongoose.model('User', userSchema);