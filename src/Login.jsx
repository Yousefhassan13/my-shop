import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Stack,
} from '@mui/material';

export default function Login({ onLogin }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function handleLogin() {
    const saveUser = localStorage.getItem('user');
    const user = saveUser ? JSON.parse(saveUser) : null;
    if (user) {
      if (
        user.email === formData.email &&
        user.password === formData.password
      ) {
        onLogin(user);
        navigate('/');
      } else {
        setError('Invalid email or password');
      }
    }
  }
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h4" mb={5} style={{ marginBottom: '30px' }}>
          Login
        </Typography>
        <Stack spacing={2}>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            type="email"
            value={formData.email}
            onChange={(e) => {
              return setFormData({ ...formData, email: e.target.value });
            }}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
            value={formData.password}
            onChange={(e) => {
              return setFormData({ ...formData, password: e.target.value });
            }}
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={handleLogin}
          >
            Login
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}
