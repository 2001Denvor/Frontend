import React, { useState, useEffect } from "react";
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
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const { loginWithRedirect, isAuthenticated, user: auth0User, getAccessTokenSilently } = useAuth0();
  const [role, setRole] = useState("user");

  const handleSignUp = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const fullName = e.target.fullName.value;

    try {
      const res = await axios.post("https://localhost:7163/api/Auth/register", {
        fullName,
        email,
        password,
        role,
      });

      if (res.status === 200) {
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

  const handleSocialSignUp = async (connection) => {
    await loginWithRedirect({
      connection, // "google-oauth2" or "facebook"
      appState: {
        targetUrl: "/", // post-login landing path
      },
    });
  };

  useEffect(() => {
    const checkAndRegister = async () => {
      if (isAuthenticated && auth0User) {
        try {
          const token = await getAccessTokenSilently();
          const res = await axios.post("https://localhost:7163/api/Auth/social-login", {
            email: auth0User.email,
            fullName: auth0User.name || auth0User.nickname,
            provider: auth0User.sub.split("|")[0], // google-oauth2 or facebook
          });

          const userData = res.data.user;
          const jwt = res.data.token;

          localStorage.setItem("token", jwt);
          localStorage.setItem("user", JSON.stringify(userData));
          axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
          setUser(userData);

          navigate(userData.role === "admin" ? "/admin/dashboard" : "/user/dashboard");
        } catch (error) {
          console.error("Social login error:", error);
          alert("Failed to complete social login.");
        }
      }
    };

    checkAndRegister();
  }, [isAuthenticated, auth0User]);

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, p: 4, boxShadow: 3, borderRadius: 3, backgroundColor: "#574f4fff" }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom align="center">
          Sign up
        </Typography>

        <Box component="form" onSubmit={handleSignUp} noValidate>
          <TextField fullWidth label="Full name" name="fullName" margin="normal" required />
          <TextField fullWidth label="Email" name="email" type="email" margin="normal" required />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            margin="normal"
            required
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

          <FormControlLabel
            control={<Checkbox name="updates" autoComplete="off" />}
            label="I want to receive updates via email."
          />

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, mb: 2 }}>
            Sign up
          </Button>
        </Box>

        <Divider>or</Divider>

        <Stack spacing={2} mt={2}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={
              <img
                src="/Googles.png"
                alt="Google"
                style={{ width: 30, height: 20, }}
              />
            }
            onClick={() => handleSocialSignUp("google-oauth2")}
          >
            Sign up with Google
          </Button>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<FacebookIcon />}
            onClick={() => handleSocialSignUp("facebook")}
          >
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
