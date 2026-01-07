import React from 'react'

export default function ChatbotHeader({ minimized, onMinimize, onClose }) {
  return (
    <div className="chatbot-header">
      <div className="header-left">
        <div className="college-logo" aria-hidden>
          <i className="fas fa-graduation-cap" />
        </div>
        <div className="header-info">
          <h3>College Enquiry Assistant</h3>
          <div className="status">
            <span className="status-indicator online" />
            <span className="status-text">Online</span>
          </div>
        </div>
      </div>
      <div className="header-actions">
        <button className="minimize-btn" title={minimized ? 'Restore' : 'Minimize'} onClick={onMinimize}>
          <i className={`fas ${minimized ? 'fa-up-right-and-down-left-from-center' : 'fa-minus'}`} />
        </button>
        <button className="close-btn" title="Close" onClick={onClose}>
          <i className="fas fa-times" />
        </button>
      </div>
    </div>
  )
}
