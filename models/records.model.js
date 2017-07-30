var mongoose = require('mongoose');
var crypto = require('crypto');

var schemaRecords = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    points: {
        type: Number,
        required: true
    },
    token: {
        type: String
    }
},{
    timestamp: true
});

schemaRecords.pre('save', function (next) {
    if (!this.token) {
        this.token = crypto.randomBytes(64).toString('hex');
        next(null);
    } else {
        next(null);
    }
});

module.exports = mongoose.model('record', schemaRecords);