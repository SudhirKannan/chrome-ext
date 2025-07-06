const mongoose = require('mongoose');

const blockedSiteSchema = new mongoose.Schema({
    deviceId: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    reason: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    }
}, {
    timestamps: true
});

// Index for faster queries
blockedSiteSchema.index({ deviceId: 1, url: 1 });

module.exports = mongoose.model('BlockedSite', blockedSiteSchema); 