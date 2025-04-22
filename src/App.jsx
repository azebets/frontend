import Navbar from "./components/Navbar.jsx";
import Menubar from "./components/Menubar.jsx";
import { Routes, Route } from 'react-router';
import React, { Suspense, lazy } from 'react';
import { Toaster } from "sonner";
import Loader from "./constants/Loader.jsx";
import Footer from "./components/Footer.jsx";
import Original from "./pages/Original.jsx";
import Home from "./pages/Home.jsx";


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
          </Routes>
        </div>  
        <div style={{height: "64px"}}></div>
        <Footer />   
      </div>

    </>
  )
}

export default App
