export default function StatCard({ label, value, hint, icon }) {
  return (
    <div className="stat-card">
      <div className="stat-card-body">
        <span className="stat-label">{label}</span>
        <span className="stat-value">{value}</span>
        {hint && <span className="stat-hint">{hint}</span>}
      </div>
      {icon && <span className="stat-icon">{icon}</span>}
    </div>
  );
}
