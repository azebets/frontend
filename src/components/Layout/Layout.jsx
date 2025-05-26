import React, { useState, useEffect, useContext } from 'react';
import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Preload from '../common/Preloader';
import Chats from './Chat';
import { Toaster } from 'sonner';
import { AuthContext } from '../../context/AuthContext';

// Import routes configuration
import { routes, protectedRoutes, gameRoutes } from './routes';
import Modals from './Modals';

function Layout() {
  const { user } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMediumScreen, setIsMediumScreen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  // Check if current route is a game route
  const isGameRoute = () => {
    return gameRoutes.some(route => location.pathname.startsWith(route));
  };

  // Update `isMediumScreen` based on screen width
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      setIsMediumScreen(screenWidth > 740 && screenWidth < 1200);
      if (screenWidth > 740 && screenWidth < 1200) {
        setSidebarOpen(false);
      }
    };

    // Initial check and event listener for resizing
    handleResize();
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Create routes with authentication check
  const renderRoutes = () => {
    return routes.map(route => {
      // Check if this is a protected route and user is not logged in
      const isProtected = protectedRoutes.some(path => 
        route.path === path || (route.path && route.path.startsWith(path + '/'))
      );
      
      if (isProtected && !user) {
        return (
          <Route 
            key={route.path} 
            path={route.path} 
            element={<Navigate to="/login" state={{ from: location }} replace />} 
          />
        );
      }
      
      // Handle nested routes
      if (route.children) {
        return (
          <Route key={route.path} path={route.path} element={route.element}>
            {route.children.map(childRoute => (
              <Route 
                key={childRoute.path} 
                path={childRoute.path} 
                element={
                  isProtected && !user 
                    ? <Navigate to="/login" state={{ from: location }} replace /> 
                    : childRoute.element
                } 
              />
            ))}
          </Route>
        );
      }
      
      // Regular route
      return (
        <Route 
          key={route.path} 
          path={route.path} 
          element={route.element} 
        />
      );
    });
  };
  
  return (
    <div className="flex min-h-screen bg-grey-800">
      <Toaster position="bottom-right" richColors />
      <Suspense fallback={<Preload />}>
        {/* Fixed sidebar - will not scroll with page content */}
        {window.innerWidth >= 750  && (
          <div className="inset-y-0 left-0 z-21">
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
          </div>
        )}
      
        {/* Main content with responsive left margin */}
        <div
          className={`flex-1 flex relative flex-col transition-all w-full duration-300 ${
            window.innerWidth >= 750
              ? sidebarOpen
                ? isMediumScreen
                  ? 'pl-[70px]' // Medium screen margin
                  : 'pl-[240px]' // Large screen margin
                : 'pl-[70px]' 
              : 'ml-0' // No margin for game routes or mobile
          } ${isChatOpen ? 'pr-[370px]' : ''}`} // Add right margin when chat is open
        >
          {/* Fixed navbar */}
          <div className="sticky top-0 z-20">
            <Navbar toggleChat={toggleChat} isGameRoute={isGameRoute()} />
          </div>

          {/* Scrollable main content with padding */}
          <main className="flex-1 overflow-y-auto w-full p-0 md:p-0 relative scrollY bg-[#1a2c38]">
            <Routes>
              {renderRoutes()}
            </Routes>
          </main>

          {/* Footer - hide on game routes */}
          {!isGameRoute() && <Footer />}
        </div>

        {/* Chat Panel */}
        {isChatOpen && <Chats closeChat={toggleChat} />}

        {/* Backdrop for mobile and medium screens */}
        {sidebarOpen && window.innerWidth > 750  && (
          <div
            className={`fixed inset-0 bg-[#00000094] bg-opacity-50 z-20 ${
              isMediumScreen || window.innerWidth <= 750 ? '' : 'hidden'
            }`}
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <Modals />
      </Suspense>
    </div>
  );
}

export default Layout;
