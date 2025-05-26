import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import AuthModal from '../Auth/AuthModal';
import { AuthContext } from '../../context/AuthContext';
import LogginNavbar from './LogginNavbar';

function Navbar({ toggleChat }) {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate();
  const location = useLocation();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authTab, setAuthTab] = useState('login');

  // Handle register button click
  const handleRegisterClick = () => {
    navigate(`${location.pathname}?tab=register&modal=auth`);
  };

  // Handle login link click
  const handleLoginClick = (e) => {
    e.preventDefault();
    navigate(`${location.pathname}?tab=login&modal=auth`);
  };

  // Check URL parameters for modal and tab
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const modal = searchParams.get('modal');
    const tab = searchParams.get('tab');
    
    if (modal === 'auth') {
      setShowAuthModal(true);
      if (tab === 'register' || tab === 'login') {
        setAuthTab(tab);
      }
    } else {
      setShowAuthModal(false);
    }
  }, [location.search]);

  // Close modal and clear URL parameters
  const closeModal = () => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.delete('modal');
    searchParams.delete('tab');
    navigate({ search: searchParams.toString() });
  };

  return (
    <>
      <header className="sticky top-0 z-[999] w-full ">
        <div className="bg-[rgb(26,44,56)] h-[60px] text-[13px] shadow-xl">
          <div className="flex items-center justify-between px-4 h-full">
            <div className="flex items-center">
              {/* Logo SVG with Link to home */}
              <Link to="/" className="cursor-pointer">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 180 40"
                  className="h-7 text-white hover:text-grey-200 transition-colors"
                >
                  <text
                    x="0"
                    y="28"
                    fontFamily="Verdana, Geneva, sans-serif"
                    fontWeight="bold"
                    fontSize="32"
                    fill="currentColor"
                    letterSpacing="2"
                  >
                    Azabets
                  </text>
                </svg>
              </Link>
            </div>
            {user ? (
              <LogginNavbar toggleChat={toggleChat}/>
            ) :
            <div className="flex items-center space-x-6">
            {/* Login text link */}
            <a 
              href="#" 
              className="text-grey-200 hover:text-white font-medium transition-colors"
              onClick={handleLoginClick}
            >
              Login
            </a>
            
            {/* Register button with box shadow */}
            <button 
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-4 rounded-[6px] transition-colors shadow-[0_4px_6px_rgba(0,0,0,0.3)] cursor-pointer"
              onClick={handleRegisterClick}>
              Register
            </button>
          </div>}
          </div>
        </div>
      </header>

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal 
          isOpen={showAuthModal} 
          onClose={closeModal} 
          initialTab={authTab} 
        />
      )}
    </>
  );
}

export default Navbar;



