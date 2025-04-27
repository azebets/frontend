import Navbar from "./components/Navbar.jsx";
import Menubar from "./components/Menubar.jsx";
import "./styles/games.css";
import "./styles/ccpayment.css";
import "./styles/input-contrast.css";
import { Routes, Route } from 'react-router';
import React, { Suspense, lazy } from 'react';
import { Toaster } from "sonner";
import Loader from "./constants/Loader.jsx";
import Footer from "./components/Footer.jsx";
import Original from "./pages/Original.jsx";
import Home from "./pages/Home.jsx";
import Account from "./pages/Account.jsx";
import Profile from "./page.components/account/Profile.jsx";
import Balance from "./page.components/account/Balance.jsx";
import Referrals from "./page.components/account/Referrals.jsx";
import Codes from "./page.components/account/referral/Codes.jsx";
import Users from "./page.components/account/referral/Users.jsx";
import Deposit from "./page.components/account/Deposit.jsx";
import Withdrawal from "./page.components/account/Withdrawal.jsx";
import Settings from "./pages/Settings.jsx";
import ClassicDice from "./pages/Games/Classic Dice/ClassicDice.jsx";

function App() {
  const [sideHasExpand, setSideHasExpand] = React.useState(8)
  return (
    <>
      <Suspense fallback={<Loader color={"white"}/>}></Suspense>
      <Toaster position="bottom-right" expand={false} richColors  />
      <Navbar />
      <Menubar />
      <div style={{minHeight: "64px"}}></div>
      <div className={sideHasExpand === 340 ? "css-yl3y1i" : sideHasExpand === 8 ? "css-qk763z" : "css-1polf3r"}>
        <div className="css-1gcbewu">
          <Routes>
            <Route path="/" element={<Home />} >
                <Route path="originals" element={<Original />} />
                <Route path="slots" element={<Original />} />
                <Route path="game-shows" element={<Original />} />
                <Route path="live-casino" element={<Original />} />
                <Route path="roulette" element={<Original />} />
                <Route path="blackjack" element={<Original />} />
            </Route>
            <Route path="account" element={<Account />} >
                <Route path="profile" element={<Profile />} />
                <Route path="balances" element={<Balance />} />
                <Route path="referrals" element={<Referrals />} >
                   <Route path="codes" element={<Codes />} />
                    <Route path="users" element={<Users />} />
                </Route>
                <Route path="deposits" element={<Deposit />} />
                <Route path="withdrawals" element={<Withdrawal />} />
                <Route path="settings" element={<Settings />} />
            </Route>
            <Route path="/classic-dice" element={<ClassicDice />} />
          </Routes>
        </div>
        <div style={{height: "64px"}}></div>
        <Footer />
      </div>
    </>
  )
}

export default App
