'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import ChatWindow from '@/components/chat/ChatWindow'
import '@/styles/chat.css'

export default function ChatPage() {
  const [assessmentId, setAssessmentId] = useState(null)
  const [assessment, setAssessment] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const id = localStorage.getItem('assessmentId')
    if (!id) {
      router.push('/')
      return
    }
    setAssessmentId(id)

    fetch('/api/assessment')
      .then(r => r.json())
      .then(data => setAssessment(data))
  }, [])

  if (!assessmentId || !assessment) {
    return <div className="loading-screen"><p>Loading...</p></div>
  }

  return <ChatWindow assessmentId={assessmentId} assessment={assessment} />
}