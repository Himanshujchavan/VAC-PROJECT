import React from 'react'

const actions = [
  { key: 'admissions', icon: 'fa-book-open', label: 'Admissions' },
  { key: 'courses', icon: 'fa-graduation-cap', label: 'Courses' },
  { key: 'fees', icon: 'fa-dollar-sign', label: 'Fees' },
  { key: 'contact', icon: 'fa-phone', label: 'Contact' },
  { key: 'calendar', icon: 'fa-calendar', label: 'Academic Calendar' },
]

export default function QuickActions({ onAction }) {
  return (
    <div className="quick-actions">
      <h5>Quick Actions</h5>
      <div className="action-buttons">
        {actions.map((a) => (
          <button key={a.key} className="action-btn" onClick={() => onAction(a.key)}>
            <i className={`fas ${a.icon}`} />
            {a.label}
          </button>
        ))}
      </div>
    </div>
  )
}
