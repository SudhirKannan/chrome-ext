const express = require('express');
const router = express.Router();
const blockedSiteController = require('../controllers/blockedSiteController');

// Blocked site routes
router.post('/', blockedSiteController.addBlockedSite);
router.get('/', blockedSiteController.getBlockedSites);
router.put('/:id', blockedSiteController.updateBlockedSite);
router.delete('/:id', blockedSiteController.deleteBlockedSite);

module.exports = router; 