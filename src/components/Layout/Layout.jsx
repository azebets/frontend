import { useState, useEffect, useContext } from 'react';
import { lazy, Suspense } from 'react';
import Loader from '../../components/common/Loader';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
// Lazy-loaded components (loaded on demand)
const LandingPage = lazy(() => import('../../pages/LandingPage'));
const AffiliatePage = lazy(() => import('../../pages/AffiliatePage'));
const VipClubPage = lazy(() => import('../../pages/VipClubPage'));
import { Toaster } from 'sonner';
import Chats from './Chats';

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false); // State to toggle chat panel
  const [isMediumScreen, setIsMediumScreen] = useState(false); // State for medium screen width
  let notMobile;
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);

  };


  const toggleChat = () => {
    setIsChatOpen(!isChatOpen); // Toggle chat panel visibility\
  };

  // Update `isMediumScreen` based on screen width
  useEffect(() => {
    if(window.innerWidth > 740 && window.innerWidth < 1200){
      setIsMediumScreen(true);
      setSidebarOpen(false)
    }else{
      setIsMediumScreen(false);
    }
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      setIsMediumScreen(screenWidth > 740 && screenWidth < 1200);
    };


    // Initial check and event listener for resizing
    handleResize();
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, [window.innerWidth]);
  return (
    <div className="flex min-h-screen bg-grey-800">
      <Toaster position="bottom-right" richColors />
      <Suspense fallback={<Loader />}>
        {/* Fixed sidebar - will not scroll with page content */}
        {window.innerWidth >= 750 && (
          <div className=" inset-y-0  left-0 z-30">
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
          </div>
        ) }
      

        {/* Main content with responsive left margin */}
        <div
          className={`flex-1 flex relative flex-col transition-all w-full duration-300 ${
            window.innerWidth >= 750 ? sidebarOpen
              ? isMediumScreen
                ? 'pl-[70px]' // Medium screen margin
                : 'pl-[240px]' // Large screen margin
              : 'pl-[70px]' : 'ml-0' // Collapsed sidebar margin
          } ${isChatOpen ? 'pr-[370px]' : ''}`} // Add right margin when chat is open
        >
          {/* Fixed navbar */}
          <div className="sticky top-0 z-20">
            <Navbar toggleChat={toggleChat} /> {/* Pass toggleChat to Navbar */}
          </div>

          {/* Scrollable main content with padding */}
          <main className="flex-1 overflow-y-auto w-full p-0 md:p-0 relative scrollY bg-[#1a2c38]">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/affiliate" element={<AffiliatePage />} />
              <Route path="/vip-club" element={<VipClubPage />} />
            </Routes>
          </main>

          {/* Footer */}
          <Footer />
        </div>

        {/* Chat Panel */}
        {isChatOpen && <Chats closeChat={toggleChat} />}

        {/* Backdrop for mobile and medium screens */}
        {sidebarOpen && window.innerWidth > 750 && (
          <div
            className={`fixed inset-0 bg-[#00000094] bg-opacity-50 z-20 ${
              isMediumScreen || window.innerWidth <= 750 ? '' : 'hidden'
            }`}
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </Suspense>
    </div>
  );
}

export default Layout;









