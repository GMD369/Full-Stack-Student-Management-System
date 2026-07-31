import { useCallback, useEffect, useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import Modal from '../components/Modal';
import StudentForm from '../components/StudentForm';
import Loader from '../components/Loader';
import { PlusIcon, EyeIcon, EditIcon, TrashIcon } from '../components/Icons';

export default function Students() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [editing, setEditing] = useState(null); // student object, or {} for new
  const [viewing, setViewing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const fetchStudents = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get('/students', { params: { page, limit: 10, q: query } });
      setStudents(res.data.data);
      setPages(res.data.pages);
      setTotal(res.data.total);
    } catch {
      setError('Failed to load students');
    } finally {
      setLoading(false);
    }
  }, [page, query]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  function handleSearchChange(next) {
    setQuery(next);
    setPage(1);
  }

  async function handleSave(form) {
    setSaving(true);
    try {
      if (editing?._id) {
        await api.put(`/students/${editing._id}`, form);
      } else {
        await api.post('/students', form);
      }
      setEditing(null);
      await fetchStudents();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(student) {
    if (!window.confirm(`Delete ${student.name}? This cannot be undone.`)) return;
    setDeletingId(student._id);
    try {
      await api.delete(`/students/${student._id}`);
      await fetchStudents();
    } catch {
      setError('Failed to delete student');
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Students</h1>
          <p className="page-subtitle">{total} total student{total === 1 ? '' : 's'}</p>
        </div>
        {isAdmin && (
          <button className="btn btn-primary" onClick={() => setEditing({})}>
            <PlusIcon width={16} height={16} />
            Add Student
          </button>
        )}
      </div>

      <div className="toolbar">
        <SearchBar value={query} onChange={handleSearchChange} />
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {loading ? (
        <Loader label="Loading students..." />
      ) : students.length === 0 ? (
        <p className="empty-state">No students found.</p>
      ) : (
        <>
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Roll No.</th>
                  <th>Course</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s._id}>
                    <td data-label="Name" className="cell-primary">{s.name}</td>
                    <td data-label="Roll No."><span className="roll-chip">{s.rollNumber}</span></td>
                    <td data-label="Course">{s.course}</td>
                    <td data-label="Email" className="cell-muted">{s.email}</td>
                    <td data-label="Actions" className="row-actions">
                      <button className="btn btn-ghost btn-icon" onClick={() => setViewing(s)} title="View" aria-label="View">
                        <EyeIcon width={16} height={16} />
                      </button>
                      {isAdmin && (
                        <>
                          <button className="btn btn-ghost btn-icon" onClick={() => setEditing(s)} title="Edit" aria-label="Edit">
                            <EditIcon width={16} height={16} />
                          </button>
                          <button
                            className="btn btn-ghost btn-icon btn-danger"
                            disabled={deletingId === s._id}
                            onClick={() => handleDelete(s)}
                            title="Delete"
                            aria-label="Delete"
                          >
                            <TrashIcon width={16} height={16} />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination page={page} pages={pages} onChange={setPage} />
        </>
      )}

      {editing && (
        <Modal title={editing._id ? 'Edit Student' : 'Add Student'} onClose={() => setEditing(null)}>
          <StudentForm
            initial={
              editing._id
                ? {
                    name: editing.name,
                    email: editing.email,
                    rollNumber: editing.rollNumber,
                    course: editing.course,
                    phone: editing.phone || '',
                    address: editing.address || '',
                  }
                : undefined
            }
            onSubmit={handleSave}
            onCancel={() => setEditing(null)}
            submitting={saving}
          />
        </Modal>
      )}

      {viewing && (
        <Modal title="Student Details" onClose={() => setViewing(null)}>
          <dl className="detail-list">
            <dt>Name</dt>
            <dd>{viewing.name}</dd>
            <dt>Roll number</dt>
            <dd>{viewing.rollNumber}</dd>
            <dt>Course</dt>
            <dd>{viewing.course}</dd>
            <dt>Email</dt>
            <dd>{viewing.email}</dd>
            <dt>Phone</dt>
            <dd>{viewing.phone || '—'}</dd>
            <dt>Address</dt>
            <dd>{viewing.address || '—'}</dd>
            <dt>Enrolled</dt>
            <dd>{new Date(viewing.dateOfEnrollment || viewing.createdAt).toLocaleDateString()}</dd>
          </dl>
        </Modal>
      )}
    </div>
  );
}
