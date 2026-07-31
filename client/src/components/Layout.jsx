import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { DashboardIcon, StudentsIcon, LogoutIcon, StudentsCapIcon } from './Icons';

function initials(name = '') {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('');
}

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  async function handleLogout() {
    await logout();
    navigate('/login', { replace: true });
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="hamburger" onClick={() => setMenuOpen((o) => !o)} aria-label="Toggle menu">
          <span />
          <span />
          <span />
        </button>
        <div className="brand">
          <span className="logo-mark">
            <StudentsCapIcon width={17} height={17} />
          </span>
          Student Management System
        </div>
        <div className="topbar-user">
          <div className="user-block">
            <span className="avatar">{initials(user?.name)}</span>
            <div className="user-meta">
              <span className="user-name">{user?.name}</span>
              <span className={`role-badge role-${user?.role}`}>{user?.role}</span>
            </div>
          </div>
          <button className="btn btn-secondary" onClick={handleLogout}>
            <LogoutIcon width={15} height={15} />
            Logout
          </button>
        </div>
      </header>

      <div className="app-body">
        <nav className={`sidebar ${menuOpen ? 'sidebar-open' : ''}`} onClick={() => setMenuOpen(false)}>
          <span className="sidebar-section-label">Menu</span>
          <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            <DashboardIcon />
            Dashboard
          </NavLink>
          <NavLink to="/students" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            <StudentsIcon />
            Students
          </NavLink>
        </nav>

        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
