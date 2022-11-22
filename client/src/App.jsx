import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

import './index.css'

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
    setName('')
    toast.success('Created user!', {
      duration: 4000,
      position: 'top-right'
    })
  }

  const deleteUser = async (id) => {
    const response = await fetch(`/api/users`, {
      method: 'DELETE',
      body: JSON.stringify({ _id: id }),
      headers: {
        "Content-Type": "application/json"
      }
    })

    loadUsers()

    const data = await response.json()

    if (data.status == 200) {
      toast.success('User deleted successfully!', {
        duration: 4000,
        position: 'top-right'
      })
      return "User deleted!"
    } else {
      toast.error('Error while deleting user.', {
        duration: 4000,
        position: 'top-right'
      })
      return "An error ocurred."
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input style={{ fontSize: '1.25rem' }} name="name" placeholder="Type your name" value={name} onChange={e => setName(e.target.value)} />

        <button style={{ fontSize: '1.25rem', borderRadius: '10%', border: 'none', backgroundColor: '#1B7CED', color: 'white', cursor: 'pointer', marginLeft: '10px' }}>Save</button>
      </form>

      <code style={{ backgroundColor: '#EBECF0', color: '#1B7CED', fontSize: '1.25rem' }}>Status -> {status == 200 ? 'OK' : 'Error'}</code>
      {users && <ul>
        {users.map(user => (
          <>
            <li style={{ fontSize: '1.25rem', marginBottom: '5px' }} key={user._id}>{user.name}
              <button style={{ marginLeft: '0.25rem', backgroundColor: '#DC143C', border: 'none', color: 'white', fontSize: '1.1rem', borderRadius: '10%', height: '1.5rem', cursor: 'pointer' }} onClick={() => deleteUser(user._id)}>Delete user</button>
            </li>
          </>
        ))}
      </ul>}

      <footer>
        Pls don't remove all users :) thx
      </footer>
      <Toaster />
    </div>
  )
}

export default App
