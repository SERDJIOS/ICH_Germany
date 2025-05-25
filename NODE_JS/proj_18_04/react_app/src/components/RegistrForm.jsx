import { useState } from 'react'
import { regUser } from '../service/userService'

export default function RegisterForm() {
  const [userData, setUserData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
  })

  function handleChange(e) {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const user = await regUser(userData)
      console.log(user)
    } catch (error) {
      console.error(`Error: ${error}`)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        name='name'
        id=''
        placeholder='Name'
        onChange={handleChange}
      />
      <input
        type='text'
        name='username'
        id=''
        placeholder='Username'
        onChange={handleChange}
      />
      <input
        type='text'
        name='email'
        id=''
        placeholder='E-mail'
        onChange={handleChange}
      />
      <input
        type='text'
        name='password'
        id=''
        placeholder='Password'
        onChange={handleChange}
      />
      <button>Submit</button>
    </form>
  )
}
