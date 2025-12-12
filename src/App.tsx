import { useEffect } from "react";
import "./App.css";
import AppRouter from "./router/AppRouter";
import { useAppDispatch } from "./store/hooks";
import { loginUser } from "./store/slices/userSlice";
import { getUserFromLocalStorage, getAuthStatus } from "./utils/localStorage";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Check if user is authenticated and restore user data
    const isAuthenticated = getAuthStatus();
    if (isAuthenticated) {
      const user = getUserFromLocalStorage();
      if (user) {
        dispatch(loginUser({ name: user.name, email: user.email }));
      }
    }
  }, [dispatch]);

  return <AppRouter />;
}

export default App;
