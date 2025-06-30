import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ FIXED: import added
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
import { useAuth } from "../Components/AuthContext";

const SignUp = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [role, setRole] = useState("user"); // ✅ New: role selection

  const handleSignUp = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const fullName = e.target.fullName.value;

    try {
      const response = await fetch("http://localhost:5238/api/Auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password, role }),
      });

      if (response.ok) {
        const loginRes = await fetch("http://localhost:5238/api/Auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        if (loginRes.ok) {
          const userData = await loginRes.json();
          login(userData);
          navigate(userData.role === 'admin' ? '/admin/dashboard' : '/user/dashboard');
        } else {
          alert("Registered, but login failed. Try manually.");
        }
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Sign up failed!");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("An error occurred.");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, p: 4, boxShadow: 3, borderRadius: 3, backgroundColor: '#fff' }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Sign up
        </Typography>

        <Box component="form" onSubmit={handleSignUp}>
          <TextField fullWidth label="Full name" name="fullName" margin="normal" required />
          <TextField fullWidth label="Email" name="email" type="email" margin="normal" required />
          <TextField fullWidth label="Password" name="password" type="password" margin="normal" required />

          {/* ✅ Role select dropdown */}
          <TextField
            select
            label="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            fullWidth
            margin="normal"
            SelectProps={{ native: true }}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </TextField>

          <FormControlLabel
            control={<Checkbox />}
            label="I want to receive updates via email."
          />

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, mb: 2 }}>
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
