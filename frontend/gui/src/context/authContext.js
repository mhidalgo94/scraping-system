import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {fetchwithOutToken, fetchRefreshToken} from "../utils/fetch";
import jwt_decode from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() => localStorage.getItem("authTokens") ? JSON.parse(localStorage.getItem("authTokens")) : null);
  const [user, setUser] = useState(() => localStorage.getItem("authTokens") ? jwt_decode(localStorage.getItem("authTokens")) : null);

  const navigate = useNavigate();

  const loginUser = async (user_name, password) => {
    const url = "api/login/";
    const formData = { user_name, password };
    const r = await fetchwithOutToken(url, formData, "POST");
    if ((await r.status) === 200) {
      const data = await r.json();
      setAuthTokens(data);
      setUser(jwt_decode(data?.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
    }
    return await r;
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/login");
  };

  const updateToken = async () => {
    const url = "api/refresh/token/";
    // const refresh = { token: authTokens?.refresh };
    let r = await fetchRefreshToken(url, "POST");
    let data = await r.json();
    if (await r.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data?.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
    } else if(r.statusText === "Unauthorized") {
      logoutUser();
    }
  };

  useEffect(()=>{
    let tiempo = 1000 * 60 *4;
    const interval = setInterval(()=>{
      if(authTokens){
        updateToken()

      }

    },tiempo)
    return ()=> clearInterval(interval);
    // eslint-disable-next-line
  },[authTokens,user])

  const contextData = {
    loginUser,
    logoutUser,
    user,
    authTokens,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
