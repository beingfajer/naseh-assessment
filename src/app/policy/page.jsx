'use client'
import { useEffect, useState } from 'react'
import { MessageSquare, FileText, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import PolicyEditor from '@/components/policy/PolicyEditor'
import '@/styles/policy.css'
import '@/styles/chat.css'

export default function PolicyPage() {
  const [policies, setPolicies] = useState([])
  const [assessmentId, setAssessmentId] = useState(null)
  const [assessment, setAssessment] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const id = localStorage.getItem('assessmentId')
    if (!id) { router.push('/'); return }
    setAssessmentId(id)

    fetch('/api/assessment')
      .then(r => r.json())
      .then(data => setAssessment(data))

    fetch(`/api/policy?assessmentId=${id}`)
      .then(r => r.json())
      .then(data => setPolicies(Array.isArray(data) ? data : []))
  }, [])

  const handleSave = async (updated) => {
    await fetch('/api/policy', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated)
    })
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this policy?')) return
    await fetch('/api/policy', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    })
    setPolicies(prev => prev.filter(p => p.id !== id))
  }

  if (!assessment) return <div className="loading-screen"><p>Loading...</p></div>

  return (
    <div className="policy-layout">
      <aside className="chat-sidebar">
        <div className="sidebar-company">
          <p className="sidebar-company-name">{assessment.companyName}</p>
          <p className="sidebar-company-activity">{assessment.primaryActivity}</p>
        </div>
        <nav className="sidebar-nav">
          <button className="sidebar-btn" onClick={() => router.push('/chat')}><MessageSquare size={18} /> Chat</button>
          <button className="sidebar-btn active"><FileText size={18} /> Policies</button>
        </nav>
      </aside>

      <main className="policy-main">
        <div className="policy-header">
          <p className="policy-header-title">Company Policies</p>
          <button className="back-btn" onClick={() => router.push('/chat')}><ArrowLeft size={18} style={{marginRight: 4}} /> Back to Chat</button>
        </div>

        <div className="policy-content">
          {policies.length === 0 ? (
            <div className="policy-empty">
              <p className="policy-empty-title">No policies yet</p>
              <p className="policy-empty-subtitle">Go to chat and ask to generate a policy for your company</p>
            </div>
          ) : (
            policies.map(policy => (
              <PolicyEditor
                key={policy.id}
                policy={policy}
                onSave={handleSave}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>
      </main>
    </div>
  )
}