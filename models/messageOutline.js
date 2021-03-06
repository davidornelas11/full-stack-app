const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    title: { type: String, required: true }, 
    name: { type: String, required: true },
    message: { type: String, required: true },
    created: {type: Date, default: Date.now()}
}, { timestamps: true })

const Message = mongoose.model('Message', messageSchema)

module.exports = Message