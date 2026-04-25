'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import WizardProgress from './WizardProgress'
import StepCompanyInfo from './StepCompanyInfo'
import StepShareholders from './StepShareholders'
import StepActivity from './StepActivity'
import '@/styles/wizard.css'

const STEPS = ['Company Info', 'Shareholders', 'Activity']

export default function AssessmentWizard({ existingData = null }) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    companyName: existingData?.companyName || '',
    companyEmail: existingData?.companyEmail || '',
    companyLocation: existingData?.companyLocation || '',
    primaryActivity: existingData?.primaryActivity || '',
    shareholders: existingData?.shareholders || [{ name: '', percentage: '' }],
  })

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const validateStep = () => {
    if (currentStep === 0) {
      if (!formData.companyName || !formData.companyEmail || !formData.companyLocation) {
        setError('Please fill in all fields')
        return false
      }
    }
    if (currentStep === 1) {
      const valid = formData.shareholders.every(s => s.name && s.percentage)
      if (!valid) {
        setError('Please fill in all shareholder fields')
        return false
      }
      const total = formData.shareholders.reduce((sum, s) => sum + parseFloat(s.percentage || 0), 0)
      if (total !== 100) {
        setError('Shareholder percentages must add up to 100%')
        return false
      }
    }
    if (currentStep === 2) {
      if (!formData.primaryActivity) {
        setError('Please describe your primary activity')
        return false
      }
    }
    setError('')
    return true
  }

  const handleNext = () => {
    if (!validateStep()) return
    setCurrentStep(prev => prev + 1)
  }

  const handleBack = () => {
    setError('')
    setCurrentStep(prev => prev - 1)
  }

  const handleSubmit = async () => {
    if (!validateStep()) return
    setSubmitting(true)

    try {
      const payload = {
        ...formData,
        shareholders: formData.shareholders.map(s => ({
          name: s.name,
          percentage: parseFloat(s.percentage)
        }))
      }

      const method = existingData ? 'PUT' : 'POST'
      const body = existingData ? { ...payload, id: existingData.id } : payload

      const res = await fetch('/api/assessment', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      const data = await res.json()
      localStorage.setItem('assessmentId', data.id)
      router.push('/chat')
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="wizard-wrapper">
      <div className="wizard-card">
        <div className="wizard-header">
          <h1 className="wizard-title">Company Assessment</h1>
          <p className="wizard-subtitle">Step {currentStep + 1} of {STEPS.length} — {STEPS[currentStep]}</p>
        </div>

        <WizardProgress currentStep={currentStep} totalSteps={STEPS.length} />

        <div className="wizard-body">
          {currentStep === 0 && <StepCompanyInfo data={formData} onChange={handleChange} />}
          {currentStep === 1 && <StepShareholders data={formData} onChange={handleChange} />}
          {currentStep === 2 && <StepActivity data={formData} onChange={handleChange} />}
        </div>

        {error && <p className="wizard-error">{error}</p>}

        <div className="wizard-actions">
          {currentStep > 0 && (
            <button className="btn-secondary" onClick={handleBack}>Back</button>
          )}
          {currentStep < STEPS.length - 1 ? (
            <button className="btn-primary" onClick={handleNext}>Next</button>
          ) : (
            <button className="btn-primary" onClick={handleSubmit} disabled={submitting}>
              {submitting ? 'Saving...' : 'Complete Assessment'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}