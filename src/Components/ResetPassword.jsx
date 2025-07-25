import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const { resetPassword } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const emailParam = searchParams.get("email");
    const tokenParam = searchParams.get("token");

    if (emailParam && tokenParam) {
      setEmail(emailParam);
      setToken(tokenParam);
    } else {
      setError("Invalid reset password link.");
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!newPassword) {
      setError("Please enter a new password.");
      return;
    }

    const result = await resetPassword(token, newPassword, email);
    if (result.success) {
      setMessage("Password reset successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 3000);
    } else {
      setError(result.error || "Failed to reset password.");
    }
  };

  return (
    <Box maxWidth={400} mx="auto" mt={5}>
      <Typography variant="h5" mb={2}>Reset Password</Typography>
      {error && <Typography color="error" mb={1}>{error}</Typography>}
      {message && <Typography color="primary" mb={1}>{message}</Typography>}
      {!message && (
        <form onSubmit={handleSubmit} noValidate>
          <TextField
            label="Email"
            name="email"
            type="email"
            value={email}
            disabled
            fullWidth
            margin="normal"
            autoComplete="email"
            inputProps={{ autoComplete: "email" }}
          />
          <TextField
            label="New Password"
            name="newPassword"
            type="password"
            required
            value={newPassword}
            fullWidth
            margin="normal"
            autoComplete="new-password"
            inputProps={{ autoComplete: "new-password" }}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Reset Password
          </Button>
        </form>
      )}
    </Box>
  );
}
