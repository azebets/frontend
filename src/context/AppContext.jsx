import { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { AuthScript } from "../api/auth/Index";
import { UserScript } from "../api";
import { toast } from "sonner";
import { getCookie } from "../api/cookies";


export const AppContext = createContext(); 
export const AppContextProvider = ({ children }) => {
    const [ user, setUser ] = useState(null)
    const navigate = useNavigate()
    const [ wallet, setWallet ] = useState(null)
    const _auth = new AuthScript()
    const _userAuth = new UserScript()

    useEffect(() => {
      const checkUser = async () => {
        const loggedInUser = await _userAuth.fetchUser() || null;
        if (loggedInUser) {
          setWallet(loggedInUser.wallet)
          setUser(loggedInUser.user)
        } 
      };
      getCookie("token") && checkUser();
    }, [getCookie("token")]);

    const Modalroutes = ((tab, modal, props)=>{
      navigate(`?tab=${tab}&modal=${modal}${props ? `&${Object.keys(props)+"="+ Object.values(props)}` : ""}`)
    })
    async function logout(){
      setCookie("token", "", -1);
      setUser(null)
      toast.success("Logged out successfully");
    }
  return (
    <AppContext.Provider value={{ user, setUser, Modalroutes, _auth, setWallet, wallet, logout }}>
      {children}
    </AppContext.Provider>
  );
};