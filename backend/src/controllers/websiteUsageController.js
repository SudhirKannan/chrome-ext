const WebsiteUsage = require('../models/WebsiteUsage');

// Add new website usage data
exports.addWebsiteUsage = async (req, res) => {
    try {
        const { deviceId, url, title, timeSpent } = req.body;
        const websiteUsage = new WebsiteUsage({
            deviceId,
            url,
            title,
            timeSpent
        });
        await websiteUsage.save();
        res.status(201).json(websiteUsage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get website usage data with optional date range
exports.getWebsiteUsage = async (req, res) => {
    try {
        const { deviceId, startDate, endDate } = req.query;
        let query = { deviceId };

        if (startDate && endDate) {
            query.timestamp = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            };
        }

        const usageData = await WebsiteUsage.find(query)
            .sort({ timestamp: -1 })
            .limit(100);
        res.json(usageData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get productivity report
exports.getProductivityReport = async (req, res) => {
    try {
        const { deviceId, period } = req.query; // 'daily' or 'weekly'
        const now = new Date();
        let startDate;

        if (period === 'daily') {
            startDate = new Date(now.setHours(0, 0, 0, 0));
        } else if (period === 'weekly') {
            startDate = new Date(now.setDate(now.getDate() - 7));
        } else {
            return res.status(400).json({ message: 'Invalid period specified' });
        }

        const usageData = await WebsiteUsage.find({
            deviceId,
            timestamp: { $gte: startDate }
        });

        // Group by website and calculate total time spent
        const report = usageData.reduce((acc, curr) => {
            const domain = new URL(curr.url).hostname;
            if (!acc[domain]) {
                acc[domain] = {
                    totalTime: 0,
                    visits: 0,
                    title: curr.title
                };
            }
            acc[domain].totalTime += curr.timeSpent;
            acc[domain].visits += 1;
            return acc;
        }, {});

        // Convert to array and sort by total time
        const sortedReport = Object.entries(report)
            .map(([domain, data]) => ({
                domain,
                ...data
            }))
            .sort((a, b) => b.totalTime - a.totalTime);

        res.json(sortedReport);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 