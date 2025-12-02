// LocalStorage utility functions for user authentication

export const saveUserToLocalStorage = (user: { name: string; email: string; password: string }) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUserFromLocalStorage = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const setAuthStatus = (status: boolean) => {
  localStorage.setItem("isAuthenticated", status.toString());
};

export const getAuthStatus = (): boolean => {
  const status = localStorage.getItem("isAuthenticated");
  return status === "true";
};

export const clearAuthData = () => {
//   localStorage.removeItem("user");
  localStorage.removeItem("isAuthenticated");
};
