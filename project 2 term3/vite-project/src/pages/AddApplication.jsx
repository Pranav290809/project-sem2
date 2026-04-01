import { Navigate } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'

const DEFAULT_FORM = {
  company: '',
  role: '',
  location: 'Remote',
  salary: '',
  platform: 'LinkedIn',
  status: 'Applied',
  appliedDate: '',
  interviewDate: '',
  notes: '',
  domain: '',
  bookmarked: false,
}

function getIdFromPathname(pathname) {
  // expected: /applications/:id
  const parts = String(pathname || '').split('/').filter(Boolean)
  if (parts[0] !== 'applications') return null
  if (parts[1] === 'new') return null
  return parts[1] || null
}

function validate(form) {
  const next = {}
  if (!String(form.company || '').trim()) next.company = 'Company name is required'
  if (!String(form.role || '').trim()) next.role = 'Role is required'
  if (!String(form.appliedDate || '').trim()) next.appliedDate = 'Applied date is required'
  if (!String(form.location || '').trim()) next.location = 'Location is required'
  if (!String(form.platform || '').trim()) next.platform = 'Platform is required'
  if (!String(form.status || '').trim()) next.status = 'Status is required'

  const salaryNumber = Number(form.salary)
  if (!Number.isFinite(salaryNumber) || salaryNumber <= 0) next.salary = 'Salary must be a positive number'

  return next
}

export default function AddApplication({ mode, applications, onSave }) {
  const id = getIdFromPathname(window.location.pathname)
  const selected = useMemo(
    () => (applications || []).find((item) => item.id === id),
    [applications, id],
  )

  const [form, setForm] = useState(DEFAULT_FORM)
  const [errors, setErrors] = useState({})
  const [shouldRedirect, setShouldRedirect] = useState(false)

  useEffect(() => {
    if (mode === 'edit' && selected) setForm({ ...DEFAULT_FORM, ...selected })
    if (mode !== 'edit') setForm(DEFAULT_FORM)
    setErrors({})
  }, [mode, selected])

  const onChange = (key) => (e) => {
    const value = e?.target?.type === 'checkbox' ? e.target.checked : e.target.value
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const nextErrors = validate(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    const payload = {
      ...form,
      salary: Number(form.salary),
    }

    if (mode === 'edit') {
      if (id) onSave(id, payload)
    } else {
      onSave(payload)
    }
    setShouldRedirect(true)
  }

  if (shouldRedirect) return <Navigate to="/applications" replace />

  return (
    <section>
      <div className="page-head">
        <h1>{mode === 'edit' ? 'Edit Application' : 'Add Application'}</h1>
      </div>
      <form className="job-form" onSubmit={onSubmit}>
        <label>
          <span>Company Name</span>
          <input value={form.company} onChange={onChange('company')} placeholder="e.g. Google" />
          {errors.company ? <small>{errors.company}</small> : null}
        </label>

        <label>
          <span>Job Role</span>
          <input value={form.role} onChange={onChange('role')} placeholder="e.g. Frontend Developer" />
          {errors.role ? <small>{errors.role}</small> : null}
        </label>

        <div className="form-row">
          <label>
            <span>Location</span>
            <select value={form.location} onChange={onChange('location')}>
              <option>Remote</option>
              <option>On-site</option>
            </select>
            {errors.location ? <small>{errors.location}</small> : null}
          </label>

          <label>
            <span>Salary (INR)</span>
            <input value={form.salary} onChange={onChange('salary')} inputMode="numeric" placeholder="e.g. 80000" />
            {errors.salary ? <small>{errors.salary}</small> : null}
          </label>
        </div>

        <div className="form-row">
          <label>
            <span>Application Platform</span>
            <select value={form.platform} onChange={onChange('platform')}>
              <option>LinkedIn</option>
              <option>Referral</option>
              <option>Company Portal</option>
              <option>Indeed</option>
            </select>
            {errors.platform ? <small>{errors.platform}</small> : null}
          </label>

          <label>
            <span>Status</span>
            <select value={form.status} onChange={onChange('status')}>
              <option>Applied</option>
              <option>Interviewing</option>
              <option>Offer</option>
              <option>Rejected</option>
            </select>
            {errors.status ? <small>{errors.status}</small> : null}
          </label>
        </div>

        <div className="form-row">
          <label>
            <span>Applied Date</span>
            <input type="date" value={form.appliedDate} onChange={onChange('appliedDate')} />
            {errors.appliedDate ? <small>{errors.appliedDate}</small> : null}
          </label>

          <label>
            <span>Interview Date (optional)</span>
            <input type="date" value={form.interviewDate || ''} onChange={onChange('interviewDate')} />
          </label>
        </div>

        <label>
          <span>Company Domain (optional)</span>
          <input value={form.domain} onChange={onChange('domain')} placeholder="e.g. google.com" />
        </label>

        <label>
          <span>Notes (optional)</span>
          <textarea rows={4} value={form.notes} onChange={onChange('notes')} placeholder="Anything you want to remember…" />
        </label>

        <button type="submit">{mode === 'edit' ? 'Update' : 'Save'} Application</button>
      </form>
    </section>
  )
}
