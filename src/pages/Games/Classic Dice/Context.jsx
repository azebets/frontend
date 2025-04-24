import React,{ createContext, useEffect, useState } from "react";
import { DiceScript } from "./properties/handler";
import { AppContext } from "../../../context/AppContext";
import { toast } from "sonner";
import { getCookie } from "../../../api/cookies";

export const DiceGameContext = createContext(); 
export const DiceGametProvider = ({ children }) => {
  const {activeWallet, user, Modalroutes, updateWallet} = React.useContext(AppContext)
  const [walletRange, setWalletRange] = React.useState(50)
  const [betPosition, setBetposition] = useState(50)
  const [DiceHistory, setDiceHistory] = useState([])
  const [rollunder, setRollunder] = useState(true)
  const [betamount, setBetamount] = React.useState("")
  const [DiceEncription, setDiceEncription] = useState(null)
  const [HandleDicePoint, setHandleDicePoint] = useState(50)
  const [hasWon, setHasWon] = useState(false)
  const [payout, setPayout] = useState(0)
  const [range, setRange ] = useState(50)
  const _diceScript = new DiceScript()
  const [HandleHas_won, setHandleHas_won] = useState(false)
  
  useEffect(()=>{
    async function initialGame(params) {
      const {encrypt, history} = await _diceScript.handleDiceGameEncrypt()
      setDiceHistory(history)
      setDiceEncription(encrypt)
    }
      // const resion = await handleDiceGameEncrypt()
      // await DiceHistory($handleAuthToken)
      // const id = browser && JSON.parse(localStorage.getItem('classic_dice_sound'))
      // const tubor = browser && JSON.parse(localStorage.getItem('classic_dice_tubo'))
      // soundHandler.set(id)
      // turboManager.set(tubor)
      // soundManager.set(handleSoundManager())
      // loading = resion
      initialGame()
  },[])



  function multiplyBetamount(){
      if(!betamount) return
      setBetamount(betamount * 2)
  }

  const divideBetAmount = (()=>{
    if(!betamount) return
    if (betamount / 2 <= 0) return 
    setBetamount(betamount / 2)
  })

  // create a scroll betamount setting
  const handleWalletRange = ((e)=>{
    const amount = (parseFloat(activeWallet?.balance) * (walletRange / 100)).toFixed(7);
    setBetamount(amount)
  })

  const scrollBetamountSetting = ((e)=>{
    const amount = (parseFloat(activeWallet?.balance) * (e / 100)).toFixed(7);
    setBetamount(amount)
  })

  const setScrollMinandMaxBetamount = ((action)=>{
      if(action === "min"){
        setBetamount(0)
      }
      else{
        setBetamount((parseFloat(activeWallet?.balance) * (e / 100)).toFixed(7))
      }
  })
  let houseEgde = 1
  let game__charges = 100 / houseEgde
  let game_logic;
  let total_charge;
  let wining_amount;
  useEffect(()=>{
    if(rollunder){
        game_logic =  100 / (betPosition)
        total_charge = game_logic / game__charges
        setPayout((game_logic - total_charge).toFixed(4))
    }else{
        game_logic =  100 / (100 - betPosition)
        total_charge = game_logic / game__charges
        setPayout((game_logic - total_charge).toFixed(4))
    }
    setBetposition(range)
  },[range])

  const handleRollSubmit = async () => {
    // let sound = $soundManager.audioMap.bet;
    // let winSound = $soundManager.audioMap.win;
    // $soundManager.Play(sound, $soundHandler);
    // Handles_Loading.set(true);
    if (user) {
      if (parseFloat(betamount) > activeWallet?.balance) {
        toast.error("Insufficient balance")
      }
    else {
        let data = {
          user,
          prev_bal: parseFloat(activeWallet?.balance),
          bet_amount:betamount,
          token_img: activeWallet?.coin_image,
          token: activeWallet?.coin_name,
          chance: rollunder
            ? parseFloat(betPosition).toFixed(2)
            : 100 - parseFloat(betPosition).toFixed(2),
          payout: parseFloat(payout),
          time: new Date(),
          is_roll_under: rollunder,
          wining_amount: parseFloat(betamount * payout) - parseFloat(betamount),
        };
        // isbetLoadingBtn.set(true); 

      const respnse = await _diceScript?.DiceBet(data)
      updateWallet({
        coin_name: respnse.token,
        coin_image: respnse.token_img,
        balance:  respnse.current_amount
     })
     setHandleDicePoint(respnse?.cashout)
     setHandleHas_won(respnse.has_won)
      // const { handleDicebet } = await handleSocketConnection()
      // await handleDicebet(respnse)
      // if(respnse.has_won){
      //   $soundManager.Play(winSound, $soundHandler);
      // }
      if(DiceHistory.length <= 14){
        setDiceHistory([...DiceHistory, respnse])
      }else{
        DiceHistory.shift()
        setDiceHistory([...DiceHistory, respnse])
      }
    }
  }
    else {
      Modalroutes("auth","login")
      // Handles_Loading.set(false);
    }
  };

  return (
    <DiceGameContext.Provider value={{
       _diceScript,betamount,DiceHistory,handleWalletRange, setBetamount,handleRollSubmit, setBetposition, betPosition,payout, setPayout,HandleDicePoint,
       multiplyBetamount, divideBetAmount,HandleHas_won, scrollBetamountSetting,setWalletRange,walletRange, setRange, range, setScrollMinandMaxBetamount
       }}>
      {children}
    </DiceGameContext.Provider>
  );
};