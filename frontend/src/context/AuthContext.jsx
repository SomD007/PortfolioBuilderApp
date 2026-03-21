import { createContext, useState, useEffect} from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));

    // Logic to log out
    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    };

    return(
        <AuthContext.Provider value={{ user, setUser, token, setToken, logout }}>
      {children}
        </AuthContext.Provider>
    );
 };
