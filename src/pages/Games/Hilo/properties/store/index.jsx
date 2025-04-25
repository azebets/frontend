import React, { createContext, useState, useContext, useEffect } from "react";
import { AppContext } from "../../../../../context/AppContext";
import { io } from "socket.io-client";
import { backendUrl } from "../../../../../api/axios";
const URL = backendUrl();
const socket = io(`${URL}`);
export const HiloContext = createContext();

export const HiloProvider = ({ children }) => {
  const { wallet, user } = React.useContext(AppContext)
  const [soundSettings, setSoundSettings] = useState({ music: false, soundFx: false });
  const [soundManager, setSoundManager] = useState(null);
  const [userBets, setUserBets] = useState([]);
  const [recentBets, setRecentBets] = useState([]);
  const [hotkeysEnabled, setHotkeysEnabled] = useState(false);
  const [liveStats, setLiveStats] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [processingRequest, setProcessingRequest] = useState(false);
  const [hiloGame, setHiloGame] = useState(null);
  const [initializing, setInitializing] = useState(false);
  const [cyclixPointsWallet, setCyclixPointsWallet] = useState(null); 
  const [USDWallet, setUSDWallet] = useState(null); 
  const [FunCoupons, setFunCoupons] = useState(null); 
  const [activeWallet, setActiveWallet] = useState(null);



  useEffect(() =>  {
    if(!user?.user_id || !wallet) return;
    setCyclixPointsWallet(wallet.find(w => w.coin_name === "Cyclix Points"));
    setUSDWallet(wallet.find(w => w.coin_name === "USD"));
    setFunCoupons(wallet.find(w => w.coin_name === "Fun Coupons"));
    setActiveWallet(wallet.find(w => w.is_active === true));
  }, [wallet, user])

   const socketEvents = ((user_id) => {
      const handleHiloBet = ((data) => {
        setProcessingRequest(true);
          socket.emit("hilo-bet", data, (err) => {
              if (err) {
                // no ack from the server, let's retry
                handleHiloBet(data);
              }
          });
      })
  
      const handleHiloCashout = ((data) => {
          setProcessingRequest(true);
          socket.emit("hilo-cashout", data, (err) => {
              if (err) {
                // no ack from the server, let's retry
                handleHiloCashout(data);
              }
          });
      })
  
      const handleHiloInit = ((data) => {
        setInitializing(true);
          setProcessingRequest(true);
          socket.emit("hilo-init", data, (err) => {
              if (err) {
                // no ack from the server, let's retry
                handleHiloInit(data);
              }
          });
      })
  
      const handleHiloNextRound = ((data) => {
          setProcessingRequest(true);
          socket.emit("hilo-next-round", data, (err) => {
              if (err) {
                // no ack from the server, let's retry
                handleHiloNextRound(data);
              }
          });
      })
  
      socket.on("hilo-game", data => {
          if (user_id === data.user_id) {
            setHiloGame(v => ({
                  error: undefined,
                  ...v,
                  ...data
              }));
              setProcessingRequest(false);
          }
      })
  
      socket.on("hilo-game-ended", data => {
          if (user_id === data.user_id) {
              setUserBets(v => ([data, ...v]))
          }
          setRecentBets(v => ([data, ...v]))
      });
      socket.on("hilo-history", data => {
          if (user_id === data.user_id) {
              setUserBets(v => ([...data.userBets, ...v]))
              setRecentBets(v => ([...data.allRecentBets, ...v]))
              setInitializing(false);
          }
      });
  
      socket.on("hilo-wallet", data => {
          if (user_id === data.user_id) {
              if (data.token === "USD") {
                  setUSDWallet(v => ({
                      ...v,
                      balance: data.balance
                  }))
              } else if (data.token === "Cyclix Points") {
                  setCyclixPointsWallet(v => ({
                      ...v,
                      balance: data.balance
                  }))
              } else if (data.token === "Fun Coupons") {
                  setFunCoupons(v => ({
                      ...v,
                      balance: data.balance
                  }))
              } 
  
              setActiveWallet(v => ({
                  ...v,
                  balance: data.token === v.coin_name ? data.balance : v.balance
              }));
          }
      })
      return { handleHiloBet, handleHiloCashout, handleHiloNextRound, handleHiloInit }
  })

  // Exporting state management for socket/index
  const stateManagement = {
    processingRequest,
    setProcessingRequest,
    hiloGame,
    setHiloGame,
    userBets,
    setUserBets,
    recentBets,
    setRecentBets,
    initializing,
    setInitializing
  };
  return (
    <HiloContext.Provider value={{
      socketEvents,
      stateManagement, // Exporting state management for socket/index,
      hiloGame, setHiloGame,
      soundSettings, setSoundSettings,
      soundManager, setSoundManager,
      processingRequest, setProcessingRequest,
      initializing, setInitializing,
      userBets, setUserBets,
      recentBets, setRecentBets,
      hotkeysEnabled, setHotkeysEnabled,
      liveStats, setLiveStats,
      errorMsg, setErrorMsg,
    }}>
      {children}
    </HiloContext.Provider>
  );
};

export const useHilo = () => useContext(HiloContext);
