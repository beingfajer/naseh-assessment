export default function StepActivity({ data, onChange }) {
  return (
    <div className="step-container">
      <h2 className="step-title">Primary Activity</h2>
      <p className="step-subtitle">What does your company do?</p>

      <div className="form-group">
        <label className="form-label">Describe your primary business activity</label>
        <textarea
          className="form-textarea"
          placeholder="e.g. Retail and wholesale of fresh flowers, floral arrangements, and gift bouquets for events, weddings, and corporate clients"
          value={data.primaryActivity}
          onChange={e => onChange('primaryActivity', e.target.value)}
          rows={5}
        />
      </div>
    </div>
  )
}