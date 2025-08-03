
import React, { useState, useEffect } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Stack,
  Divider,
  Link,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import { useAuth0 } from "@auth0/auth0-react";
import { useAuth } from "../Components/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login, user: jwtUser } = useAuth();
  const {
    loginWithRedirect,
    isAuthenticated,
    user: auth0User,
    isLoading,
  } = useAuth0();

  const [rememberMe, setRememberMe] = useState(false);

  // ✅ Redirect after Auth0 login (by email or role)
  useEffect(() => {
    if (!isLoading && isAuthenticated && auth0User) {
      const email = auth0User.email;
      const isAdmin = email === "admin@example.com"; // Replace with your logic
      navigate(isAdmin ? "/admin/dashboard" : "/user/dashboard");
    }
  }, [isAuthenticated, auth0User, isLoading, navigate]);

  // ✅ Handle JWT login
  const handleSignIn = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const res = await login(email, password);

    if (res.success) {
      const role = res.user.role;
      navigate(role === "admin" ? "/admin/dashboard" : "/user/dashboard");
    } else {
      alert(res.error);
    }
  };

  // ✅ Google Login (Auth0)
  const handleGoogleLogin = () => {
    loginWithRedirect({ connection: "google-oauth2" });
  };

  // ✅ Facebook Login (Auth0)
  const handleFacebookLogin = () => {
    loginWithRedirect({ connection: "facebook" });
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          mt: 8,
          p: 4,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "#895a5aff",
        }}
      >
        <Typography variant="h5" textAlign="center" mb={2}>
          Sign In
        </Typography>

        <Box component="form" onSubmit={handleSignIn}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            margin="normal"
            required
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                color="primary"
              />
            }
            label="Remember me"
            sx={{ mt: 1 }}
          />

          <Box textAlign="center" mt={1} mb={1}>
            <Link
              component={RouterLink}
              to="/forgot-password"
              underline="hover"
              fontSize="0.9rem"
            >
              Forgot password?
            </Link>
          </Box>

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 1 }}>
            Login
          </Button>
        </Box>

        <Divider sx={{ my: 3 }}>OR</Divider>

        <Stack spacing={2}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={
              <img
                src="/Googles.png"
                alt="Google"
                style={{ width: 30, height: 20 }}
              />
            }
            onClick={handleGoogleLogin}
          >
            Sign in with Google
          </Button>

          <Button
            fullWidth
            variant="outlined"
            startIcon={<FacebookIcon sx={{ color: "#1877F2" }} />}
            onClick={handleFacebookLogin}
          >
            Sign in with Facebook
          </Button>
        </Stack>

        <Typography textAlign="center" mt={3} fontSize="0.95rem">
          Don't have an account?{" "}
          <Link component={RouterLink} to="/signup" underline="hover">
            Sign Up
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}
