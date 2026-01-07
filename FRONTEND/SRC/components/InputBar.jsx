import React, { useState } from 'react'

export default function InputBar({ onSend }) {
  const [value, setValue] = useState('')

  const submit = () => {
    const v = value.trim()
    if (!v) return
    onSend(v)
    setValue('')
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      submit()
    }
  }

  return (
    <div className="chatbot-input">
      <div className="input-container">
        <input
          id="messageInput"
          type="text"
          placeholder="Ask your question here..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          autoComplete="off"
        />
        <button className="mic-btn" id="micBtn" title="Voice Input (Coming Soon)" disabled>
          <i className="fas fa-microphone" />
        </button>
        <button className="send-btn" id="sendBtn" onClick={submit} disabled={!value.trim()}>
          <i className="fas fa-paper-plane" />
        </button>
      </div>
    </div>
  )
}
