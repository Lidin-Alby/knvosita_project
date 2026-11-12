import { createContext, useContext, useEffect, useState } from "react";
import api from "./api";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(()=>localStorage.getItem("access") ? true : null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem("access")) {
      setLoading(false);
      return;
    }
    // api
    //   .get("/assets/")
    //   .then((res) => setUser(res.data))
    //   .catch(() => setUser(null))
    //   .finally(() => setLoading(false));
  },[]);

  const login=async(username,password)=>{
    const {data}=await api.post("auth/login/",{username,password})
    localStorage.setItem("access",data.access)
    localStorage.setItem("refresh", data.refresh)
    setUser(true)
    // const res=await api.get("/assets/")
  }
  const logout=()=>{
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    setUser(null)

  }
  return <AuthContext.Provider value={{ user, loading, login ,logout}}>
    {children}
  </AuthContext.Provider>
}
