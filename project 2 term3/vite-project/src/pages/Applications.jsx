import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SearchBar from '../components/SearchBar.jsx'
import Filters from '../components/Filters.jsx'
import JobCard from '../components/JobCard.jsx'

const TABS = ['All', 'Applied', 'Interviewing', 'Offer', 'Rejected']
const MotionDiv = motion.div

function normalizeText(value) {
  return String(value || '').trim().toLowerCase()
}

function sortApplications(list, sortBy) {
  const next = [...list]
  next.sort((a, b) => {
    if (sortBy === 'salary') return Number(b.salary || 0) - Number(a.salary || 0)
    if (sortBy === 'company') return String(a.company || '').localeCompare(String(b.company || ''))
    return new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime()
  })
  return next
}

export default function Applications({ applications, loading, deleteApplication, toggleBookmark }) {
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [tab, setTab] = useState('All')
  const [filters, setFilters] = useState({
    status: 'All',
    platform: 'All',
    location: 'All',
    sortBy: 'appliedDate',
  })

  const debounceTimerRef = useRef(null)

  useEffect(() => {
    window.clearTimeout(debounceTimerRef.current)
    debounceTimerRef.current = window.setTimeout(() => {
      setDebouncedQuery(query)
    }, 350)

    return () => window.clearTimeout(debounceTimerRef.current)
  }, [query])

  const visibleApps = useMemo(() => {
    let list = applications || []

    const q = normalizeText(debouncedQuery)
    if (q) {
      list = list.filter((app) => {
        const company = normalizeText(app.company)
        const role = normalizeText(app.role)
        return company.includes(q) || role.includes(q)
      })
    }

    if (filters.status !== 'All') list = list.filter((app) => app.status === filters.status)
    if (filters.platform !== 'All') list = list.filter((app) => app.platform === filters.platform)
    if (filters.location !== 'All') list = list.filter((app) => app.location === filters.location)
    if (tab !== 'All') list = list.filter((app) => app.status === tab)

    return sortApplications(list, filters.sortBy)
  }, [applications, debouncedQuery, filters.location, filters.platform, filters.sortBy, filters.status, tab])

  const bookmarked = useMemo(() => visibleApps.filter((app) => app.bookmarked), [visibleApps])

  return (
    <section>
      <div className="page-head">
        <div>
          <h1>Applications</h1>
          <p>Track and manage your job pipeline.</p>
        </div>
        <Link className="primary-btn" to="/applications/new">
          Add application
        </Link>
      </div>

      <SearchBar value={query} onChange={setQuery} />
      <Filters
        {...filters}
        onChange={(key, value) => setFilters((prev) => ({ ...prev, [key]: value }))}
      />

      <div className="tabs">
        {TABS.map((item) => (
          <button
            key={item}
            className={tab === item ? 'tab active' : 'tab'}
            onClick={() => setTab(item)}
          >
            {item}
          </button>
        ))}
      </div>

      {loading ? <div className="loading">Loading jobs...</div> : null}

      {!loading && visibleApps.length === 0 ? <div className="empty">No jobs found.</div> : null}

      <MotionDiv className="list-grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {visibleApps.map((app) => (
          <JobCard
            key={app.id}
            app={app}
            onDelete={deleteApplication}
            onBookmark={toggleBookmark}
          />
        ))}
      </MotionDiv>

      <div className="bookmarks">
        <h2>Bookmarked Jobs</h2>
        {bookmarked.length === 0 ? (
          <p className="empty-inline">No bookmarked jobs yet.</p>
        ) : (
          bookmarked.map((app) => (
            <p key={app.id}>
              {app.company} - {app.role}
            </p>
          ))
        )}
      </div>
    </section>
  )
}
