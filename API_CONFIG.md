# API Configuration Guide

## Environment Setup

This project uses a centralized axios instance for all API calls. The backend URL is configured via environment variables.

### Setup Steps

1. Copy `.env.example` to `.env`:

   ```bash
   cp .env.example .env
   ```

2. Update the `REACT_APP_API_BASE_URL` in `.env` with your backend URL:

   ```env
   REACT_APP_API_BASE_URL=https://mechrisoft.com/mechriapi
   ```

3. Restart the development server after changing environment variables.

## Usage

### Using the API Client

Import the axios instance in your service files:

```typescript
import apiClient from "../config/api";

// GET request
const response = await apiClient.get("/endpoint");

// POST request
const response = await apiClient.post("/endpoint", data);

// PUT request
const response = await apiClient.put("/endpoint/:id", data);

// DELETE request
const response = await apiClient.delete("/endpoint/:id");
```

### API Client Features

- **Centralized Configuration**: Base URL and headers are configured once
- **Request/Response Interceptors**: For adding auth tokens and handling errors globally
- **Timeout Handling**: 30-second timeout for all requests
- **Error Handling**: Automatic error logging and structured error responses

### Testing Backend Connectivity

Navigate to `/tools/backend-test` in the application to test the connection to your backend server.

## Environment Variables

| Variable                 | Description          | Example                            |
| ------------------------ | -------------------- | ---------------------------------- |
| `REACT_APP_API_BASE_URL` | Backend API base URL | `https://mechrisoft.com/mechriapi` |

## Notes

- Environment variables must start with `REACT_APP_` to be accessible in React
- The `.env` file is gitignored for security
- Use `.env.example` as a template for required environment variables
