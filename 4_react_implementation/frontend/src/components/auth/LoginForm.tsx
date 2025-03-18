import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../services/auth';
import { LoginCredentials } from '../../types';
import { Box, Button, Container, TextField, Typography, Paper } from '@mui/material';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState<LoginCredentials>({
    first_name: '',
    last_name: '',
    password: '',
  });
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const response = await login(credentials);
      localStorage.setItem('token', response.token);
      navigate('/dashboard');
    } catch (error) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography component="h1" variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="First Name"
            value={credentials.first_name}
            onChange={(e) => setCredentials({ ...credentials, first_name: e.target.value })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Last Name"
            value={credentials.last_name}
            onChange={(e) => setCredentials({ ...credentials, last_name: e.target.value })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          />
          {error && (
            <Typography color="error" align="center" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <Typography align="center">
            Don't have an account?{' '}
            <Button
              component={Link}
              to="/register"
              variant="text"
              sx={{ textTransform: 'none' }}
            >
              Register here
            </Button>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginForm; 