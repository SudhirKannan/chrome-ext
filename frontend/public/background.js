// Generate a unique device ID if not exists
chrome.runtime.onInstalled.addListener(async () => {
    const { deviceId } = await chrome.storage.local.get('deviceId');
    if (!deviceId) {
        const newDeviceId = crypto.randomUUID();
        await chrome.storage.local.set({ deviceId: newDeviceId });
    }
});

// Track website usage
let activeTab = null;
let startTime = null;

chrome.tabs.onActivated.addListener(async (activeInfo) => {
    if (activeTab && startTime) {
        const timeSpent = Math.floor((Date.now() - startTime) / 1000);
        const tab = await chrome.tabs.get(activeTab);
        if (tab.url && tab.url.startsWith('http')) {
            await saveWebsiteUsage(tab.url, tab.title, timeSpent);
        }
    }
    activeTab = activeInfo.tabId;
    startTime = Date.now();
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tabId === activeTab) {
        if (activeTab && startTime) {
            const timeSpent = Math.floor((Date.now() - startTime) / 1000);
            if (tab.url && tab.url.startsWith('http')) {
                await saveWebsiteUsage(tab.url, tab.title, timeSpent);
            }
        }
        startTime = Date.now();
    }
});

// Save website usage to backend
async function saveWebsiteUsage(url, title, timeSpent) {
    const { deviceId } = await chrome.storage.local.get('deviceId');
    try {
        await fetch('http://localhost:5000/api/website-usage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                deviceId,
                url,
                title,
                timeSpent
            })
        });
    } catch (error) {
        console.error('Error saving website usage:', error);
    }
}

// Check for blocked sites
chrome.webNavigation.onBeforeNavigate.addListener(async (details) => {
    const { deviceId } = await chrome.storage.local.get('deviceId');
    try {
        const response = await fetch(`http://localhost:5000/api/blocked-sites?deviceId=${deviceId}`);
        const blockedSites = await response.json();
        
        const isBlocked = blockedSites.some(site => 
            details.url.includes(site.url) && site.isActive
        );

        if (isBlocked) {
            chrome.tabs.update(details.tabId, {
                url: chrome.runtime.getURL('blocked.html')
            });
        }
    } catch (error) {
        console.error('Error checking blocked sites:', error);
    }
}, { url: [{ schemes: ['http', 'https'] }] }); 