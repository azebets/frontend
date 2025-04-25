import { createContext } from "react";


export const HiloContext = createContext(); 

export const HiloProvider = ({ children }) => {

  
    return (
      <HiloContext.Provider value={{ }}>
        {children}
      </HiloContext.Provider>
    );
  };