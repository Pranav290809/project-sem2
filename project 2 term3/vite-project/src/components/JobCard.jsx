import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FaRegBookmark, FaBookmark, FaTrash } from 'react-icons/fa'
import { getLogoUrl, formatCurrency } from '../utils/helpers.js'

export default function JobCard({ app, onDelete, onBookmark }) {
  return (
    <article className="job-card">
      <img
        className="company-logo"
        src={getLogoUrl(app.domain)}
        alt={`${app.company} logo`}
        onError={(e) => {
          e.currentTarget.src = getLogoUrl('clearbit.com')
        }}
      />
      <div className="job-info">
        <h3>{app.company}</h3>
        <p>{app.role}</p>
        <small>
          {app.status} | Applied: {format(new Date(app.appliedDate), 'dd MMM yyyy')}
        </small>
      </div>
      <div className="job-meta">{formatCurrency(app.salary)}</div>
      <div className="job-actions">
        <button onClick={() => onBookmark(app.id)}>
          {app.bookmarked ? <FaBookmark /> : <FaRegBookmark />}
        </button>
        <Link to={`/applications/${app.id}`}>Edit</Link>
        <button onClick={() => onDelete(app.id)}>
          <FaTrash />
        </button>
      </div>
    </article>
  )
}
