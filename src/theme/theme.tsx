import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#D9C48C",
      light: "rgba(217, 196, 140, 0.08)",
      dark: "#B8A361",
    },
    secondary: {
      main: "#86764e",
      light: "#A08B5F",
    },
    background: {
      default: "#FAFAFA",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#011527",
      secondary: "#86764e",
    },
    divider: "#E5E7EB",
  },
  typography: {
    fontFamily: "'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif",
    h1: { fontWeight: 600, color: "#011527" },
    h2: { fontWeight: 600, color: "#011527" },
    h6: { fontWeight: 500, color: "#011527" },
    body1: { color: "#011527", fontSize: "0.95rem" },
    body2: { color: "#86764e", fontSize: "0.9rem" },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 4px 12px rgba(217, 196, 140, 0.2)",
          },
        },
        contained: {
          backgroundColor: "#D9C48C",
          color: "#011527",
          "&:hover": {
            backgroundColor: "#C4B170",
          },
        },
        outlined: {
          borderColor: "#D9C48C",
          color: "#D9C48C",
          "&:hover": {
            backgroundColor: "rgba(217, 196, 140, 0.08)",
            borderColor: "#B8A361",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
            backgroundColor: "#FFFFFF",
            transition: "all 0.3s ease",
            "&:hover fieldset": {
              borderColor: "#D9C48C",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#D9C48C",
              borderWidth: 2,
            },
          },
          "& .MuiInputBase-input": {
            fontSize: "0.95rem",
            color: "#011527",
            padding: "10px 12px",
          },
          "& .MuiInputBase-input::placeholder": {
            color: "#A08B5F",
            opacity: 0.7,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          color: "#011527",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
          borderBottom: "1px solid #E5E7EB",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        root: {
          "& .MuiDrawer-paper": {
            backgroundColor: "#FAFAFA",
            borderRight: "1px solid #E5E7EB",
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            backgroundColor: "rgba(217, 196, 140, 0.12)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
          border: "1px solid #E5E7EB",
          backgroundColor: "#FFFFFF",
          borderRadius: "12px",
        },
      },
    },
  },
});
