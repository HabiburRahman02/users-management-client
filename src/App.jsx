import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';

function App() {
  const [users, setUsers] = useState([]);

  const handleAddUser = e => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value
    const email = form.email.value
    const user = { name, email }
    console.log(user)

    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
  }

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))

  }, [])

  return (
    <div>
      <h2>User management: {users.length}</h2>
      <form onSubmit={handleAddUser}>
        <input type="name" name='name' /> <br />
        <input type="email" name='email' /><br />
        <input type="submit" value="Add User" /><br />
      </form>
      {
        users.map(user => <p key={user.id}>{user.id} : {user.name} : {user.email}</p>)
      }
    </div>
  )
}

export default App
