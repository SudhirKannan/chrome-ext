/* global chrome */
import React, { useState, useEffect, useCallback } from 'react';
import { BarChart2, Plus, Trash2, Clock, Shield } from "lucide-react";
import './Popup.css';

const API_URL = import.meta.env.VITE_API_URL;

const Popup = () => {
  const [deviceId, setDeviceId] = useState('');
  const [blockedSites, setBlockedSites] = useState([]);
  const [newBlockedSite, setNewBlockedSite] = useState({ url: '', reason: '' });
  const [report, setReport] = useState([]);
  const [period, setPeriod] = useState('daily');
  const [loading, setLoading] = useState(false);

  const loadData = useCallback(async () => {
    if (!deviceId) return;
    setLoading(true);
    try {
      await fetch(`${API_URL}/api/website-usage?deviceId=${deviceId}`);
      const blockedResponse = await fetch(`${API_URL}/api/blocked-sites?deviceId=${deviceId}`);
      setBlockedSites(await blockedResponse.json());
      const reportResponse = await fetch(`${API_URL}/api/website-usage/report?deviceId=${deviceId}&period=${period}`);
      setReport(await reportResponse.json());
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  }, [deviceId, period]);

  useEffect(() => {
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.local.get('deviceId', (result) => {
        if (result.deviceId) {
          setDeviceId(result.deviceId);
        } else {
          const newDeviceId = crypto.randomUUID();
          chrome.storage.local.set({ deviceId: newDeviceId }, () => setDeviceId(newDeviceId));
        }
      });
    } else {
      const mockDeviceId = 'dev-' + crypto.randomUUID();
      setDeviceId(mockDeviceId);
      console.log('Running in development mode with mock device ID:', mockDeviceId);
    }
  }, []);

  useEffect(() => {
    if (deviceId) loadData();
  }, [deviceId, period, loadData]);

  const handleAddBlockedSite = async (e) => {
    e.preventDefault();
    if (!newBlockedSite.url.trim() || !newBlockedSite.reason.trim()) return;
    
    setLoading(true);
    try {
      await fetch(`${API_URL}/api/blocked-sites`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deviceId, ...newBlockedSite })
      });
      setNewBlockedSite({ url: '', reason: '' });
      loadData();
    } catch (error) {
      console.error('Error adding blocked site:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveBlockedSite = async (id) => {
    setLoading(true);
    try {
      await fetch(`${API_URL}/api/blocked-sites/${id}?deviceId=${deviceId}`, { method: 'DELETE' });
      loadData();
    } catch (error) {
      console.error('Error removing blocked site:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const getTotalTime = () => {
    return report.reduce((total, site) => total + site.totalTime, 0);
  };

  return (
    <div className="popup">
      <div className="header">
        <div className="header-content">
          <Shield className="h-8 w-8 text-white" />
          <div>
            <h1 className="header-title">Productivity Shield</h1>
            <p className="header-subtitle">Focus on what matters</p>
          </div>
        </div>
      </div>

      <div className="main-content">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-header">
              <Clock className="h-5 w-5 text-indigo-500" />
              <span className="stat-label">Total Time</span>
            </div>
            <div className="stat-value">
              {loading ? (
                <div className="loading" />
              ) : (
                formatTime(getTotalTime())
              )}
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-header">
              <Shield className="h-5 w-5 text-red-500" />
              <span className="stat-label">Blocked Sites</span>
            </div>
            <div className="stat-value">
              {loading ? (
                <div className="loading" />
              ) : (
                blockedSites.length
              )}
            </div>
          </div>
        </div>

        <div className="section">
          <div className="section-header">
            <h2 className="section-title">
              <BarChart2 className="h-5 w-5 text-indigo-500" />
              Activity Report
            </h2>
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              disabled={loading}
              className="input"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>
          <div className="section-content">
            {loading ? (
              <div className="loading" />
            ) : report.length === 0 ? (
              <div className="empty-state">
                <BarChart2 className="empty-state-icon h-8 w-8" />
                <p className="empty-state-text">No activity data yet</p>
                <p className="empty-state-subtext">Start browsing to track activity</p>
              </div>
            ) : (
              <div className="section-content">
                {report.slice(0, 5).map((site, index) => (
                  <div key={index} className="blocked-site">
                    <div className="blocked-site-info">
                      <p className="blocked-site-url">{site.domain}</p>
                      <p className="blocked-site-reason">{formatTime(site.totalTime)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="section">
          <div className="section-header">
            <h2 className="section-title">
              <Shield className="h-5 w-5 text-red-500" />
              Blocked Sites
            </h2>
          </div>
          <div className="section-content">
            <input
              type="url"
              placeholder="e.g., facebook.com"
              value={newBlockedSite.url}
              onChange={(e) => setNewBlockedSite({ ...newBlockedSite, url: e.target.value })}
              className="input"
              disabled={loading}
            />
            <input
              type="text"
              placeholder="Reason (e.g., Distraction)"
              value={newBlockedSite.reason}
              onChange={(e) => setNewBlockedSite({ ...newBlockedSite, reason: e.target.value })}
              className="input"
              disabled={loading}
            />
            <button
              onClick={handleAddBlockedSite}
              disabled={loading || !newBlockedSite.url.trim() || !newBlockedSite.reason.trim()}
              className="button"
            >
              <div className="button-content">
                {loading ? (
                  <div className="loading" />
                ) : (
                  <Plus className="h-4 w-4" />
                )}
                {loading ? 'Adding...' : 'Block Site'}
              </div>
            </button>

            <div className="section-content">
              {blockedSites.length === 0 ? (
                <div className="empty-state">
                  <Shield className="empty-state-icon h-8 w-8" />
                  <p className="empty-state-text">No sites blocked yet</p>
                  <p className="empty-state-subtext">Add sites to block distractions</p>
                </div>
              ) : (
                blockedSites.map((site) => (
                  <div key={site._id} className="blocked-site">
                    <div className="blocked-site-info">
                      <p className="blocked-site-url">{site.url}</p>
                      <p className="blocked-site-reason">{site.reason}</p>
                    </div>
                    <button
                      onClick={() => handleRemoveBlockedSite(site._id)}
                      disabled={loading}
                      className="remove-button"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;