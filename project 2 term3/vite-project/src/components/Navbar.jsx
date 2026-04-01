import { NavLink } from 'react-router-dom'
import { FaBriefcase, FaMoon, FaSun } from 'react-icons/fa'

export default function Navbar({ theme, onToggleTheme }) {
  return (
    <header className="navbar">
      <div className="brand">
        <FaBriefcase />
        <span>Smart Job Tracker</span>
      </div>
      <nav>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/applications">Applications</NavLink>
        <NavLink to="/applications/new">Add New</NavLink>
        <NavLink to="/analytics">Analytics</NavLink>
      </nav>
      <button className="theme-toggle" onClick={onToggleTheme} aria-label="Toggle theme">
        {theme === 'light' ? <FaMoon /> : <FaSun />}
      </button>
    </header>
  )
}
