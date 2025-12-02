import { FC, useState } from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Signup: FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = () => {
    setError("");

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    // Check if user already exists
    const existingUser = localStorage.getItem("user");
    if (existingUser) {
      const user = JSON.parse(existingUser);
      if (user.email === email) {
        setError("An account with this email already exists");
        return;
      }
    }

    // Save user to localStorage
    const user = {
      name,
      email,
      password,
    };
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("isAuthenticated", "true");

    navigate("/");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F9FAFB",
        padding: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          maxWidth: 450,
          width: "100%",
          padding: 5,
          borderRadius: 2,
          border: "1px solid #E5E7EB",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
        }}
      >
        {/* Logo */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <img
            src="/Mechri-Logo.png"
            alt="Mechri Logo"
            style={{ height: 50, width: "auto", objectFit: "contain" }}
          />
        </Box>

        {/* Title */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: "#011527",
            textAlign: "center",
            mb: 1,
          }}
        >
          Create Account
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "#86764e",
            textAlign: "center",
            mb: 4,
          }}
        >
          Sign up to get started
        </Typography>

        {/* Error Message */}
        {error && (
          <Typography
            variant="body2"
            sx={{
              color: "#d32f2f",
              textAlign: "center",
              mb: 2,
              backgroundColor: "#ffebee",
              padding: 1,
              borderRadius: 1,
            }}
          >
            {error}
          </Typography>
        )}

        {/* Name Field */}
        <TextField
          fullWidth
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{
            mb: 2.5,
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor: "#D9C48C",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#D9C48C",
              },
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#D9C48C",
            },
          }}
        />

        {/* Email Field */}
        <TextField
          fullWidth
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            mb: 2.5,
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor: "#D9C48C",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#D9C48C",
              },
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#D9C48C",
            },
          }}
        />

        {/* Password Field */}
        <TextField
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            mb: 2.5,
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor: "#D9C48C",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#D9C48C",
              },
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#D9C48C",
            },
          }}
        />

        {/* Confirm Password Field */}
        <TextField
          fullWidth
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor: "#D9C48C",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#D9C48C",
              },
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#D9C48C",
            },
          }}
        />

        {/* Sign Up Button */}
        <Button
          fullWidth
          variant="contained"
          onClick={handleSignup}
          sx={{
            backgroundColor: "#D9C48C",
            color: "#011527",
            fontWeight: 600,
            padding: 1.2,
            fontSize: "1rem",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#c4b07a",
            },
            mb: 2,
          }}
        >
          Sign Up
        </Button>

        {/* Login Link */}
        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            color: "#86764e",
          }}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "#D9C48C",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Login
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Signup;
