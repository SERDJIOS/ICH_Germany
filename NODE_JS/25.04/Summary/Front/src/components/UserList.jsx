import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  List, ListItem, Typography, IconButton,
  TextField, Box
} from '@mui/material'
import { Edit, Delete, Save, Cancel } from '@mui/icons-material'

const UserList = () => {
  const [users, setUsers] = useState([])
  const [editId, setEditId] = useState(null)
  const [editData, setEditData] = useState({ name: '', email: '', age: '' })

  const fetchUsers = () => {
    axios.get('http://localhost:3000/users')
      .then(res => setUsers(res.data))
      .catch(err => console.error('Failed to fetch users', err))
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleEdit = (user) => {
    setEditId(user._id)
    setEditData({ name: user.name, email: user.email, age: user.age })
  }

  const handleCancel = () => {
    setEditId(null)
    setEditData({ name: '', email: '', age: '' })
  }

  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost:3000/users/${editId}`,
        editData,
        { headers: { 'Content-Type': 'application/json' } }
      )
      setEditId(null)
      fetchUsers()
    } catch (err) {
      console.error('Failed to update user', err)
      console.log(err.response?.data)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/users/${id}`)
      fetchUsers()
    } catch (err) {
      console.error('Failed to delete user', err)
    }
  }

  return (
    <div>
      <Typography variant="h6" gutterBottom>Users:</Typography>
      <List>
        {users.map(user => (
          <ListItem key={user._id} divider>
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              {editId === user._id ? (
                <>
                  <TextField
                    label="Name"
                    size="small"
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    sx={{ mr: 1 }}
                  />
                  <TextField
                    label="Email"
                    size="small"
                    value={editData.email}
                    onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                    sx={{ mr: 1 }}
                  />
                  <TextField
                    label="Age"
                    size="small"
                    type="number"
                    value={editData.age}
                    onChange={(e) => setEditData({ ...editData, age: Number(e.target.value) })}
                    sx={{ mr: 1 }}
                  />
                  <IconButton onClick={handleSave}><Save /></IconButton>
                  <IconButton onClick={handleCancel}><Cancel /></IconButton>
                </>
              ) : (
                <>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography>{user.name} ({user.email})</Typography>
                    <Typography variant="body2" color="textSecondary">Age: {user.age}</Typography>
                  </Box>
                  <IconButton onClick={() => handleEdit(user)}><Edit /></IconButton>
                  <IconButton onClick={() => handleDelete(user._id)}><Delete /></IconButton>
                </>
              )}
            </Box>
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default UserList