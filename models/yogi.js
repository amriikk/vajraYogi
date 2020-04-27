const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const yogiSchema = new mongoose.Schema({
    name: String,
    email: String,
    avatar: String,
    googleId: String,
    flows: [{
        type: Schema.Types.ObjectId,
        ref: 'Flow'
    }],
    level: { type: Number, min: 1, max: 5, default: 5 },
}, {
    timestamps: true
});

module.exports = mongoose.model('Yogi', yogiSchema);