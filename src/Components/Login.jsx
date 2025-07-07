import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../Components/AuthContext";
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
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const email = e.target.email.value;
      const password = e.target.password.value;

      // ✅ Call backend login endpoint
      const response = await axios.post("http://localhost:5238/api/Auth/login", {
        email,
        password,
      });

      const { token, user } = response.data;

      if (!token) {
        alert("Login failed: No token received");
        return;
      }

      // ✅ Save token to localStorage
      localStorage.setItem("token", token);

      // ✅ Set default header for Axios
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // ✅ Update global user context
      setUser(user);

      // ✅ Navigate based on role
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else if (user.role === "user") {
        navigate("/user/dashboard");
      } else {
        alert("Invalid role");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Invalid email or password. Please try again.");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: 3,
          p: 4,
          borderRadius: 3,
          backgroundColor: "#A0A0A6",
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
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              mb: 2,
              background: "linear-gradient(to right, rgb(8, 8, 8), rgb(1, 6, 16))",
              color: "white",
            }}
          >
            Sign In
          </Button>

          {/* ✅ Fixed "Forgot password?" link */}
          <Link
            component={RouterLink}
            to="/forgot-password"
            variant="body2"
            display="block"
            textAlign="center"
            sx={{ mb: 2 }}
          >
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
            Don’t have an account?{" "}
            <Link component={RouterLink} to="/signup">
              Sign up
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
