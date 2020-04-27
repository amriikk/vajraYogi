const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flowSchema = new mongoose.Schema({
    name: String,
    asanas: [{type: Schema.Types.ObjectId, ref: 'Asana'}]
}, {
    timestamps: true
});

module.exports = mongoose.model('Flow', flowSchema);