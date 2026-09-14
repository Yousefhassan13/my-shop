import {
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    email: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  function handleSignup() {
    if (
      formData.name === '' ||
      formData.email === '' ||
      formData.password === ''
    ) {
      setError('Empty fields');
      return;
    } else if (!formData.email.includes('@')) {
      setError('The email address must contain the @ symbol.');
      return;
    } else if (formData.password.length < 6) {
      setError('The password is less than 6 characters long.');
      return;
    }
    setError('');
    localStorage.setItem('user', JSON.stringify(formData));
    navigate("/login")
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h4" mb={5} style={{ marginBottom: '20px' }}>
          Create Account
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
            }}
          />

          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
            }}
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={formData.password}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
            }}
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={handleSignup}
          >
            Sign Up
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}
