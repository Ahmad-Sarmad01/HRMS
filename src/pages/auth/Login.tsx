import { FC, useState } from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { loginUser } from "../../store/slices/userSlice";

const Login: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    // Retrieve user from localStorage
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      setError("No account found. Please sign up first.");
      return;
    }

    const user = JSON.parse(storedUser);

    if (user.email === email && user.password === password) {
      // Dispatch login action
      dispatch(loginUser({ name: user.name, email: user.email }));

      // Save authenticated state to localStorage
      localStorage.setItem("isAuthenticated", "true");

      navigate("/");
    } else {
      setError("Invalid email or password");
    }
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
          Welcome Back
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "#86764e",
            textAlign: "center",
            mb: 4,
          }}
        >
          Login to your account
        </Typography>

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

        {/* Login Button */}
        <Button
          fullWidth
          variant="contained"
          onClick={handleLogin}
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
          Login
        </Button>

        {/* Sign Up Link */}
        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            color: "#86764e",
          }}
        >
          Don't have an account?{" "}
          <Link
            to="/signup"
            style={{
              color: "#D9C48C",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Sign Up
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
