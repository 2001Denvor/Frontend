// ./Pages/ForgotPassword.jsx
import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { TextField, Button, Typography, Box } from "@mui/material";

export default function ForgotPassword() {
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const result = await forgotPassword(email);
    if (result.success) {
      setMessage("Check your email for the reset password link.");
    } else {
      setError(result.error || "Something went wrong.");
    }
  };

  return (
    <Box maxWidth={400} mx="auto" mt={5}>
      <Typography variant="h5" mb={2}>Forgot Password</Typography>
      <form onSubmit={handleSubmit} noValidate>
        <TextField
          label="Email"
          name="email"
          type="email"
          required
          fullWidth
          margin="normal"
          value={email}
          autoComplete="email"
          inputProps={{ autoComplete: "email" }}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error && <Typography color="error" mt={1}>{error}</Typography>}
        {message && <Typography color="primary" mt={1}>{message}</Typography>}
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Send Reset Link
        </Button>
      </form>
    </Box>
  );
}
