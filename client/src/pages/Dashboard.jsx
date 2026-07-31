import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import StatCard from '../components/StatCard';
import Loader from '../components/Loader';
import { StudentsCapIcon, TrendUpIcon, ShieldIcon } from '../components/Icons';

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    api
      .get('/students/stats')
      .then((res) => {
        if (!cancelled) setStats(res.data);
      })
      .catch(() => {
        if (!cancelled) setError('Failed to load dashboard stats');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div>
      <h1>Welcome, {user?.name}</h1>
      <p className="page-subtitle">Here's what's happening with your students.</p>

      {loading && <Loader label="Loading dashboard..." />}
      {error && <div className="alert alert-error">{error}</div>}

      {stats && (
        <>
          <div className="stat-grid">
            <StatCard label="Total Students" value={stats.totalStudents} icon={<StudentsCapIcon />} />
            <StatCard
              label="Recent Registrations"
              value={stats.recentRegistrations}
              hint="Last 7 days"
              icon={<TrendUpIcon />}
            />
            <StatCard label="Your Role" value={user?.role} icon={<ShieldIcon />} />
          </div>

          <div className="panel">
            <div className="panel-header">
              <h2>Recent Registrations</h2>
              <Link to="/students" className="btn btn-secondary">
                View all students
              </Link>
            </div>
            {stats.recentList.length === 0 ? (
              <p className="empty-state">No students registered in the last 7 days.</p>
            ) : (
              <ul className="recent-list">
                {stats.recentList.map((s) => (
                  <li key={s._id}>
                    <span className="recent-name">{s.name}</span>
                    <span className="recent-meta">{s.course} · {s.rollNumber}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
}
