import React from 'react'

export default function ToggleButton({ open, onClick }) {
  return (
    <button className="chatbot-toggle" id="chatbotToggle" aria-label="Toggle Chatbot" onClick={onClick}>
      <i className="fas fa-comments" />
      {!open && <span className="notification-badge">1</span>}
    </button>
  )
}
