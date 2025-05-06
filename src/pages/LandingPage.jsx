import { Link } from 'react-router-dom';
import HeroSection from './sections/HeroSection';
import TrendingGames from './sections/TrendingGames';
import TrendingSport from './sections/TrendingSports';
import PromotionSection from './sections/PromotionSection';
import BetsLogSection from './sections/BetsLogSection';
import FaqSection from './sections/FaqSection';

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-grey-900 to-grey-800 text-white">
      <div className="container mx-auto px-0 py-0">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Trending Games Section */}
        <TrendingGames />

        <TrendingSport />

        <PromotionSection />
        <BetsLogSection />
        <FaqSection />
      </div>
    </div>
  );
}

export default LandingPage;


