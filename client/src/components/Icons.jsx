const common = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' };

export const DashboardIcon = (p) => (
  <svg {...common} {...p}><rect x="3" y="3" width="7" height="9" rx="1.5" /><rect x="14" y="3" width="7" height="5" rx="1.5" /><rect x="14" y="12" width="7" height="9" rx="1.5" /><rect x="3" y="16" width="7" height="5" rx="1.5" /></svg>
);

export const StudentsIcon = (p) => (
  <svg {...common} {...p}><path d="M16 19v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 17.5V19" /><circle cx="9.5" cy="8" r="3.5" /><path d="M20 19v-1.2a3 3 0 0 0-2.2-2.9" /><path d="M14.7 4.1a3.5 3.5 0 0 1 0 6.8" /></svg>
);

export const LogoutIcon = (p) => (
  <svg {...common} {...p}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="M16 17l5-5-5-5" /><path d="M21 12H9" /></svg>
);

export const SearchIcon = (p) => (
  <svg {...common} {...p}><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
);

export const PlusIcon = (p) => (
  <svg {...common} {...p}><path d="M12 5v14M5 12h14" /></svg>
);

export const EyeIcon = (p) => (
  <svg {...common} {...p}><path d="M1.5 12S5 5 12 5s10.5 7 10.5 7-3.5 7-10.5 7S1.5 12 1.5 12Z" /><circle cx="12" cy="12" r="3" /></svg>
);

export const EditIcon = (p) => (
  <svg {...common} {...p}><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>
);

export const TrashIcon = (p) => (
  <svg {...common} {...p}><path d="M3 6h18" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /><path d="M10 11v6M14 11v6" /></svg>
);

export const StudentsCapIcon = (p) => (
  <svg {...common} {...p}><path d="M2 9.5 12 5l10 4.5-10 4.5-10-4.5Z" /><path d="M6 12v4.5c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5V12" /><path d="M22 9.5V16" /></svg>
);

export const TrendUpIcon = (p) => (
  <svg {...common} {...p}><path d="M3 17l6-6 4 4 8-8" /><path d="M15 7h6v6" /></svg>
);

export const ShieldIcon = (p) => (
  <svg {...common} {...p}><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" /><path d="m9.5 12 1.8 1.8L15 10" /></svg>
);
