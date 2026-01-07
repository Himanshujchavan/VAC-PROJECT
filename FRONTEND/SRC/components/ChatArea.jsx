import React from 'react'

function formatTime(ts) {
  try {
    const d = new Date(ts)
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  } catch {
    return ''
  }
}

export default function ChatArea({ containerRef, messages, isTyping }) {
  return (
    <div className="chat-area">
      <div className="messages-container" ref={containerRef}>
        {messages.map((m) => (
          <div key={m.id} className={`message ${m.author === 'bot' ? 'bot-message' : 'user-message'}`}>
            <div className="message-avatar">
              <i className={`fas ${m.author === 'bot' ? 'fa-robot' : 'fa-user'}`} />
            </div>
            <div className="message-content">
              <div className="message-bubble">{m.text}</div>
              <span className="message-timestamp">{formatTime(m.timestamp)}</span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="typing-indicator">
            <div className="message bot-message">
              <div className="message-avatar">
                <i className="fas fa-robot" />
              </div>
              <div className="message-content">
                <div className="typing-dots">
                  <span />
                  <span />
                  <span />
                </div>
                <p>Bot is typing...</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
