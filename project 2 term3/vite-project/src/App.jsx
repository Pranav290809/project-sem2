import { Navigate, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import { format } from 'date-fns'
import Navbar from './components/Navbar.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Applications from './pages/Applications.jsx'
import AddApplication from './pages/AddApplication.jsx'
import Analytics from './pages/Analytics.jsx'
import { fetchMockJobs } from './services/api.js'

const STATUS_OPTIONS = ['Applied', 'Interviewing', 'Offer', 'Rejected']

function normalizeJob(product, index) {
  const company = product.brand || product.title?.split(' ')?.[0] || 'Company'
  const appliedDate = new Date()
  appliedDate.setDate(appliedDate.getDate() - (index % 45))

  return {
    id: crypto.randomUUID(),
    company,
    role: product.category ? `${product.category} Specialist` : 'Software Engineer',
    location: index % 2 === 0 ? 'Remote' : 'On-site',
    salary: 40000 + index * 1200,
    platform: ['LinkedIn', 'Referral', 'Company Portal', 'Indeed'][index % 4],
    status: STATUS_OPTIONS[index % STATUS_OPTIONS.length],
    appliedDate: format(appliedDate, 'yyyy-MM-dd'),
    interviewDate: '',
    notes: product.description?.slice(0, 90) || '',
    bookmarked: false,
    domain: `${company.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
  }
}

function readJsonFromStorage(key, fallback) {
  const raw = localStorage.getItem(key)
  if (!raw) return fallback
  try {
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')
  const [applications, setApplications] = useState(() => readJsonFromStorage('applications', []))
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem('applications', JSON.stringify(applications))
  }, [applications])

  useEffect(() => {
    if (applications.length > 0) return

    let isActive = true
    setLoading(true)

    fetchMockJobs()
      .then((products) => {
        if (!isActive) return
        const seeded = (products || []).slice(0, 10).map(normalizeJob)
        setApplications(seeded)
      })
      .catch(() => {
        toast.error('Could not fetch starter jobs.')
      })
      .finally(() => {
        if (!isActive) return
        setLoading(false)
      })

    return () => {
      isActive = false
    }
  }, [applications.length])

  const addApplication = useCallback((payload) => {
    setApplications((prev) => [{ ...payload, id: crypto.randomUUID() }, ...prev])
    toast.success('Application added')
  }, [])

  const updateApplication = useCallback((id, payload) => {
    setApplications((prev) => prev.map((app) => (app.id === id ? { ...app, ...payload } : app)))
    toast.success('Application updated')
  }, [])

  const deleteApplication = useCallback((id) => {
    setApplications((prev) => prev.filter((app) => app.id !== id))
    toast.success('Application deleted')
  }, [])

  const toggleBookmark = useCallback((id) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, bookmarked: !app.bookmarked } : app)),
    )
  }, [])

  const appStore = useMemo(
    () => ({
      applications,
      loading,
      addApplication,
      updateApplication,
      deleteApplication,
      toggleBookmark,
    }),
    [applications, loading, addApplication, updateApplication, deleteApplication, toggleBookmark],
  )

  return (
    <div className="app-shell">
      <Navbar
        theme={theme}
        onToggleTheme={() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}
      />
      <main className="page-container">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard applications={appStore.applications} />} />
          <Route
            path="/applications"
            element={
              <Applications
                applications={appStore.applications}
                loading={appStore.loading}
                deleteApplication={appStore.deleteApplication}
                toggleBookmark={appStore.toggleBookmark}
              />
            }
          />
          <Route
            path="/applications/new"
            element={<AddApplication mode="create" applications={appStore.applications} onSave={appStore.addApplication} />}
          />
          <Route
            path="/applications/:id"
            element={<AddApplication mode="edit" applications={appStore.applications} onSave={appStore.updateApplication} />}
          />
          <Route path="/analytics" element={<Analytics applications={appStore.applications} />} />
        </Routes>
      </main>
      <ToastContainer position="top-right" autoClose={2200} />
    </div>
  )
}

export default App
