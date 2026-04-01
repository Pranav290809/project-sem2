import { Link } from 'react-router-dom'
import { useMemo } from 'react'
import StagePieChart from '../components/Charts/StagePieChart.jsx'
import MonthlyApplicationsChart from '../components/Charts/MonthlyApplicationsChart.jsx'

function getMetrics(applications) {
  return {
    total: applications.length,
    interviews: applications.filter((a) => a.status === 'Interviewing').length,
    offers: applications.filter((a) => a.status === 'Offer').length,
    rejected: applications.filter((a) => a.status === 'Rejected').length,
  }
}

export default function Dashboard({ applications }) {
  const metrics = useMemo(() => getMetrics(applications), [applications])

  const pieData = useMemo(
    () => [
      { name: 'Applied', value: applications.filter((a) => a.status === 'Applied').length },
      {
        name: 'Interviewing',
        value: applications.filter((a) => a.status === 'Interviewing').length,
      },
      { name: 'Offer', value: applications.filter((a) => a.status === 'Offer').length },
      { name: 'Rejected', value: applications.filter((a) => a.status === 'Rejected').length },
    ],
    [applications],
  )

  const monthlyData = useMemo(() => {
    const map = {}
    applications.forEach((app) => {
      const month = new Date(app.appliedDate).toLocaleDateString('en-US', { month: 'short' })
      map[month] = (map[month] || 0) + 1
    })
    return Object.keys(map).map((month) => ({ month, count: map[month] }))
  }, [applications])

  return (
    <section>
      <div className="page-head">
        <h1>Dashboard</h1>
        <p>Overview of your current job search progress.</p>
      </div>
      <div className="metrics-grid">
        <div className="metric-card">Total Applications: {metrics.total}</div>
        <div className="metric-card">Interviews Scheduled: {metrics.interviews}</div>
        <div className="metric-card">Offers Received: {metrics.offers}</div>
        <div className="metric-card">Rejections: {metrics.rejected}</div>
      </div>
      <div className="charts-grid">
        <StagePieChart data={pieData} />
        <MonthlyApplicationsChart data={monthlyData} />
      </div>
      <Link className="primary-btn" to="/applications">
        Manage Applications
      </Link>
    </section>
  )
}
