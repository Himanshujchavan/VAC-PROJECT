import React, { useEffect, useMemo, useRef, useState } from 'react'
import ChatbotHeader from './components/ChatbotHeader'
import ChatArea from './components/ChatArea'
import InputBar from './components/InputBar'
import QuickActions from './components/QuickActions'
import ToggleButton from './components/ToggleButton'
import MainContent from './components/MainContent'
import Navbar from './components/Navbar'
import { getNLPModelResponse } from './services/api'


const initialBotMessage = {
  id: 'm-welcome',
  author: 'bot',
  text: "Hi! I'm your College Enquiry Assistant. Ask me about admissions, courses, fees & more.",
  timestamp: new Date().toISOString(),
}

export default function App() {
  const [open, setOpen] = useState(false)
  const [minimized, setMinimized] = useState(false)
  const [messages, setMessages] = useState([])
  const [isTyping, setIsTyping] = useState(false)

  const containerRef = useRef(null)

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([initialBotMessage])
    }
  }, [open])

  useEffect(() => {
    if (!containerRef.current) return
    containerRef.current.scrollTop = containerRef.current.scrollHeight
  }, [messages, isTyping])

  const handleSend = async (text) => {
    if (!text?.trim()) return
    const userMsg = {
      id: `m-${Date.now()}`,
      author: 'user',
      text: text.trim(),
      timestamp: new Date().toISOString(),
    }
    setMessages((prev) => [...prev, userMsg])
    setIsTyping(true)

    try {
      const botReply = await getNLPModelResponse(text)
      setMessages((prev) => [
        ...prev,
        {
          id: `m-bot-${Date.now()}`,
          author: 'bot',
          text: botReply,
          timestamp: new Date().toISOString(),
        },
      ])
      setIsTyping(false)
    } catch (error) {
      console.error('Chat error:', error)
      setMessages((prev) => [
        ...prev,
        {
          id: `m-bot-${Date.now()}`,
          author: 'bot',
          text: 'Sorry, the chatbot service is unavailable. Please ensure the backend server is running.',
          timestamp: new Date().toISOString(),
        },
      ])
      setIsTyping(false)
    }
  }

  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const onQuickAction = (key) => {
    const map = {
      admissions: { msg: 'Tell me about admissions', section: 'admissions' },
      courses: { msg: 'What courses are offered?', section: 'branches' },
      fees: { msg: 'What are the fees?', section: 'admissions' },
      contact: { msg: 'How can I contact the college?', section: 'contact' },
      calendar: { msg: 'Show me the academic calendar', section: 'achievements' },
    }
    const item = map[key]
    if (!item) return
    scrollToSection(item.section)
    handleSend(item.msg)
  }

  const contentVisible = useMemo(() => open && !minimized, [open, minimized])

  return (
    <div className="page">
      <Navbar onNavigate={scrollToSection} />
      <MainContent />
      <ToggleButton open={open} onClick={() => setOpen((v) => !v)} />
      <div className={`chatbot-widget ${contentVisible ? 'active' : ''}`} role="dialog" aria-label="College Enquiry Assistant">
        <ChatbotHeader
          onMinimize={() => setMinimized((v) => !v)}
          onClose={() => { setOpen(false); setMinimized(false) }}
          minimized={minimized}
        />
        {!minimized && (
          <div className="chatbot-content">
            {messages.length <= 1 && (
              <div className="empty-state">
                <div className="bot-illustration">
                  <i className="fas fa-robot" />
                </div>
                <h4>Hi! I'm your College Enquiry Assistant.</h4>
                <p>Ask me about admissions, courses, fees & more.</p>
              </div>
            )}
            <QuickActions onAction={onQuickAction} />
            <ChatArea containerRef={containerRef} messages={messages} isTyping={isTyping} />
          </div>
        )}
        {!minimized && (
          <InputBar onSend={handleSend} />
        )}
      </div>
      <div className={`chatbot-overlay ${contentVisible ? 'active' : ''}`} onClick={() => setOpen(false)} />
    </div>
  )
}

async function mockBotReply(input) {
  const text = input.toLowerCase()
  if (/(admission|apply|eligibility)/.test(text)) {
    return 'Admissions: Applications open in March. Eligibility varies by course; typically 50%+ in qualifying exams. Visit the Admissions page for dates and documents.'
  }
  if (/(course|program|department)/.test(text)) {
    return 'Courses: We offer B.Tech, B.Sc, B.Com, BBA, and PG programs. Specializations include CS, ECE, Mechanical, and more.'
  }
  if (/(fee|tuition|scholarship)/.test(text)) {
    return 'Fees: Undergraduate fees start from ₹60,000/year. Merit-based scholarships and need-based aid are available.'
  }
  if (/(contact|phone|email|location)/.test(text)) {
    return 'Contact: +91-XXXXXXXXXX | admissions@college.edu | Campus Road, City. Office hours: Mon-Fri 9:00–17:00.'
  }
  if (/(calendar|holiday|schedule|semester)/.test(text)) {
    return 'Academic Calendar: Semester I starts July 15. Midterms in September, finals in November. Winter break in December.'
  }
  if (/(hello|hi|hey)/.test(text)) {
    return 'Hello! How can I help you today with admissions, courses, fees, or contacts?'
  }
  return "Sorry, I didn’t understand that. Try asking about admissions, courses, fees, contact, or the academic calendar."
}
