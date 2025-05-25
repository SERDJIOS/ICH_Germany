import { Container, Typography } from '@mui/material'
import UserForm from './components/UserForm'
import UserList from './components/UserList'
import React from 'react'


function App() {

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>User Manager</Typography>
      <UserForm />
      <UserList />
    </Container>
  )
}

export default App