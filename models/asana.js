const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const asanaSchema = new mongoose.Schema({
    createdBy: {type: Schema.Types.ObjectId, ref: 'Yogi'},
    pose: {type: String, required: true, unique: true},
    anatomy: String,
    benefits: [String],
}, {
    timestamps: true
});

module.exports = mongoose.model('Asana', asanaSchema);