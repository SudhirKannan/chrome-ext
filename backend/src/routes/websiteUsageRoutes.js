const express = require('express');
const router = express.Router();
const websiteUsageController = require('../controllers/websiteUsageController');

// Website usage routes
router.post('/', websiteUsageController.addWebsiteUsage);
router.get('/', websiteUsageController.getWebsiteUsage);
router.get('/report', websiteUsageController.getProductivityReport);

module.exports = router; 