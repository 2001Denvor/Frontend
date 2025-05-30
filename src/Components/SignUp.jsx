// SignUp.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Components/AuthContext';
import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  TextField,
  Typography,
  Link,
  Stack
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import { Link as RouterLink } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleSignUp = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target.fullname.value;

    const newUser = signup(email, password, name);
      if (newUser) {
        navigate(newUser.role === 'admin' ? '/admin' : '/dashboard');
      } else {
        alert('User already exists!');
      }

  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, p: 4, boxShadow: 3, borderRadius: 3, backgroundColor: '#fff' }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Sign up
        </Typography>

        <Box component="form" onSubmit={handleSignUp}>
          <TextField
            fullWidth
            label="Full name"
            name="fullname"
            margin="normal"
            placeholder="Full name"
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            margin="normal"
            placeholder="your@email.com"
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            margin="normal"
            type="password"
          />

          <FormControlLabel
            control={<Checkbox />}
            label="I want to receive updates via email."
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 2, background: 'linear-gradient(to right, #111, #222)', color: 'white' }}
          >
            Sign up
          </Button>
        </Box>

        <Divider>or</Divider>

        <Stack spacing={2} mt={2}>
          <Button fullWidth variant="outlined" startIcon={<GoogleIcon />}>
            Sign up with Google
          </Button>

          <Button fullWidth variant="outlined" startIcon={<FacebookIcon />}>
            Sign up with Facebook
          </Button>
        </Stack>

        <Typography mt={3} textAlign="center">
          Already have an account?{' '}
          <Link component={RouterLink} to="/" underline="hover">
            Sign in
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default SignUp;
