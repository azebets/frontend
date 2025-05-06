import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import LandingPage from '../../pages/LandingPage';
import AffiliatePage from '../../pages/AffiliatePage';
import VipClubPage from '../../pages/VipClubPage';
import { Toaster } from 'sonner';
import Chats from './Chats';

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false); // State to toggle chat panel

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen); // Toggle chat panel visibility
  };

  return (
    <div className="flex min-h-screen bg-grey-800">
      <Toaster position="bottom-right" richColors />
      {/* Fixed sidebar - will not scroll with page content */}
      <div className="fixed inset-y-0 left-0 z-0">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      </div>
      
      {/* Main content with left margin to account for sidebar width plus 15px spacing */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarOpen ? 'ml-[240px]' : 'ml-[70px]'
        } ${isChatOpen ? 'mr-[370px]' : ''}`} // Add right margin when chat is open
      >
        {/* Fixed navbar */}
        <div className="sticky top-0 z-20">
          <Navbar toggleChat={toggleChat} /> {/* Pass toggleChat to Navbar */}
        </div>
       
        {/* Scrollable main content with padding */}
        <main className="flex-1 overflow-y-auto p-0 md:p-0 scrollY bg-[#1a2c38]">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={
              <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold">Dashboard</h1>
              </div>
            } />
            <Route path="/affiliate" element={<AffiliatePage />} />
            <Route path="/vip-club" element={<VipClubPage />} />
          </Routes>
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
      
      {/* Chat Panel */}
      {isChatOpen && (
          <Chats closeChat={toggleChat}/>
      )}

      {/* Backdrop for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default Layout;









