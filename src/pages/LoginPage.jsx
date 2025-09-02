import React, { useState } from "react";
import { Container, Box, TextField, Button, Typography, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Only validate email and password
    if (!formData.email || !formData.password) {
      setError("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);
      const { token, role } = res.data;

      // Save token for authentication
      localStorage.setItem("token", token);

      // Redirect based on role returned by backend
      if (role === "artist") {
        navigate("/artist-dashboard");
      } else if (role === "collector") {
        navigate("/collector-dashboard");
      } else {
        setError("Unknown user role");
      }
    } catch (err) {
      // Show backend error message if login fails
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Login failed. Try again.");
      }
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Typography variant="h4" gutterBottom>Login</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary">Login</Button>
      </Box>
    </Container>
  );
};

export default LoginPage;
