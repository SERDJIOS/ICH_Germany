import React, { useState, useEffect } from 'react';
import { Container, Typography, MenuItem, Select, InputLabel, FormControl, TextField, Button } from '@mui/material';
import axios from '../axios';

const AddTransaction = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/users'); // Получаем список пользователей
        setUsers(response.data);
      } catch (err) {
        console.error('Error fetching users:', err);
        setMessage('Ошибка при загрузке пользователей');
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedUser || !description || !amount) {
      setMessage('Пожалуйста, заполните все поля');
      return;
    }

    try {
      const response = await axios.post(`/api/transaction/${selectedUser}`, {
        description,
        amount,
      });

      if (response.status === 201) {
        setMessage('Транзакция добавлена успешно');
        setDescription('');
        setAmount('');
      }
    } catch (err) {
      setMessage('Ошибка при добавлении транзакции');
      console.error(err);
    }
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Добавить транзакцию
      </Typography>

      {/* Выбор пользователя */}
      <FormControl fullWidth margin="normal">
        <InputLabel>Выберите пользователя</InputLabel>
        <Select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          label="Выберите пользователя"
        >
          {users.map((user) => (
            <MenuItem key={user._id} value={user._id}>
              {user.name} - {user.email}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Описание транзакции */}
      <TextField
        label="Описание транзакции"
        variant="outlined"
        fullWidth
        margin="normal"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {/* Сумма транзакции */}
      <TextField
        label="Сумма"
        type="number"
        variant="outlined"
        fullWidth
        margin="normal"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      {/* Сообщение о статусе */}
      {message && (
        <Typography variant="body1" color="error" gutterBottom>
          {message}
        </Typography>
      )}

      {/* Кнопка отправки формы */}
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Добавить транзакцию
      </Button>
    </Container>
  );
};

export default AddTransaction;