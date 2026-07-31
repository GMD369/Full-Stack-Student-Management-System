import { useState } from 'react';

const EMPTY = { name: '', email: '', rollNumber: '', course: '', phone: '', address: '' };

export default function StudentForm({ initial, onSubmit, onCancel, submitting }) {
  const [form, setForm] = useState(initial || EMPTY);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  function validate() {
    const next = {};
    if (!form.name.trim()) next.name = 'Name is required';
    if (!form.email.trim()) next.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email';
    if (!form.rollNumber.trim()) next.rollNumber = 'Roll number is required';
    if (!form.course.trim()) next.course = 'Course is required';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setServerError('');
    if (!validate()) return;
    try {
      await onSubmit(form);
    } catch (err) {
      setServerError(err.response?.data?.message || 'Failed to save student');
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {serverError && <div className="alert alert-error">{serverError}</div>}

      <label htmlFor="s-name">Name</label>
      <input
        id="s-name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className={errors.name ? 'input-error' : ''}
      />
      {errors.name && <span className="field-error">{errors.name}</span>}

      <label htmlFor="s-email">Email</label>
      <input
        id="s-email"
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className={errors.email ? 'input-error' : ''}
      />
      {errors.email && <span className="field-error">{errors.email}</span>}

      <label htmlFor="s-roll">Roll number</label>
      <input
        id="s-roll"
        value={form.rollNumber}
        onChange={(e) => setForm({ ...form, rollNumber: e.target.value })}
        className={errors.rollNumber ? 'input-error' : ''}
      />
      {errors.rollNumber && <span className="field-error">{errors.rollNumber}</span>}

      <label htmlFor="s-course">Course</label>
      <input
        id="s-course"
        value={form.course}
        onChange={(e) => setForm({ ...form, course: e.target.value })}
        className={errors.course ? 'input-error' : ''}
      />
      {errors.course && <span className="field-error">{errors.course}</span>}

      <label htmlFor="s-phone">Phone</label>
      <input id="s-phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />

      <label htmlFor="s-address">Address</label>
      <input id="s-address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />

      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  );
}
