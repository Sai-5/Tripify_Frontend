import Cookies from "js-cookie";

export const setToken = (token) => {
  Cookies.set("token", token, { expires: 7 }); // Expires in 7 days
};

export const getToken = () => {
  return Cookies.get("token");
};

export const removeToken = () => {
  Cookies.remove("token");
};

export const isAuthenticated = () => {
  const token = getToken();
  return !!token;
};

export const getUserFromToken = () => {
  const token = getToken();
  if (!token) return null;

  try {
    const payload = token.split(".")[1];
    const decodedPayload = atob(payload);
    return JSON.parse(decodedPayload);
  } catch (error) {
    console.error("Error parsing token:", error);
    return null;
  }
};

export const isAdmin = () => {
  const user = getUserFromToken();
  return user && user.role === "admin";
};

export const isUser = () => {
  const user = getUserFromToken();
  return user && user.role === "user";
};
