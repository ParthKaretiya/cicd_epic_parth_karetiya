import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, GitMerge, FileCode, BookOpen, Activity, LogOut, Code2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { logout, user } = useAuth();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={18} /> },
    { name: 'Workflows', path: '/workflows', icon: <GitMerge size={18} /> },
    { name: 'YAML Tools', path: '/yaml-tools', icon: <FileCode size={18} /> },
    { name: 'Infra Guides', path: '/infra-guides', icon: <BookOpen size={18} /> },
    { name: 'Monitoring', path: '/monitoring', icon: <Activity size={18} /> },
  ];

  return (
    <aside style={{
      width: '260px',
      background: 'var(--bg-sidebar)',
      display: 'flex',
      flexDirection: 'column',
      padding: '8px',
      color: '#ECECF1'
    }}>
      <div style={{ marginBottom: '16px', padding: '8px' }}>
        <button style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '12px',
          background: 'transparent',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '6px',
          color: '#ECECF1',
          fontSize: '0.875rem',
          transition: 'all 0.2s',
          cursor: 'pointer'
        }} onMouseOver={(e) => e.currentTarget.style.background = 'var(--bg-hover)'}
           onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
          <Code2 size={16} />
          <span style={{ fontWeight: 500 }}>CI/CD Assistant</span>
        </button>
      </div>

      <nav style={{ flex: 1, overflowY: 'auto' }}>
        <ul style={{ listStyle: 'none' }}>
          {navItems.map((item) => (
            <li key={item.path} style={{ marginBottom: '2px' }}>
              <NavLink
                to={item.path}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px',
                  borderRadius: '6px',
                  color: isActive ? '#fff' : '#ECECF1',
                  background: isActive ? 'var(--bg-hover)' : 'transparent',
                  fontSize: '0.875rem',
                  textDecoration: 'none',
                  transition: 'background 0.2s'
                })}
              >
                {item.icon}
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div style={{ paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        {user && (
          <div style={{ padding: '12px', fontSize: '0.875rem', color: '#ECECF1', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '28px', height: '28px', background: 'var(--primary)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
              {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.name || user.email}</span>
          </div>
        )}
        <button 
          onClick={logout}
          style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            width: '100%', padding: '12px', borderRadius: '6px',
            background: 'transparent', color: '#ECECF1',
            fontSize: '0.875rem', border: 'none', cursor: 'pointer',
            transition: 'background 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.background = 'var(--bg-hover)'}
          onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
        >
          <LogOut size={18} />
          Log out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
