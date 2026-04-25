export default function ChatMessage({ message }) {
  const isUser = message.role === 'user'
  const time = new Date(message.createdAt).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  })

  return (
    <div className={`message-wrapper ${message.role}`}>
      <div className="message-bubble">
        {message.content}
      </div>
      <span className="message-time">{time}</span>
    </div>
  )
}