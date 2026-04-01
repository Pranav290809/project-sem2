const STATUS = ['All', 'Applied', 'Interviewing', 'Offer', 'Rejected']
const PLATFORM = ['All', 'LinkedIn', 'Referral', 'Company Portal', 'Indeed']
const LOCATION = ['All', 'Remote', 'On-site']

export default function Filters({ status, platform, location, sortBy, onChange }) {
  return (
    <div className="filters">
      <select value={status} onChange={(e) => onChange('status', e.target.value)}>
        {STATUS.map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>
      <select value={platform} onChange={(e) => onChange('platform', e.target.value)}>
        {PLATFORM.map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>
      <select value={location} onChange={(e) => onChange('location', e.target.value)}>
        {LOCATION.map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>
      <select value={sortBy} onChange={(e) => onChange('sortBy', e.target.value)}>
        <option value="appliedDate">Applied Date</option>
        <option value="salary">Salary</option>
        <option value="company">Company Name</option>
      </select>
    </div>
  )
}
