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

const handleLogin = async () => {
  setError("");

  if (!email || !password) {
    setError("Please fill in all fields");
    return;
  }

  try {
    const response = await fetch("https://mechrisoft.com/mechriapi/userlogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mobile: email,     // backend expects "mobile"
        password: password,
      }),
    });

    const data = await response.json();
    console.log("Login response:", data);

    if (!data.isSuccess) {
      setError(data.message || "Invalid credentials");
      return;
    }

    // Store token & user
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.data));
    localStorage.setItem("isAuthenticated", "true");

    // Update Redux
    dispatch(
      loginUser({
        name: data.data.name,
        email: data.data.email,
      })
    );

    navigate("/");
  } catch (err) {
    console.error(err);
    setError("Something went wrong. Please try again.");
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
          label="Mobile Number"
          type="text"
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
