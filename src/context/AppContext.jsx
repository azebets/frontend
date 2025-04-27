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
    const [activeWallet, setActiveWallet] = useState()
    const _auth = new AuthScript()
    const _userAuth = new UserScript()

    useEffect(()=>{
      setActiveWallet(wallet?.find(item => item.is_active === true))
    },[wallet])

    const updateWallet = ((wa)=>{
        const updatedWallet = wallet.map(item =>
          item.coin_image === wa.coin_image ? { ...item, balance: wa.balance } : item
        );
        setWallet(updatedWallet);
    })

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
      let queryParams = `?tab=${tab}&modal=${modal}`

      // Add additional props as query parameters if provided
      if (props) {
        Object.entries(props).forEach(([key, value]) => {
          queryParams += `&${key}=${value}`
        })
      }

      navigate(queryParams)
    })
    async function logout(){;
      setUser(null)
      toast.success("Logged out successfully");
    }
  return (
    <AppContext.Provider value={{ user, setUser, Modalroutes, _auth, setWallet, wallet, logout , activeWallet, updateWallet}}>
      {children}
    </AppContext.Provider>
  );
};