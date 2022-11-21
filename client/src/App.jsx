import { useEffect, useState } from 'react'

const App = () => {
  const [name, setName] = useState('')
  const [status, setStatus] = useState('')
  const [users, setUsers] = useState([])

  const loadUsers = async () => {
    const response = await fetch('/api/users')
    const data = await response.json()
    setUsers(data.users)
    setStatus(data.status)
  }

  useEffect(() => {
    loadUsers()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name: name }),
      headers: {
        "Content-Type": "application/json"
      }
    })

    const data = await response.json()
    loadUsers()
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input style={{ fontSize: '1.25rem' }} name="name" placeholder="Type your name" onChange={e => setName(e.target.value)} />

        <button style={{ fontSize: '1.25rem', borderRadius: '10%', border: 'none', backgroundColor: '#1B7CED', color: 'white', cursor: 'pointer', marginLeft: '10px' }}>Save</button>
      </form>

      <code style={{ backgroundColor: '#EBECF0', color: '#1B7CED', fontSize: '1.25rem' }}>Status -> {status}</code>
      {users && <ul>
        {users.map(user => (
          <li key={user._id}>{user.name}</li>
        ))}
      </ul>}
    </div>
  )
}

export default App
