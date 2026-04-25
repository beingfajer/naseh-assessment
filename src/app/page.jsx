'use client'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import AssessmentWizard from '@/components/wizard/AssessmentWizard'

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [existingData, setExistingData] = useState(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const isEdit = searchParams.get('edit') === 'true'

  useEffect(() => {
    fetch('/api/assessment')
      .then(r => r.json())
      .then(data => {
        if (data && data.id) {
          if (isEdit) {
            setExistingData(data)
            setLoading(false)
          } else {
            localStorage.setItem('assessmentId', data.id)
            router.push('/chat')
          }
        } else { 
          setLoading(false)
        }
      })
      .catch(() => setLoading(false))
  }, [isEdit])

  if (loading) {
    return <div className="loading-screen"><p>Loading...</p></div>
  }

  // If not loading and no existing data, show the wizard to create new assessment
  return <AssessmentWizard existingData={existingData} />
}