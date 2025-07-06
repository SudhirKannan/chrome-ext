const mongoose = require('mongoose');

const websiteUsageSchema = new mongoose.Schema({
    deviceId: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    timeSpent: {
        type: Number, // in seconds
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    }
}, {
    timestamps: true
});

// Index for faster queries
websiteUsageSchema.index({ deviceId: 1, timestamp: -1 });

module.exports = mongoose.model('WebsiteUsage', websiteUsageSchema); 