const BlockedSite = require('../models/BlockedSite');

// Add new blocked site
exports.addBlockedSite = async (req, res) => {
    try {
        const { deviceId, url, reason } = req.body;
        const blockedSite = new BlockedSite({
            deviceId,
            url,
            reason
        });
        await blockedSite.save();
        res.status(201).json(blockedSite);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all blocked sites for a device
exports.getBlockedSites = async (req, res) => {
    try {
        const { deviceId } = req.query;
        const blockedSites = await BlockedSite.find({
            deviceId,
            isActive: true
        });
        res.json(blockedSites);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update blocked site
exports.updateBlockedSite = async (req, res) => {
    try {
        const { id } = req.params;
        const { deviceId } = req.query;
        
        const blockedSite = await BlockedSite.findOneAndUpdate(
            { _id: id, deviceId },
            req.body,
            { new: true }
        );
        
        if (!blockedSite) {
            return res.status(404).json({ message: 'Blocked site not found' });
        }
        res.json(blockedSite);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete blocked site (soft delete)
exports.deleteBlockedSite = async (req, res) => {
    try {
        const { id } = req.params;
        const { deviceId } = req.query;
        
        const blockedSite = await BlockedSite.findOneAndUpdate(
            { _id: id, deviceId },
            { isActive: false },
            { new: true }
        );
        
        if (!blockedSite) {
            return res.status(404).json({ message: 'Blocked site not found' });
        }
        res.json({ message: 'Blocked site deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 