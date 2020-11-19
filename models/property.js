const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    room: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    rent: {
        type: Number,
        required: true
    },
    landlord: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Landlord'
    }
})

const Property = mongoose.model('Property', propertySchema);
module.exports = Property;