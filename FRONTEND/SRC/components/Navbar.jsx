import React from 'react'

export default function Navbar({ onNavigate }) {
  const handleClick = (e, id) => {
    e.preventDefault()
    onNavigate?.(id)
  }

  return (
    <header className="navbar">
      <div className="nav-container">
        <div className="nav-brand">YCCE</div>
        <nav className="nav-links" aria-label="Primary">
          <a href="#admissions" onClick={(e) => handleClick(e, 'admissions')}>Admissions</a>
          <a href="#branches" onClick={(e) => handleClick(e, 'branches')}>Branches</a>
          <a href="#achievements" onClick={(e) => handleClick(e, 'achievements')}>Achievements</a>
          <a href="#contact" onClick={(e) => handleClick(e, 'contact')}>Contact</a>
        </nav>
      </div>
    </header>
  )
}
