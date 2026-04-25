import styles from '@/styles/wizard.css'

export default function WizardProgress({ currentStep, totalSteps }) {
  return (
    <div className="wizard-progress">
      {Array.from({ length: totalSteps }).map((_, i) => (
        <div key={i} className="progress-step-wrapper">
          <div className={`progress-step ${i < currentStep ? 'completed' : ''} ${i === currentStep ? 'active' : ''}`}>
            {i < currentStep ? '✓' : i + 1}
          </div>
          {i < totalSteps - 1 && (
            <div className={`progress-line ${i < currentStep - 1 ? 'completed' : ''}`} />
          )}
        </div>
      ))}
    </div>
  )
}