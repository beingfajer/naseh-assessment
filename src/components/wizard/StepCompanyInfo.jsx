export default function StepCompanyInfo({ data, onChange }) {
  return (
    <div className="step-container">
      <h2 className="step-title">Company Information</h2>
      <p className="step-subtitle">Tell us about your company</p>

      <div className="form-group">
        <label className="form-label">Company Name</label>
        <input
          className="form-input"
          type="text"
          placeholder="e.g. Bloom & Co"
          value={data.companyName}
          onChange={e => onChange('companyName', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Company Email</label>
        <input
          className="form-input"
          type="email"
          placeholder="e.g. hello@company.com"
          value={data.companyEmail}
          onChange={e => onChange('companyEmail', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Company Location</label>
        <input
          className="form-input"
          type="text"
          placeholder="e.g. Doha, Qatar"
          value={data.companyLocation}
          onChange={e => onChange('companyLocation', e.target.value)}
        />
      </div>
    </div>
  )
}