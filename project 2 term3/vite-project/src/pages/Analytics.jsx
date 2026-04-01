import { useMemo } from 'react'
import StagePieChart from '../components/Charts/StagePieChart.jsx'
import MonthlyApplicationsChart from '../components/Charts/MonthlyApplicationsChart.jsx'

export default function Analytics({ applications }) {

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
    const months = {}
    applications.forEach((app) => {
      const label = new Date(app.appliedDate).toLocaleDateString('en-US', {
        month: 'short',
        year: '2-digit',
      })
      months[label] = (months[label] || 0) + 1
    })
    return Object.keys(months).map((month) => ({ month, count: months[month] }))
  }, [applications])

  return (
    <section>
      <div className="page-head">
        <h1>Analytics</h1>
        <p>Detailed charts and trends for your applications.</p>
      </div>
      <div className="charts-grid">
        <StagePieChart data={pieData} />
        <MonthlyApplicationsChart data={monthlyData} />
      </div>
    </section>
  )
}
