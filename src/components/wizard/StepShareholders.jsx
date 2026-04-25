export default function StepShareholders({ data, onChange }) {
  const addShareholder = () => {
    onChange('shareholders', [...data.shareholders, { name: '', percentage: '' }])
  }

  const removeShareholder = (index) => {
    const updated = data.shareholders.filter((_, i) => i !== index)
    onChange('shareholders', updated)
  }

  const updateShareholder = (index, field, value) => {
    const updated = data.shareholders.map((s, i) =>
      i === index ? { ...s, [field]: value } : s
    )
    onChange('shareholders', updated)
  }

  const total = data.shareholders.reduce((sum, s) => sum + (parseFloat(s.percentage) || 0), 0)

  return (
    <div className="step-container">
      <h2 className="step-title">Shareholders</h2>
      <p className="step-subtitle">Add your company shareholders and their percentages</p>

      {data.shareholders.map((s, i) => (
        <div key={i} className="shareholder-row">
          <input
            className="form-input shareholder-name"
            type="text"
            placeholder="Shareholder name"
            value={s.name}
            onChange={e => updateShareholder(i, 'name', e.target.value)}
          />
          <input
            className="form-input shareholder-percent"
            type="number"
            placeholder="%"
            min="0"
            max="100"
            value={s.percentage}
            onChange={e => updateShareholder(i, 'percentage', e.target.value)}
          />
          <button
            className="remove-btn"
            onClick={() => removeShareholder(i)}
          >
            ✕
          </button>
        </div>
      ))}

      <div className="shareholders-footer">
        <button className="add-shareholder-btn" onClick={addShareholder}>
          + Add Shareholder
        </button>
        <span className={`total-percent ${total > 100 ? 'over' : total === 100 ? 'exact' : ''}`}>
          Total: {total}%
        </span>
      </div>
    </div>
  )
}