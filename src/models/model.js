const mongoose = require('mongoose')

const modelSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    json: {
        type: Object,
        required: true
    }
})

const Model = mongoose.model('Model', modelSchema)

module.exports = { Model, modelSchema }