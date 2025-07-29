import { decodeToken } from "react-jwt";

const useAuth = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = decodeToken(token);
    return {
      uid: decoded?.uid,
      email: decoded?.email,
      role: decoded?.role,
    };
  } catch (error) {
    console.error("Error al decodificar el token:", error);
    return null;
  }
};

export default useAuth;


