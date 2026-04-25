'use client'
import { useState } from 'react'
import { Save, Trash2 } from 'lucide-react'

export default function PolicyEditor({ policy, onSave, onDelete }) {
  const [title, setTitle] = useState(policy.title)
  const [content, setContent] = useState(policy.content)
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    await onSave({ id: policy.id, title, content })
    setSaving(false)
  }

  return (
    <div className="policy-card">
      <div className="policy-card-header">
        <input
          className="policy-card-title-input"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <div className="policy-card-actions">
          <button className="policy-save-btn" onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : <><Save size={16} style={{marginRight: 4}} />Save</>}
          </button>
          <button className="policy-delete-btn" onClick={() => onDelete(policy.id)}>
            <Trash2 size={16} style={{marginRight: 4}} />Delete
          </button>
        </div>
      </div>
      <div className="policy-editor-area">
        <textarea
          className="policy-textarea"
          value={content}
          onChange={e => setContent(e.target.value)}
        />
      </div>
    </div>
  )
}