'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { MessageSquare, FileText, Edit, Trash2 } from 'lucide-react'
import ChatMessage from './ChatMessage'
import ChatInput from './ChatInput'

export default function ChatWindow({ assessmentId, assessment }) {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [typing, setTyping] = useState(false)
  const messagesEndRef = useRef(null) // auto scroll to bottom
  const router = useRouter()

  useEffect(() => {
    fetch(`/api/messages?assessmentId=${assessmentId}`)
      .then(r => r.json())
      .then(data => setMessages(Array.isArray(data) ? data : []))
  }, [assessmentId])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const handleSend = async (content) => {
    const userMessage = {
      id: Date.now(),
      role: 'user',
      content,
      createdAt: new Date().toISOString()
    }
    setMessages(prev => [...prev, userMessage])
    setTyping(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assessmentId, content })
      })
      const data = await res.json()
      setMessages(prev => [...prev, data])
    } catch (err) {
      console.error(err)
    } finally {
      setTyping(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this assessment? This will delete all data.')) return
    await fetch('/api/assessment', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: assessmentId })
    })
    localStorage.removeItem('assessmentId')
    router.push('/')
  }

  return (
    <div className="chat-layout">
      <aside className="chat-sidebar">
        <div className="sidebar-company">
          <p className="sidebar-company-name">{assessment.companyName}</p>
          <p className="sidebar-company-activity">{assessment.primaryActivity}</p>
        </div>

        <nav className="sidebar-nav">
          <button className="sidebar-btn active"><MessageSquare size={18} /> Chat</button>
          <button className="sidebar-btn" onClick={() => router.push('/policy')}><FileText size={18} /> Policies</button>
        </nav>

        <div className="sidebar-footer">
          <button className="sidebar-action-btn" onClick={() => router.push('/?edit=true')}>
            <Edit size={18} /> Edit Assessment
          </button>
          <button className="sidebar-action-btn danger" onClick={handleDelete}>
            <Trash2 size={18} /> Delete Assessment
          </button>
        </div>
      </aside>

      <main className="chat-main">
        <div className="chat-header">
          <div>
            <p className="chat-header-title">Company Assistant</p>
            <p className="chat-header-subtitle">Ask anything about {assessment.companyName}</p>
          </div>
        </div>

        <div className="chat-messages">
          {messages.length === 0 && !typing && (
            <div className="chat-empty">
              <p className="chat-empty-title">No messages yet</p>
              <p className="chat-empty-subtitle">Ask about regulations, policies, or anything about your company</p>
            </div>
          )}

          {messages.map(msg => (
            <ChatMessage key={msg.id} message={msg} />
          ))}

          {typing && (
            <div className="typing-indicator">
              <div className="typing-dot" />
              <div className="typing-dot" />
              <div className="typing-dot" />
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <ChatInput onSend={handleSend} disabled={typing} />
      </main>
    </div>
  )
}