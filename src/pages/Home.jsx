import React, {lazy} from 'react'
import "../styles/home.css"
const LiveLayout = lazy(() => import("../page.components/home/LiveLayout"));
const NavTabs = lazy(() => import("../page.components/home/NavTabs"));
const GamesList = lazy(() => import("../page.components/home/GameList"));
const Slots = lazy(() => import("../page.components/home/Slots"));
const Livecasino = lazy(() => import("../page.components/home/Livecasino"));
const Showgame = lazy(() => import("../page.components/home/Showgame"));
const Bets = lazy(() => import("../page.components/home/Bets"));
// import LiveLayout from '../page.components/home/LiveLayout'
// import NavTabs from '../page.components/home/NavTabs'
// import GamesList from '../page.components/home/GameList'
// import Slots from "../page.components/home/Slots"
// import Livecasino from "../page.components/home/Livecasino"
// import Showgame from "../page.components/home/Showgame"
// import Bets from '../page.components/home/Bets'
import { Outlet, useLocation } from 'react-router'

export default function Home() {
  const location = useLocation()
  const path = location.pathname.split("/")[1]

  return (
    <div className="css-7oel5t">
        <LiveLayout />
        <div style={{height: "24px"}}></div>
        {!path && 
        <>
         <NavTabs />
          <GamesList />
          <Slots />
          <Livecasino />
          <Showgame />
          <Bets />
        </>
 }       
        <Outlet />
    </div>
  )
}
