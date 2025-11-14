import React, { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
} from "@mui/material";

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "admin@example.com" && password === "admin") {
      onLoginSuccess();
    } else {
      setError("Oops! Try again — your email or password is incorrect.");
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: 4,
          background: "linear-gradient(180deg, #ffffff 0%, #ffffffff 100%)",
        }}
      >
        <Box textAlign="center" mb={2}>
           <img src="/haslogo.png" alt="Logo" style={{ width: 100, height: 100 }} />
          <Typography variant="h5" fontWeight="bold" mt={1}>
            Welome
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Login to continue to your dashboard
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
          />

          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}

          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{
              mt: 3,
              py: 1,
              background: "linear-gradient(90deg, #256fbeff, #52a9ecff)",
              "&:hover": { background: "linear-gradient(90deg, #699dc7ff, #6aa5d2ff)" },
            }}
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
