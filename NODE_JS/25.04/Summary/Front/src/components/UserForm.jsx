import React from 'react'
import { useState } from 'react'
import { TextField, Button, Box } from '@mui/material'
import axios from 'axios'

const UserForm = ({ onUserAdded }) => {
  const [formData, setFormData] = useState({ name: '', email: '', age: '' })

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:3000/users', formData)
      onUserAdded()
      setFormData({ name: '', email: '', age: '' })
    } catch (err) {
      console.error('Error adding user', err)
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, mb: 4 }}>
      <TextField label="Name" name="name" value={formData.name} onChange={handleChange} required />
      <TextField label="Email" name="email" value={formData.email} onChange={handleChange} required />
      <TextField label="Age" name="age" type="number" value={formData.age} onChange={handleChange} required />
      <Button variant="contained" type="submit">Add</Button>
    </Box>
  )
}

export default UserForm