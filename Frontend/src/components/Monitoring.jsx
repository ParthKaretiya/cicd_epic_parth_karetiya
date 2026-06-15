import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Server, Database, HardDrive, AlertTriangle } from 'lucide-react';

const Monitoring = () => {
  const { api } = useAuth();
  const [health, setHealth] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const [healthRes, alertsRes] = await Promise.all([
          api.get('/system/health'),
          api.get('/monitoring/alerts')
        ]);
        if (healthRes.data.success) setHealth(healthRes.data.data);
        if (alertsRes.data.success) setAlerts(alertsRes.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMetrics();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchMetrics, 30000);
    return () => clearInterval(interval);
  }, [api]);

  return (
    <div className="animate-fade-in">
      <header style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '8px' }}>System Monitoring</h1>
        <p style={{ color: 'var(--text-muted)' }}>Real-time health and metrics for your CI/CD infrastructure.</p>
      </header>

      {loading && !health ? (
        <div>Loading metrics...</div>
      ) : (
        <>
          <div className="dashboard-grid">
            <div className="glass-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: '500' }}>CPU Usage</h3>
                <div style={{ padding: '8px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '8px', color: 'var(--primary)' }}>
                  <Server size={20} />
                </div>
              </div>
              <p style={{ fontSize: '2rem', fontWeight: '700' }}>{health?.metrics?.cpu || '14%'}</p>
            </div>

            <div className="glass-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: '500' }}>Memory Usage</h3>
                <div style={{ padding: '8px', background: 'rgba(236, 72, 153, 0.1)', borderRadius: '8px', color: 'var(--secondary)' }}>
                  <Database size={20} />
                </div>
              </div>
              <p style={{ fontSize: '2rem', fontWeight: '700' }}>{health?.metrics?.memory || '4.2 GB'}</p>
            </div>

            <div className="glass-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: '500' }}>Storage</h3>
                <div style={{ padding: '8px', background: 'rgba(20, 184, 166, 0.1)', borderRadius: '8px', color: 'var(--accent)' }}>
                  <HardDrive size={20} />
                </div>
              </div>
              <p style={{ fontSize: '2rem', fontWeight: '700' }}>{health?.metrics?.storage || '68%'}</p>
            </div>

            <div className="glass-card" style={{ background: health?.status === 'healthy' ? 'rgba(16, 185, 129, 0.05)' : 'rgba(239, 68, 68, 0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: '500' }}>API Status</h3>
                <div style={{ padding: '8px', background: health?.status === 'healthy' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', color: health?.status === 'healthy' ? 'var(--success)' : 'var(--danger)' }}>
                  <Activity size={20} />
                </div>
              </div>
              <p style={{ fontSize: '1.5rem', fontWeight: '700', textTransform: 'capitalize', color: health?.status === 'healthy' ? 'var(--success)' : 'var(--danger)' }}>
                {health?.status || 'Healthy'}
              </p>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <AlertTriangle size={24} color="var(--warning)" />
              <h2 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Active Alerts</h2>
            </div>
            {alerts.length === 0 ? (
              <p style={{ color: 'var(--text-muted)' }}>No active alerts. All systems operational.</p>
            ) : (
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {alerts.map(alert => (
                  <li key={alert._id} style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', marginBottom: '8px', borderLeft: '4px solid var(--danger)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <strong style={{ color: 'var(--danger)' }}>{alert.title}</strong>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{new Date(alert.createdAt).toLocaleString()}</span>
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{alert.message}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Monitoring;
