import React, { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
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
  MenuItem,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import { useAuth } from "../Components/AuthContext";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [role, setRole] = useState("user");

  const handleSignUp = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const fullName = e.target.fullName.value;

    try {
      // ✅ Register
      const res = await axios.post("https://localhost:7163/api/Auth/register", {
        fullName,
        email,
        password,
        role,
      });

      if (res.status === 200) {
        // ✅ Auto-login
        const loginRes = await axios.post("https://localhost:7163/api/Auth/login", {
          email,
          password,
        });

        if (loginRes.status === 200) {
          const data = loginRes.data;
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
          setUser(data.user);
          navigate(data.user.role === "admin" ? "/admin/dashboard" : "/user/dashboard");
        } else {
          alert("Registered, but login failed. Please log in manually.");
        }
      } else {
        alert("Sign up failed! Please try again.");
      }
    } catch (err) {
      console.error("Sign up error:", err.response?.data || err.message);
      let message = "Sign up failed!";
      if (err.response && err.response.data) {
        if (err.response.data.error) {
          message = err.response.data.error;
        }
        if (err.response.data.details) {
          const details = Array.isArray(err.response.data.details)
            ? err.response.data.details.map((d) => d.description || d).join(", ")
            : err.response.data.details;
          message += ` Details: ${details}`;
        }
      }
      alert(message);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, p: 4, boxShadow: 3, borderRadius: 3, backgroundColor: "#696a6861" }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Sign up
        </Typography>

        <Box component="form" onSubmit={handleSignUp}>
          <TextField
            fullWidth
            label="Full name"
            name="fullName"
            margin="normal"
            required
            autoComplete="name"
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            margin="normal"
            required
            autoComplete="email"
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            margin="normal"
            required
            autoComplete="new-password"
          />

          <TextField
            select
            label="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            fullWidth
            margin="normal"
          >
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </TextField>

          <FormControlLabel control={<Checkbox />} label="I want to receive updates via email." />

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
          Already have an account?{" "}
          <Link component={RouterLink} to="/" underline="hover">
            Sign in
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default SignUp;
