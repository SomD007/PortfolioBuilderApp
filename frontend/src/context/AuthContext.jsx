import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [loading, setLoading] = useState(true); // <--- Add this

    useEffect(() => {
        const verifyUser = async () => {
            if (token) {
                try {
                    // This calls the backend to turn the token back into a User Object
                    const res = await axios.get("http://localhost:5000/api/auth/me", {
                        headers: { "x-auth-token": token }
                    });
                    setUser(res.data); 
                } catch (err) {
                    localStorage.removeItem("token");
                    setToken(null);
                }
            }
            setLoading(false); // <--- Stop the "Loading..." screen
        };
        verifyUser();
    }, [token]);

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, token, setToken, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};














// import { createContext, useState, useEffect} from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [token, setToken] = useState(localStorage.getItem("token"));

//     // Logic to log out
//     const logout = () => {
//         localStorage.removeItem("token");
//         setToken(null);
//         setUser(null);
//     };

//     return(
//         <AuthContext.Provider value={{ user, setUser, token, setToken, logout }}>
//       {children}
//         </AuthContext.Provider>
//     );
//  };
