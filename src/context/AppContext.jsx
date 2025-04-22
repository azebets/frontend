import { createContext, useState } from "react";
import { useLocation, useNavigate } from "react-router";

export const AppContext = createContext(); 
export const AppContextProvider = ({ children }) => {
    const [ user, setUser ] = useState(null)
      const navigate = useNavigate()
    const Modalroutes = ((tab, modal)=>{
      navigate(`?tab=${tab}&modal=${modal}`)
    })
  return (
    <AppContext.Provider value={{ user, setUser, Modalroutes }}>
      {children}
    </AppContext.Provider>
  );
};