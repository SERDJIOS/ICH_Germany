import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UserRegistration from './components/UserRegistration';
import UserList from './components/UserList';
import AddTransaction from './components/AddTrans';
import UserLogin from './components/UserLogin';
import { Container, Button, Typography } from '@mui/material';

function App() {
  return (
    <Router>
      <br />
      <br />
      <br />
      <br />
      <br />

      <Container>
        <Typography variant="h4" gutterBottom>
          User Management
        </Typography>
        <Button variant="contained" color="primary" component={Link} to="/register">
          Register
        </Button>
        <Button variant="contained" color="primary" component={Link} to="/login" style={{ margin: '0 auto' }}>
          Login
        </Button>
        <Button variant="contained" color="primary" component={Link} to="/" style={{ margin: '0 auto' }}>
          List
        </Button>
        <br />
        <br />
        <br />
        <br />
        <br />
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/register" element={<UserRegistration />} />
          <Route path="/login" element={<UserLogin />} />
        </Routes>
        <AddTransaction />
      </Container>
    </Router>
  );
}

export default App;