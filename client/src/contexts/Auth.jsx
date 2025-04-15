import React, { createContext, useState, useContext, useEffect } from "react";
import { FetchMe, FetchLogout } from "../api";
import { useNavigate } from "react-router-dom"; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => { //sayfa yüklendiğinde ve yenilendiğinde login olmuş kullanıcı bilgilerini tekrar set ediyoruz
    (async () => {
      try {
        const me = await FetchMe();
        setLoggedIn(true);
        setUser(me)
        //console.log("Fetchme'den gelen veri:", me);
      } catch (e) {
        // console.error("FetchMe Hatası:", e.response?.data || e.message);
      }
    })();
  }, []);


  const login = ({ data }) => {
    setUser(data.user);
    setLoggedIn(true);
    localStorage.setItem("access_token", data.accessToken);
    localStorage.setItem("refresh_token", data.refreshToken);
  };

  const logout = async() => {  
    setUser(null);
    setLoggedIn(false);
    await FetchLogout();
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/")
  }

  const values = { user, loggedIn, login, logout };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
