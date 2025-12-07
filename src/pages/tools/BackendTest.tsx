import { FC, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Alert,
  CircularProgress,
  Paper,
} from "@mui/material";
import apiClient, { API_BASE_URL } from "../../config/api";

const BackendTest: FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const testBackendConnection = async () => {
    setLoading(true);
    setResult(null);

    try {
      // Test with a simple GET request to base URL or health endpoint
      const response = await apiClient.get("/GetSetupAddResponsibility");

      setResult({
        success: true,
        message: `Backend connected successfully! Status: ${response.status} - ${response.statusText}`,
      });
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.statusText ||
        error.message ||
        "Network error";
      const status = error.response?.status || "Unknown";

      setResult({
        success: false,
        message: `Failed to connect to backend: ${status} - ${errorMessage}`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 700,
            color: "#011527",
            mb: 1,
            fontSize: { xs: "1.75rem", sm: "2rem", md: "2.5rem" },
          }}
        >
          Backend Connectivity Test
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "#86764e",
            fontSize: { xs: "0.85rem", sm: "0.95rem", md: "1rem" },
          }}
        >
          Test the connection to the backend server
        </Typography>
      </Box>

      <Paper sx={{ p: 3, maxWidth: 600 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Button
            variant="contained"
            onClick={testBackendConnection}
            disabled={loading}
            sx={{ width: "fit-content" }}
          >
            {loading ? (
              <CircularProgress size={24} />
            ) : (
              "Test Backend Connection"
            )}
          </Button>

          {result && (
            <Alert severity={result.success ? "success" : "error"}>
              {result.message}
            </Alert>
          )}

          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              This test will attempt to connect to: <code>{API_BASE_URL}</code>
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Make sure your backend server is running and accessible.
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default BackendTest;
