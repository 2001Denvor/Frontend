import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../Components/AuthContext";
 // adjust path as needed
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
  Stack,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSignIn = async (e) => {
  e.preventDefault();
  try {
    const email = e.target.email.value;
    const password = e.target.password.value;

    const user = await login(email, password);
    if (!user) {
      alert("Login failed");
      return;
    }

    if (user.role === 'admin') {
      navigate('/admin/dashboard');
    } else if(user.role == 'user') {
      navigate('/user/dashboard');
    }else{
      alert("Invalid role");
    }
  } catch (err) {
    console.error("Login error:", err);
    alert("Something went wrong. Please try again.");
  }
};

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: 3,
          p: 4,
          borderRadius: 3,
          backgroundColor: 'white',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <Box component="form" noValidate sx={{ mt: 2 }} onSubmit={handleSignIn}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />

          <Button
            type="submit" // add this
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 2, background: 'linear-gradient(to right,rgb(8, 8, 8),rgb(1, 6, 16))', color: 'white' }}
          >
            Sign In
          </Button>

          

          <Link href="#" variant="body2" display="block" textAlign="center" sx={{ mb: 2 }}>
            Forgot your password?
          </Link>

          <Divider>or</Divider>

          <Stack spacing={2} mt={2}>
            <Button fullWidth variant="outlined" startIcon={<GoogleIcon />}>
              Sign in with Google
            </Button>

            <Button fullWidth variant="outlined" startIcon={<FacebookIcon />}>
              Sign in with Facebook
            </Button>
          </Stack>

          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Don't have an account?{' '}
            <Link
              component={RouterLink}
              to="/signup"
              onClick={e => e.stopPropagation()} // or e.preventDefault()
            >
              Sign up
            </Link>

          </Typography>

        </Box>
      </Box>
    </Container>
  );
}